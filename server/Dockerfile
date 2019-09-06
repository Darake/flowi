FROM node:10.16.0-alpine

WORKDIR /home/node/app

COPY package*.json ./

RUN npm install

ADD https://github.com/ufoscout/docker-compose-wait/releases/download/2.2.1/wait /wait
RUN chmod +x /wait

COPY . .

USER node