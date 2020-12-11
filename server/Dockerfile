FROM node:10.16.0-alpine

WORKDIR /usr/local

COPY package*.json ./

RUN npm install

ADD https://github.com/ufoscout/docker-compose-wait/releases/download/2.2.1/wait /wait
RUN chmod +x /wait

ENV PATH=/usr/local/node_modules/.bin:$PATH

WORKDIR /usr/local/app

COPY . .