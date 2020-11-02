import 'reflect-metadata';
import 'colors';
import { createConnection } from 'typeorm';
import { app } from './app';
import { initializeApolloServer, PORT } from './config';

createConnection()
  .then(() => {
    console.log(`🐘 Connected to Postgres DB`.bgBlue);
  })
  .catch((err) => {
    console.error(`❌ Error occurred connecting Postgres DB:\n${err}`.red);
    process.exit(1);
  });

initializeApolloServer(app)
  .then(() => {
    app.listen(PORT, () => {
      const url = `http://localhost:4000/graphql`.red;
      console.log(`🚀 Server ready at ${url}`.bgCyan.black);
    });
  })
  .catch((err) => {
    console.error(`${err}`.red);
    process.exit(1);
  });
