import Redis, { Redis as RedisType } from 'ioredis';
import { REDIS_HOST, REDIS_PORT, REDIS_USER, REDIS_PASSWORD } from '.';

let redis: RedisType | undefined;

try {
  redis = new Redis({
    username: REDIS_USER,
    host: REDIS_HOST,
    password: REDIS_PASSWORD,
    port: parseInt(REDIS_PORT, 10),
  });

  console.log(`👹  Connected to Redis`.bgMagenta);
} catch (err) {
  console.error(`Error occurred connecting Redis:\n${err}`.red.bold);
}

export { redis };
