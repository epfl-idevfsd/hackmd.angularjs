import { Pool as PgPool } from "pg"
import createSubscriber from "pg-listen"
import { defer, Observable } from "rxjs"
import { filter, map, concatAll, tap } from 'rxjs/operators'

import debug_ from "debug"
const debug = debug_("sync2git")

main(process.argv).catch(console.error)

async function main (argv: string[]) {
    const notifyChannel = 'sync2git-notes'
    const { gitConfig } = parseCommandLine(argv)
    await ensureTriggers(notifyChannel)

    type NotesEvent = PgEvent<{shortid: string}>
    const listener : Observable<NotesEvent> = pgListen(notifyChannel)
    listener.pipe(
        filter((event : NotesEvent) => event.operation != 'DELETE'),
        tap((e : NotesEvent) => debug('%o %o', e.operation, e.data.shortid)),
        // Turn into “higher-order Observable”
        map((event : NotesEvent) => defer(
            // Deferred: this function only starts when the
            // so-called “inner Observable” is subscribed to (by
            // `concatAll`, below)
            async () => {
                const shortId = event.data.shortid,
                      text = await getNoteText(shortId)

                return commitNoteToGit(gitConfig, shortId, text)
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

function pgListen (notifyChannel: string) : Observable<PgEvent<{shortid: string}>> {
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
    data: DATA
}

async function ensureTriggers (notifyChannel : string) {
    // https://gist.github.com/colophonemes/9701b906c5be572a40a84b08f4d2fa4e
    const pg = getPool()

    await pg.query('DROP FUNCTION IF EXISTS notify_trigger CASCADE;')

    await pg.query(`
CREATE FUNCTION notify_trigger() RETURNS trigger AS $trigger$
DECLARE
  rec RECORD;
  payload TEXT;
  column_name TEXT;
  column_value TEXT;
  payload_items TEXT[];
BEGIN
  -- Set record row depending on operation
  CASE TG_OP
  WHEN 'INSERT', 'UPDATE' THEN
     rec := NEW;
  WHEN 'DELETE' THEN
     rec := OLD;
  ELSE
     RAISE EXCEPTION 'Unknown TG_OP: "%". Should not occur!', TG_OP;
  END CASE;

  -- Get required fields
  FOREACH column_name IN ARRAY TG_ARGV LOOP
    EXECUTE format('SELECT $1.%I::TEXT', column_name)
    INTO column_value
    USING rec;
    payload_items := array_cat(payload_items, array[column_name, column_value]);
  END LOOP;

  -- Build the payload
  payload := ''
              || '{'
              || '"timestamp":"' || CURRENT_TIMESTAMP                    || '",'
              || '"operation":"' || TG_OP                                || '",'
              || '"schema":"'    || TG_TABLE_SCHEMA                      || '",'
              || '"table":"'     || TG_TABLE_NAME                        || '",'
              || '"data":'       || to_json(json_object(payload_items))
              || '}';

  -- Notify the channel
  PERFORM pg_notify('${notifyChannel}', payload);

  RETURN rec;
END;
$trigger$ LANGUAGE plpgsql;`
)

    await pg.query('DROP TRIGGER IF EXISTS Notes_trigger ON "Notes";')

    await pg.query(`
CREATE TRIGGER Notes_trigger
AFTER INSERT OR UPDATE OR DELETE
ON "Notes"
FOR EACH ROW EXECUTE PROCEDURE notify_trigger('shortid');
`)
}

/**
 * Creates an observable for the action of committing a revision to Git.
 *
 * The observable starts the commit operation only when it is subscribed
 * to. It then returns a single value (the commit SHA1) and completes.
 */
async function commitNoteToGit (_gitConfig: GitConfig, shortId: string,
                                text: string)  {
    debug('Commit on %o starts; text: %o', shortId, text)
    await new Promise(resolve => setTimeout(resolve, 2000));  // Sleep
    debug('Commit on %o done; text: %o', shortId, text)
    return `XXXXsha1sha1${shortId}`
}

async function getNoteText (shortId : string) {
    const pg = getPool()

    const results = await pg.query('SELECT "content" from "Notes" where shortid = $1', [shortId])
    return results.rows[0].content
}

type GitConfig = { dir : string, markdownPath: string }
function parseCommandLine (argv : string[]) : { gitConfig : GitConfig} {
    return { gitConfig : { dir : argv[1], markdownPath: argv[2] } }
}
