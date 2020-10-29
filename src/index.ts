import 'reflect-metadata';
import express from 'express';
import { ApolloServer } from 'apollo-server-express';
import session from 'express-session';
import connectRedis from 'connect-redis';
import { createConnection } from 'typeorm';
import { buildSchema } from 'type-graphql';
import path from 'path';
import { SESSION_SECRET, PORT, NODE_ENV } from './config';
import { redis } from './config/redis';
import { authChecker } from './utils/auth-checker';
import { COOKIE_EXPIRATION, COOKIE_NAME } from './constants';

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
    resolvers: [path.join(__dirname, '/resolvers/**/*.*')],
    authChecker,
  });

  const server = new ApolloServer({
    schema,
    context: ({ req, res }) => ({ req, res }),
  });

  const app = express();

  app.use(
    session({
      store: new RedisStore({
        client: redis,
      }),
      name: COOKIE_NAME,
      secret: SESSION_SECRET,
      resave: false,
      saveUninitialized: false,
      cookie: {
        httpOnly: true,
        secure: NODE_ENV !== 'development',
        maxAge: COOKIE_EXPIRATION,
      },
    }),
  );

  server.applyMiddleware({ app });

  app.listen(PORT, () => {
    console.log(
      `🚀 Server ready at http://localhost:4000${server.graphqlPath}`,
    );
  });
}

main().catch((err) => {
  console.error(err);
});
