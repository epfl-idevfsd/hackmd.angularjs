#!/bin/sh

set -e

: ${DB_URL:=postgres://codimd:${POSTGRES_PASSWORD}@localhost/codimd}
export DB_URL

declare -a node_opts
case "$1" in
    --inspect*)
        node_opts=("${node_opts[@]}" "$1")
        shift ;;
    *)
        set -x
        exec node "${node_opts[@]}" -r ts-node/register/type-check ./index.ts "$@"
        ;;
esac
