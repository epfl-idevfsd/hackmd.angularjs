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

    await pg.query('DROP PROCEDURE IF EXISTS notify_trigger;')

    await pg.query(`
CREATE OR REPLACE FUNCTION notify_trigger() RETURNS trigger AS $trigger$
BEGIN
PERFORM pg_notify('${notifyChannel}', '');
RETURN NEW;
END;
$trigger$ LANGUAGE plpgsql;
`)

    await pg.query('DROP TRIGGER IF EXISTS Notes_trigger ON "Notes";')

    await pg.query(`
CREATE TRIGGER Notes_trigger
AFTER INSERT OR UPDATE
ON "Notes"
EXECUTE PROCEDURE notify_trigger();
`)

    await pg.end()
}

