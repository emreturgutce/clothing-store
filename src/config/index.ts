import dotenv from 'dotenv';

dotenv.config();

if (!process.env.SESSION_SECRET) {
  throw new Error('SESSION_SECRET must be defined as env variable');
}

if (!process.env.JWT_SECRET) {
  throw new Error('JWT_SECRET must be defined as env variable');
}

if (!process.env.PG_HOST) {
  throw new Error('PG_HOST must be defined as env variable');
}

if (!process.env.PG_PORT) {
  throw new Error('PG_PORT must be defined as env variable');
}

if (!process.env.PG_USER) {
  throw new Error('PG_USER must be defined as env variable');
}

if (!process.env.PG_PASSWORD) {
  throw new Error('PG_PASSWORD must be defined as env variable');
}

if (!process.env.PG_DATABASE) {
  throw new Error('PG_DATABASE must be defined as env variable');
}

if (!process.env.NODE_ENV) {
  throw new Error('NODE_ENV must be defined as env variable');
}

if (!process.env.DB_TYPE) {
  throw new Error('DB_TYPE must be defined as env variable');
}

if (!process.env.PORT) {
  throw new Error('PORT must be defined as env variable');
}

if (!process.env.REDIS_HOST) {
  throw new Error('REDIS_HOST must be defined as env variable');
}

if (!process.env.REDIS_PORT) {
  throw new Error('REDIS_PORT must be defined as env variable');
}

if (!process.env.STRIPE_KEY) {
  throw new Error('STRIPE_KEY must be defined as env variable');
}

if (!process.env.AWS_ACCESS_KEY_ID) {
  throw new Error('AWS_ACCESS_KEY_ID must be defined as env variable');
}

if (!process.env.AWS_SECRET_ACCESS_KEY) {
  throw new Error('AWS_SECRET_ACCESS_KEY must be defined as env variable');
}

if (!process.env.AWS_S3_BUCKET) {
  throw new Error('AWS_S3_BUCKET must be defined as env variable');
}

export const {
  SESSION_SECRET,
  JWT_SECRET,
  PG_HOST,
  PG_PORT,
  PG_USER,
  PG_PASSWORD,
  PG_DATABASE,
  NODE_ENV,
  DB_TYPE,
  PORT,
  REDIS_HOST,
  REDIS_PORT,
  STRIPE_KEY,
  AWS_ACCESS_KEY_ID,
  AWS_SECRET_ACCESS_KEY,
  AWS_S3_BUCKET,
} = process.env;
export * from './redis';
export * from './stripe';
export * from './apollo-server';
export * from './session';
