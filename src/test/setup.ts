import { createConnection, getConnection } from 'typeorm';
import { clearDatabase } from '../utils/clear-database';

beforeAll(async () => {
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
