#!/bin/bash

export HOST_UID="$(id -u)"

export HOST_GID="$(id -g)"

rm -rf client/node_modules

rm client/package-lock.json

docker-compose down