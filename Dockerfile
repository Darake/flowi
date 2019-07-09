FROM node:10.16.0-alpine as build-stage

WORKDIR /home/node/app

COPY client/package*.json ./

RUN npm install

COPY client/ .

RUN npm run build

FROM node:10.16.0-alpine

COPY --from=build-stage /home/node/app/build /home/node/app/build

WORKDIR /home/node/app

COPY server/package*.json ./

RUN npm install

COPY server/ .