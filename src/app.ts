import express from 'express';
import session from 'express-session';
import cors from 'cors';
import connectRedis from 'connect-redis';
import helmet from 'helmet';
import { SESSION_SECRET, NODE_ENV, redis } from './config';
import { COOKIE_EXPIRATION, COOKIE_NAME } from './constants';

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

export { app };
