import faker from 'faker';
import { registerMutation } from '../../../mutations';
import { helloQuery } from '../../../mutations/hello';
import { gCall } from '../../../utils';

describe('Register Mutation Test Suite', () => {
  it('Hello Query', async () => {
    const response = await gCall(helloQuery, undefined);

    expect(response).toMatchObject({
      data: {
        hello: 'hello World',
      },
    });
  });

  it('Should fail with undefined password', async () => {
    const user = {
      name: faker.name.firstName(1),
      email: faker.internet.email(),
    };

    const response = await gCall(registerMutation, { data: user });

    expect(response.data!.register).toBeNull();
  });

  it('Should fail with invalid password', async () => {
    const user = {
      name: faker.name.firstName(1),
      email: faker.internet.email(),
      password: '12345',
    };

    const response = await gCall(registerMutation, { data: user });

    expect(response.data!.register).toBeNull();
  });

  it('Should fail with undefined email', async () => {
    const user = {
      name: faker.name.firstName(1),
      password: faker.internet.password(6),
    };

    const response = await gCall(registerMutation, { data: user });

    expect(response.data!.register).toBeNull();
  });

  it('Should fail with invalid email', async () => {
    const user = {
      name: faker.name.firstName(1),
      email: 'invalidemail',
      password: faker.internet.password(6),
    };

    const response = await gCall(registerMutation, { data: user });

    expect(response.data!.register).toBeNull();
  });

  it('Should create user successfully', async () => {
    const user = {
      name: faker.name.firstName(1),
      email: faker.internet.email(),
      password: faker.internet.password(6),
    };

    const response = await gCall(registerMutation, { data: user });

    expect(response.data).toBeDefined();
    expect(response.data!.register.email).toEqual(user.email);
    expect(response.data!.register.password).toBeUndefined();
    expect(response.data!.register.detail.name).toEqual(user.name);
  });
});
