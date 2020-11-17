const isProd = process.env.NODE_ENV === 'production';

const {
  PG_HOST,
  PG_PORT,
  PG_USER,
  PG_PASSWORD,
  PG_DATABASE,
  DB_TYPE,
  NODE_ENV,
} = require(`./${isProd ? 'dist' : 'src'}/config/index${isProd ? '' : '.ts'}`);

const database = NODE_ENV === 'test' ? 'clothing_store_test' : PG_DATABASE;

module.exports = {
  type: DB_TYPE,
  host: PG_HOST,
  port: PG_PORT,
  username: PG_USER,
  password: PG_PASSWORD,
  database,
  ssl: {
    rejectUnauthorized: false,
  },
  synchronize: true,
  logging: NODE_ENV === 'development',
  entities: [`${isProd ? 'dist' : 'src'}/models/**/*.*`],
  dropSchema: NODE_ENV === 'test',
  seeds: [`${isProd ? 'dist' : 'src'}/seeds/**/*.*`],
  factories: [`${isProd ? 'dist' : 'src'}/factories/**/*.*`],
  migrations: [`${isProd ? 'dist' : 'src'}/migration/**/*.*`],
  subscribers: [`${isProd ? 'dist' : 'src'}/subscriber/**/*.*`],
  cli: {
    entitiesDir: `${isProd ? 'dist' : 'src'}/models`,
    migrationsDir: `${isProd ? 'dist' : 'src'}/migration`,
    subscribersDir: `${isProd ? 'dist' : 'src'}/subscriber`,
  },
};
