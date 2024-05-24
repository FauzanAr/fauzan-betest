FROM node:lts-alpine

WORKDIR /app

COPY package.json .
COPY .env .

RUN npm install

COPY src .

EXPOSE 9000

CMD [ "node", "index.js" ]