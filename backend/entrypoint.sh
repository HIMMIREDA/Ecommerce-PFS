#!/bin/sh

./mvnw spring-boot:run &

while true; do
    inotifywait -e modify,create,delete,move -r ./src/ --exclude ./src/main/resources/images && eval "kill $(jobs -p) " ; eval "./mvnw spring-boot:run &"
done