FROM node:alpine

WORKDIR /app

COPY package.json .

RUN yarn install --production=true

RUN yarn global add ts-node-dev

COPY . .

EXPOSE 4000

CMD ["yarn", "start:dev"]