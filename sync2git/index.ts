import { Pool as PgPool } from "pg"
import createSubscriber from "pg-listen"
import { Observable } from "rxjs"

main().catch(console.error)

async function main () {
    const notifyChannel = 'sync2git-notes'
    await ensureTriggers(notifyChannel)

    const listener : Observable<any> = pgListen(notifyChannel)
    listener.subscribe((payload) => console.log(`${notifyChannel} says: `,
                                                payload))
}

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

function pgListen (notifyChannel: string) : Observable<any> {
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
              || '"data":'       || to_json(payload_items)
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

    await pg.end()
}
