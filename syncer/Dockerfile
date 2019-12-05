FROM node:alpine

RUN mkdir /sync2git
WORKDIR /sync2git
ADD package.json package-lock.json ./
RUN npm i

ADD . .
RUN mkdir /markdown
CMD npx ts-node /sync2git/index.ts /markdown
