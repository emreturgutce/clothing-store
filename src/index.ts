import 'reflect-metadata';
import express from 'express';
import { ApolloServer } from 'apollo-server-express';
import session from 'express-session';
import connectRedis from 'connect-redis';
import { createConnection } from 'typeorm';
import { buildSchema } from 'type-graphql';
import path from 'path';
import './config';
import { redis } from './config/redis';

async function main() {
  createConnection()
    .then(() => {
      console.log(`🐘 Connected to Postgres DB`);
    })
    .catch((err) => {
      console.error(`❌ Error occurred connecting Postgres DB:\n${err}`);
      process.exit(1);
    });

  const RedisStore = connectRedis(session);

  const schema = await buildSchema({
    resolvers: [path.join(__dirname, '/resolvers/**/*.ts')],
  });

  const server = new ApolloServer({ schema, context: ({ req }) => ({ req }) });

  const app = express();

  app.use(
    session({
      store: new RedisStore({
        client: redis,
      }),
      name: 'auth_token',
      secret: 'thisisabigsecret',
      resave: false,
      saveUninitialized: false,
      cookie: {
        httpOnly: true,
        secure: false,
        maxAge: 1000 * 60 * 60 * 24 * 7 * 365,
      },
    }),
  );

  server.applyMiddleware({ app });

  app.listen({ port: 4000 }, () => {
    console.log(
      `🚀 Server ready at http://localhost:4000${server.graphqlPath}`,
    );
  });
}

main().catch((err) => {
  console.error(err);
});
