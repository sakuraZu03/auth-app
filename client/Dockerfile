# syntax=docker/dockerfile:1
FROM node:18-alpine

ENV NODE_ENV=production

WORKDIR /client

COPY ["package.json", "package-lock.json","tsconfig.json","./"]

RUN npm install 

COPY . .

EXPOSE 3000

CMD [ "npm", "start" ]
