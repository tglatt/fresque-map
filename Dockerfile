FROM node:16-slim

WORKDIR /app

COPY ./package.json package.json
COPY ./package-lock.json package-lock.json

RUN npm ci

COPY ./src src
COPY ./static static
COPY ./svelte.config.js svelte.config.js
COPY ./jsconfig.json jsconfig.json
COPY ./.env .env

RUN npm run build

EXPOSE 3000

CMD [ "node", "build" ]

