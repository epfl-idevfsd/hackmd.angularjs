/**
 * Sync changes from CodiMD's PostgreSQL database to the file system.
 *
 * Due to https://github.com/hackmdio/codimd/issues/1013 it is not
 * currently possible to do the opposite.
 */

import { promises as fs, constants as fsc } from 'fs'
import { Pool as PgPool } from 'pg'
import pgCreateSubscriber from 'pg-listen'
import { Subscriber as PgSubscriber } from 'pg-listen'
import { concat, defer, from, of, Observable } from "rxjs"
import { concatAll, map, flatMap, tap } from 'rxjs/operators'
import * as writeFileAtomic from 'write-file-atomic'

import debug_ from "debug"
const debug = debug_("syncer")

async function main (argv: string[]) {
    const config = parseCommandLine(argv)

    const pgNotesStream = new PgNotesStream(config)
    pgNotesStream.stream()
        .pipe(
            tap((chg) => debug('Change: %o %o', chg.shortid, chg.newContent.length)),
            map((chg) => {
                if (! chg.newContent) return of()
                if (chg.oldContent === chg.newContent) return of()
                const content = chg.newContent,
                filename = parseFilenameFromHeader(content)
                if (! filename) return of()
                debug('%o needs sync to %o', chg.shortid, filename)

                return defer(() => {
                    debug('Sync starting on %o', filename)
                    const updater = new AtomicCompareUpdateFile(config, filename)

                    return from(updater.update(chg.oldContent, content))
                          .pipe(tap(() => debug('Sync done on %o', filename)))
                })
            }),
            concatAll()  // defer() + concatAll() = don't parallelize saves
        )
        .subscribe(() => {})
}

/////////////////////////// PostgreSQL interface //////////////////////////////

let pgPool : PgPool
function getPool () {
    if (! pgPool) {
        pgPool = new PgPool(pgOpts())
    }
    return pgPool
}

function pgOpts () {
    return {
        connectionString: process.env.DB_URL
    }
}

type PgEvent = {
    operation: string,
    schema: string,
    table: string,
    sync_revisions_id : number
}

async function ensureTriggers (notifyChannel : string) {
    // https://gist.github.com/colophonemes/9701b906c5be572a40a84b08f4d2fa4e
    const pg = getPool()

    await cleanupTriggers()

    await pg.query(`
CREATE FUNCTION note_trigger() RETURNS trigger AS $trigger$
DECLARE
  payload TEXT;
  revision_id INT4;
BEGIN

  CASE TG_OP
  WHEN 'INSERT' THEN
     INSERT INTO sync_revisions (note_id, shortid, timestamp, operation, new_content)
                 VALUES (NEW.id, NEW.shortid, CURRENT_TIMESTAMP, TG_OP, NEW.content)
                 RETURNING id INTO revision_id;
  WHEN 'UPDATE' THEN
     INSERT INTO sync_revisions (note_id, shortid, timestamp, operation, old_content, new_content)
                 VALUES (NEW.id, NEW.shortid, CURRENT_TIMESTAMP, TG_OP, OLD.content, NEW.content)
                 RETURNING id INTO revision_id;
  WHEN 'DELETE' THEN
     INSERT INTO sync_revisions (note_id, shortid, timestamp, operation, old_content)
                 VALUES (OLD.id, OLD.shortid, CURRENT_TIMESTAMP, TG_OP, OLD.content)
                 RETURNING id INTO revision_id;
  ELSE
     RAISE EXCEPTION 'Unknown TG_OP: "%". Should not occur!', TG_OP;
  END CASE;

  -- Notify the channel
  PERFORM pg_notify(
    '${notifyChannel}',
    '{'
              || '"operation":"'        || TG_OP             || '",'
              || '"schema":"'           || TG_TABLE_SCHEMA   || '",'
              || '"table":"'            || TG_TABLE_NAME     || '",'
              || '"sync_revisions_id":' || revision_id
              || '}');

  -- Return what PostgreSQL expects
  CASE TG_OP
  WHEN 'INSERT', 'UPDATE' THEN
     return NEW;
  WHEN 'DELETE' THEN
     return OLD;
  END CASE;
END;
$trigger$ LANGUAGE plpgsql;


CREATE FUNCTION record_to_json(rec RECORD, columns text[]) RETURNS text AS $recordtojson$
DECLARE
  column_name TEXT;
  column_value TEXT;
  items TEXT[];
BEGIN
  FOREACH column_name IN ARRAY columns LOOP
    EXECUTE format('SELECT $1.%I::TEXT', column_name)
    INTO column_value
    USING rec;
    items := array_cat(items, array[column_name, column_value]);
  END LOOP;

  return to_json(json_object(items));
END;
$recordtojson$ LANGUAGE plpgsql;


CREATE TRIGGER Notes_trigger
AFTER INSERT OR UPDATE OR DELETE
ON "Notes"
FOR EACH ROW EXECUTE PROCEDURE note_trigger();


CREATE TABLE sync_revisions (
  id SERIAL,
  note_id uuid NOT NULL REFERENCES "Notes" ON DELETE CASCADE,
  timestamp TIMESTAMP NOT NULL,
  shortid VARCHAR(255) NOT NULL,
  operation TEXT NOT NULL,
  old_content TEXT,
  new_content TEXT
);
`)
}

