FROM node:alpine

RUN mkdir /sync2git
WORKDIR /sync2git
ADD . .
RUN npm i

RUN mkdir /markdown
CMD npx ts-node /sync2git/index.ts /markdown
