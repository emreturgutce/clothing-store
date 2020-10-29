const {
  PG_HOST,
  PG_PORT,
  PG_USER,
  PG_PASSWORD,
  PG_DATABASE,
  DB_TYPE,
  NODE_ENV,
} = require(`./${
  process.env.NODE_ENV === 'development' ? 'src' : 'dist'
}/config/index${process.env.NODE_ENV === 'development' ? '.ts' : ''}`);

module.exports = {
  type: DB_TYPE,
  host: PG_HOST,
  port: PG_PORT,
  username: PG_USER,
  password: PG_PASSWORD,
  database: PG_DATABASE,
  synchronize: true,
  logging: NODE_ENV === 'development',
  entities: [`${NODE_ENV === 'development' ? 'src' : 'dist'}/models/**/*.*`],
  migrations: [
    `${NODE_ENV === 'development' ? 'src' : 'dist'}/migration/**/*.*`,
  ],
  subscribers: [
    `${NODE_ENV === 'development' ? 'src' : 'dist'}/subscriber/**/*.*`,
  ],
  cli: {
    entitiesDir: 'src/models',
    migrationsDir: 'src/migration',
    subscribersDir: 'src/subscriber',
  },
};
