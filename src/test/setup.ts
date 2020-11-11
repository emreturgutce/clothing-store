import { ApolloServerBase } from 'apollo-server-core';
import 'colors';
import { createConnection, getConnection } from 'typeorm';
import { initializeApolloServerBase } from '../config/apollo-server-base';
import { clearDatabase } from '../utils';

declare global {
  namespace NodeJS {
    interface Global {
      server: ApolloServerBase;
    }
  }
}

beforeAll(async () => {
  global.server = await initializeApolloServerBase();
  await createConnection();
});

beforeEach(async () => {
  await clearDatabase();
});

afterEach(async () => {
  await clearDatabase();
});

afterAll(async () => {
  await getConnection().close();
});
