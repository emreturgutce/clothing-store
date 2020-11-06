import faker from 'faker';
import { meQuery } from '../../../mutations';
import { gCall } from '../../../utils';

describe('Me Mutation Test Suite', () => {
  it('Should not return me', async () => {
    const user = {
      name: faker.name.firstName(1),
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
