FROM node:lts-alpine3.17

RUN apk --no-cache add shadow \
    && groupmod -g 1010 node \
    && usermod -u 1010 -g 1010 node

ARG HOST_UID

ARG HOST_GID

RUN addgroup -g ${HOST_GID} react && adduser -u ${HOST_UID} -G react -s /bin/sh -D react

USER react

WORKDIR /app

COPY package.json .

RUN npm install

COPY . .

WORKDIR /app_bk

RUN cp -a /app/node_modules/. ./node_modules && cp -a /app/package-lock.json ./package-lock.json

WORKDIR /app

ENTRYPOINT [ "/app/entrypoint.sh" ]

CMD [ "npm","run","dev"]