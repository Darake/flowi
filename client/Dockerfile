FROM node:10.16.0-alpine

WORKDIR /usr/local

COPY package*.json ./

RUN npm install

ENV PATH=/usr/local/node_modules/.bin:$PATH

WORKDIR /usr/local/app

COPY . .