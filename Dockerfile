FROM node:10.16.0-alpine as build-stage

WORKDIR /home/node/app

COPY client/package*.json ./

RUN npm install

COPY client/ .

RUN npm build

FROM node:10.16.0-alpine

WORKDIR /home/node/app

COPY server/package*.json ./

RUN npm install

COPY server/ .

COPY --from=build-stage /home/node/app/build/ ./build