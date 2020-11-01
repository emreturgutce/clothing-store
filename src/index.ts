import 'reflect-metadata';
import express from 'express';
import session from 'express-session';
import cors from 'cors';
import connectRedis from 'connect-redis';
import { createConnection } from 'typeorm';
import helmet from 'helmet';
import { SESSION_SECRET, PORT, NODE_ENV } from './config';
import { redis } from './config/redis';
import { initializeApolloServer } from './config/apollo-server';
import { COOKIE_EXPIRATION, COOKIE_NAME } from './constants';

createConnection()
  .then(() => {
    console.log(`🐘 Connected to Postgres DB`);
  })
  .catch((err) => {
    console.error(`❌ Error occurred connecting Postgres DB:\n${err}`);
    process.exit(1);
  });

const RedisStore = connectRedis(session);

const app = express();

app.use(cors());
app.use(helmet());

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
      secure: NODE_ENV === 'production',
      maxAge: COOKIE_EXPIRATION,
    },
  }),
);

initializeApolloServer(app).catch((err) => {
  console.error(err);
  process.exit(1);
});

app.listen(PORT, () => {
  console.log(`🚀 Server ready at http://localhost:4000/graphql`);
});
