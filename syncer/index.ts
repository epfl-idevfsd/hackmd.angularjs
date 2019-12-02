import { Pool as PgPool } from 'pg'
import createSubscriber from 'pg-listen'
import { defer, Observable } from "rxjs"
import { filter, map, concatAll, tap } from 'rxjs/operators'

import debug_ from "debug"
const debug = debug_("syncer")

main(process.argv).catch(console.error)

type NotesEvent = PgEvent<NotesRow>

async function main (argv: string[]) {
    const notifyChannel = 'syncer-notes'
    const config = parseCommandLine(argv)
    await ensureTriggers(notifyChannel)

    const pgListener : Observable<NotesEvent> = pgListen(notifyChannel)
    pgListener.pipe(
        filter((event : NotesEvent) => event.operation != 'DELETE'),
        tap((e : NotesEvent) => debug('%o %o', e.operation, e.new.shortid)),
        // Turn into “higher-order Observable”
        map((event : NotesEvent) => defer(
            // Deferred: this function only starts when the
            // so-called “inner Observable” is subscribed to (by
            // `concatAll`, below)
            async () => {
                const shortId = event.new.shortid,
                      text = event.new.content

                return saveNote(config, shortId, text)
            })),
        concatAll()
    ).subscribe(console.log)
}

////////////////////////////////////////////////////////////////////////////////////////

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

function pgListen (notifyChannel: string) : Observable<NotesEvent> {
    const subscriber = createSubscriber(pgOpts())

    process.on("exit", () => {
        subscriber.close()
    })

    subscriber.events.on("error", (error) => {
        console.error("Fatal database connection error:", error)
        process.exit(1)
    })

    subscriber.connect().then(() => {
        subscriber.listenTo(notifyChannel)
    })

    return new Observable(sub => {
        subscriber.notifications.on(notifyChannel, (payload) => {
            sub.next(payload)
        })
    })
}

type PgEvent<DATA> = {
    timestamp: string,
    operation: string,
    schema: string,
    table: string,
    old: DATA,
    new: DATA
}

type NotesRow = {
    shortid: string,
    content: string
}

async function ensureTriggers (notifyChannel : string) {
    // https://gist.github.com/colophonemes/9701b906c5be572a40a84b08f4d2fa4e
    const pg = getPool()

    await pg.query(`
DROP FUNCTION IF EXISTS notify_trigger CASCADE;

CREATE FUNCTION notify_trigger() RETURNS trigger AS $trigger$
DECLARE
  rec RECORD;
  payload TEXT;
  oldNewData TEXT;
BEGIN

  CASE TG_OP
  WHEN 'INSERT' THEN
     oldNewData := '"new":' || record_to_json(NEW, TG_ARGV);
  WHEN 'UPDATE' THEN
     oldNewData := '"old":' || record_to_json(OLD, TG_ARGV)
              || ', "new":' || record_to_json(NEW, TG_ARGV);
  WHEN 'DELETE' THEN
     oldNewData := '"old":' || record_to_json(OLD, TG_ARGV);
  ELSE
     RAISE EXCEPTION 'Unknown TG_OP: "%". Should not occur!', TG_OP;
  END CASE;

  -- Build the payload
  payload := ''
              || '{'
              || '"timestamp":"' || CURRENT_TIMESTAMP || '",'
              || '"operation":"' || TG_OP             || '",'
              || '"schema":"'    || TG_TABLE_SCHEMA   || '",'
              || '"table":"'     || TG_TABLE_NAME     || '",'
              || oldNewData
              || '}';

  -- Notify the channel
  PERFORM pg_notify('${notifyChannel}', payload);

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
FOR EACH ROW EXECUTE PROCEDURE notify_trigger('shortid', 'content');
`)
}

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


type Config = { markdownPath: string }
function parseCommandLine (argv : string[]) : Config {
    return { markdownPath : argv[1] }
}
