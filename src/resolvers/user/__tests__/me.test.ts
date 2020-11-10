import faker from 'faker';
import { PHONE_NUMBER_FORMAT } from '../../../constants';
import { meQuery } from '../../../mutations';
import { gCall } from '../../../utils';

describe('Me Mutation Test Suite', () => {
  it('Should not return me', async () => {
    const user = {
      name: faker.name.firstName(1),
      phone: faker.phone.phoneNumber(PHONE_NUMBER_FORMAT),
      email: faker.internet.email(),
      password: faker.internet.password(6),
    };
    await global.signup(user);
    const response = await gCall(meQuery, undefined);
    expect(response.errors![0].message).toEqual(
      'Access denied! You need to be authorized to perform this action!',
    );
  });
});
