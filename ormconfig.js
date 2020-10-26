module.exports = {
  type: 'postgres',
  host: 'localhost',
  port: '5432',
  username: 'postgres',
  password: 'postgres',
  database: 'clothing-db',
  synchronize: true,
  logging: true,
  entities: ['src/models/**/*.*'],
  migrations: ['src/migration/**/*.*'],
  subscribers: ['src/subscriber/**/*.*'],
  cli: {
    entitiesDir: 'src/models',
    migrationsDir: 'src/migration',
    subscribersDir: 'src/subscriber',
  },
};
