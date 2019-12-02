import { Pool as PgPool } from 'pg'
import pgCreateSubscriber from 'pg-listen'
import { Subscriber as PgSubscriber } from 'pg-listen'
import { Observable } from "rxjs"
import {  flatMap, tap } from 'rxjs/operators'

import debug_ from "debug"
const debug = debug_("syncer")

async function main (argv: string[]) {
    const config = parseCommandLine(argv)

    const pgNotesStream = new PgNotesStream(config)
    pgNotesStream.stream().subscribe(console.log)
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

    await pg.query(`
DROP FUNCTION IF EXISTS note_trigger CASCADE;

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

DROP FUNCTION IF EXISTS record_to_json CASCADE;

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

DROP TRIGGER IF EXISTS Notes_trigger ON "Notes";

CREATE TRIGGER Notes_trigger
AFTER INSERT OR UPDATE OR DELETE
ON "Notes"
FOR EACH ROW EXECUTE PROCEDURE note_trigger();

DROP TABLE IF EXISTS sync_revisions;
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

//////////////////////////////// Note class /////////////////////////////

class Note {
    constructor() {}

}

/////////////////////////// PgNotesStream class ////////////////////////

module PgNotesStream {
    export type Change = {
        shortid: string
        oldContent: string
        newContent: string
        filename: string
    }
}

class PgNotesStream {
    private subscriber : PgSubscriber

    constructor (private config : Config) {
        process.on("exit", () => {
            this.done()
        })
    }

    async done() {
        await this.subscriber.close()
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
        const client = await getPool().connect()
        await client.query('BEGIN')
        const res = await client.query(
            `SELECT
             shortid, operation, old_content, new_content
             FROM sync_revisions
             WHERE id = $1
             FOR UPDATE`, [id])
        await client.query(
            `DELETE FROM sync_revisions
             WHERE id = $1`, [id])
        await client.query('COMMIT')
        const row = res.rows[0]
        return {
            shortid: row.shortid,
            oldContent: row.old_content,
            newContent: row.new_content,
            filename: parseFilenameFromHeader(row.new_content ||
                                              row.old_content)
        }
    }

    public stream () : Observable<PgNotesStream.Change> {
        return this.listenPg().pipe(
            flatMap((event : PgEvent) => this.consumeChange(event.sync_revisions_id)),
            tap((e) => debug('%o', e))
        )
    }
}

/////////////////////////// FsNotesStream class //////////////////////

/**
 * Creates an observable for the action of committing a revision to Git.
 *
 * The observable starts the commit operation only when it is subscribed
 * to. It then returns a single value (the commit SHA1) and completes.
 */
async function saveNote (_config: Config, shortId: string,
                         text: string) {
    debug('Save on %o starts; text: %o', shortId, text)
    await new Promise(resolve => setTimeout(resolve, 2000));  // Sleep
    debug('Save on %o done; text: %o', shortId, text)
    return `XXXXsha1sha1${shortId}`
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
    return { markdownDir : argv[1] }
}

//////////////////////////////// The end /////////////////////////////////

main(process.argv).catch(console.error)
