FROM node:alpine as base

WORKDIR /app

COPY package.json .

RUN yarn install --production=true

EXPOSE 4000


FROM base as dev

RUN yarn install --dev-dependencies

CMD ["yarn", "start:dev"]


FROM dev as build

COPY . .

RUN yarn build


FROM node:alpine as prod

ENV NODE_ENV=production

COPY --from=build /app .

CMD ["yarn", "start"]