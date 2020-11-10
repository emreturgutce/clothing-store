import faker from 'faker';
import { PHONE_NUMBER_FORMAT } from '../constants';

type CreateTestUserOptions = {
  name?: string;
  phone?: string;
  email?: string;
  password?: string;
};

export const createTestUser = (param?: CreateTestUserOptions) => {
  return {
    name: param?.name || faker.name.firstName(1),
    phone: param?.phone || faker.phone.phoneNumber(PHONE_NUMBER_FORMAT),
    email: param?.email || faker.internet.email(),
    password: param?.password || faker.internet.password(6),
  };
};
