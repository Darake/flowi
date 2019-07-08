FROM node:10.16.0-alpine

WORKDIR /home/node/app

COPY package*.json ./

RUN npm install

COPY . .

USER node