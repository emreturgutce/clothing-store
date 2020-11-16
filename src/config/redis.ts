import Redis from 'ioredis';
import { REDIS_HOST, REDIS_PORT, REDIS_URL } from '.';

export const redis = new Redis({
  host: REDIS_HOST || REDIS_URL,
  port: parseInt(REDIS_PORT, 10),
});
