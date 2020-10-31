const {
  PG_HOST,
  PG_PORT,
  PG_USER,
  PG_PASSWORD,
  PG_DATABASE,
  DB_TYPE,
  NODE_ENV,
} = require(`./${
  process.env.NODE_ENV === 'development' || process.env.NODE_ENV === 'test'
    ? 'src'
    : 'dist'
}/config/index${
  process.env.NODE_ENV === 'development' || process.env.NODE_ENV === 'test'
    ? '.ts'
    : ''
}`);

const isProd = NODE_ENV !== 'development' && NODE_ENV !== 'test';

const database = NODE_ENV === 'test' ? 'clothing_store_test' : PG_DATABASE;

module.exports = {
  type: DB_TYPE,
  host: PG_HOST,
  port: PG_PORT,
  username: PG_USER,
  password: PG_PASSWORD,
  database,
  synchronize: true,
  logging: NODE_ENV === 'development',
  entities: [`${isProd ? 'src' : 'dist'}/models/**/*.*`],
  dropSchema: NODE_ENV === 'test',
  migrations: [`${isProd ? 'src' : 'dist'}/migration/**/*.*`],
  subscribers: [`${isProd ? 'src' : 'dist'}/subscriber/**/*.*`],
  cli: {
    entitiesDir: 'src/models',
    migrationsDir: 'src/migration',
    subscribersDir: 'src/subscriber',
  },
};
