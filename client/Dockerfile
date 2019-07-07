FROM node:10.16.0-alpine

EXPOSE 3000

WORKDIR /home/node/app

COPY package*.json ./

RUN npm install

COPY . .

USER node

CMD [ "npm", "start" ]