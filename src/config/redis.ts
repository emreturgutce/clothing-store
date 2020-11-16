import Redis from 'ioredis';
import { REDIS_HOST, REDIS_PORT, REDIS_USER, REDIS_PASSWORD } from '.';

export const redis = new Redis({
  username: REDIS_USER,
  host: REDIS_HOST,
  password: REDIS_PASSWORD,
  port: parseInt(REDIS_PORT, 10),
});
