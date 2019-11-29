# Developer Instructions

## How to run / debug the script

```
npm i
source ../.env
env DB_URL=postgres://codimd:${POSTGRES_PASSWORD}@localhost/codimd npx nodemon
```

For debugging, you may want to tack a `--inspect-brk` to the second
command line.
