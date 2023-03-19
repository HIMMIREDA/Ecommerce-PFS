#!/bin/sh

cp -a /app_bk/node_modules/. /app/node_modules && cp -a /app_bk/package-lock.json /app/package-lock.json

exec "$@"