async function cleanupTriggers () {
    const pg = getPool()

    await pg.query(`
DROP FUNCTION IF EXISTS note_trigger CASCADE;
DROP FUNCTION IF EXISTS record_to_json CASCADE;
DROP TRIGGER IF EXISTS Notes_trigger ON "Notes";
DROP TABLE IF EXISTS sync_revisions;
`)
    debug('cleanupTriggers(): done')
}

/////////////////////////// PgNotesStream class ////////////////////////

module PgNotesStream {
    export type Change = {
        shortid: string
        oldContent: string
        newContent: string
    }
}

class PgNotesStream {
    private subscriber : PgSubscriber

    constructor (private config : Config) {
        process.on("SIGINT", async () => {
            await this.done()
            process.exit(1)
        })
    }

    async done() {
        await this.subscriber.close()
        await cleanupTriggers()
    }

    private listenPg () : Observable<PgEvent> {
        const notifyChannel = 'syncer-notes'

        const fatal = (error : Error) => {
            console.error("Fatal database error:", error)
            this.done()
        }

        this.subscriber = pgCreateSubscriber(pgOpts())

        this.subscriber.events.on("error", fatal)

        ensureTriggers(notifyChannel)
            .then(() => this.subscriber.connect())
            .catch(fatal)

        this.subscriber.listenTo(notifyChannel)

        return new Observable(sub => {
            this.subscriber.notifications.on(
                notifyChannel,
                (payload) => { sub.next(payload) }
            )})
    }

    private async consumeChange (id : number) : Promise<PgNotesStream.Change | null> {
        const pool = getPool()
        const res = await pool.query(
            `SELECT
             shortid, operation, old_content, new_content
             FROM sync_revisions
             WHERE id = $1`, [id])
        await pool.query(
            `DELETE FROM sync_revisions
             WHERE id = $1`, [id])
        const row = res.rows[0]
        return {
            shortid: row.shortid,
            oldContent: row.old_content,
            newContent: row.new_content
        }
    }

    public stream () : Observable<PgNotesStream.Change> {
        return concat(
            this.listenPg().pipe(
                flatMap((pgEvent) => this.consumeChange(
                    pgEvent.sync_revisions_id))
            ))
    }
}

/////////////////////////// Filesystem operations //////////////////////

class AtomicCompareUpdateFile {
    private filename : string
    constructor (private config: Config, basename : string) {
        this.filename = this.config.markdownDir + '/' + basename
    }
    
    public async update (from : string, to : string) {
        const [oldContents, backupPath] = await this.mkbackup()
        await writeFileAtomic(this.filename, to)
        if (from === oldContents) await fs.unlink(backupPath)
    }

    private async mkbackup () : Promise<[string, string]> {
        let uniqueCounter = 0
        const anotherBackupFilename  = () => this.filename + '.BAK-' + uniqueCounter++
        let fd : fs.FileHandle, backupFilename : string

        for(backupFilename = anotherBackupFilename();;
            backupFilename = anotherBackupFilename()) {
            try {
                fd = await fs.open(backupFilename,
                              fsc.O_WRONLY | fsc.O_CREAT | fsc.O_EXCL)
                break
            } catch (e) {
                if (e.code === 'EEXIST') {
                    continue
                } else {
                    throw e
                }
            }
        }

        const contents = await fs.readFile(this.filename)
        await fd.writeFile(contents)
        await fd.close()

        return [contents.toString("utf8"), backupFilename]
    }
}

////////////////////////// Ancillary functions ///////////////////////////

function parseFilenameFromHeader (content : string) : string | null {
    if (! content) return null

    const headerMatch = content.match(/^---(.*?)^---/sm)
    if (! headerMatch) return null

    const filenameMatch = headerMatch[1].match(/^filename: (.*)/m)
    const retval = filenameMatch && filenameMatch[1]
    debug("parseFilenameFromHeader: returning %o", retval)
    return retval
}

////////////////// Command-line parsing and default values ///////////////

type Config = { markdownDir: string }
function parseCommandLine (argv : string[]) : Config {
    return { markdownDir : argv[argv.length - 1] }
}

//////////////////////////////// The end /////////////////////////////////

main(process.argv).catch(console.error)
