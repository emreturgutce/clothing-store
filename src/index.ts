import 'reflect-metadata';
import { createConnection } from 'typeorm';
import { app } from './app';
import { PORT } from './config';

createConnection()
  .then(() => {
    console.log(`🐘 Connected to Postgres DB`);
  })
  .catch((err) => {
    console.error(`❌ Error occurred connecting Postgres DB:\n${err}`);
    process.exit(1);
  });

app.listen(PORT, () => {
  console.log(`🚀 Server ready at http://localhost:4000/graphql`);
});
