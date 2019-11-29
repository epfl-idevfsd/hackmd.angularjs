import { Pool as PgPool } from "pg"
import createSubscriber from "pg-listen"

main().catch(console.error)

async function main () {
    await ensureTriggers()
    const subscriber = createSubscriber(pgOpts())

    subscriber.notifications.on("my-channel", (payload) => {
        // Payload as passed to subscriber.notify() (see below)
        console.log("Received notification in 'my-channel':", payload)
    })

    subscriber.events.on("error", (error) => {
        console.error("Fatal database connection error:", error)
        process.exit(1)
    })

    process.on("exit", () => {
        subscriber.close()
    })

    await subscriber.connect()
    await subscriber.listenTo("my-channel")
}

async function ensureTriggers () {
    const pg = getPool()

    const res = await pg.query('SELECT $1::text as message', ['Hello world!'])

    console.log(res.rows[0].message) // Hello world!
    await pg.end()
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
