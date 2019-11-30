FROM node:alpine

RUN mkdir /sync2git
WORKDIR /sync2git
ADD . .
RUN npm i

RUN mkdir /depot
CMD npx ts-node /sync2git/index.ts /depot
