import Redis from 'ioredis';
import { REDIS_HOST, REDIS_PORT } from '.';

export const redis = new Redis({
  host: REDIS_HOST,
  port: parseInt(REDIS_PORT, 10),
});
