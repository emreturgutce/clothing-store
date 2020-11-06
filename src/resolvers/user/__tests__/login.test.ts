import faker from 'faker';
import { loginMutation } from '../../../mutations';
import { gCall } from '../../../utils';

describe('Login Mutation Test Suite', () => {
  it('Should fail with undefined password', async () => {
    const user = {
      name: faker.name.firstName(1),
      email: faker.internet.email(),
      password: faker.internet.password(6),
    };

    await global.signup(user);

    const response = await gCall(loginMutation, {
      data: { email: user.email },
    });

    expect(response.errors).toBeDefined();
    expect(response.data!.login).toBeNull();
  });

  it('Should fail with invalid password', async () => {
    const user = {
      name: faker.name.firstName(1),
      email: faker.internet.email(),
      password: faker.internet.password(6),
    };

    await global.signup(user);

    const response = await gCall(loginMutation, {
      data: { email: user.email, password: '12345' },
    });

    expect(response.errors).toBeDefined();
    expect(response.data!.login).toBeNull();
  });

  it('Should fail with wrong password', async () => {
    const user = {
      name: faker.name.firstName(1),
      email: faker.internet.email(),
      password: faker.internet.password(6),
    };

    await global.signup(user);

    const response = await gCall(loginMutation, {
      data: { email: user.email, password: 'thispasswordiswrong' },
    });

    expect(response.data!.login).toBeNull();
  });

  it('Should fail with undefined email', async () => {
    const user = {
      name: faker.name.firstName(1),
      email: faker.internet.email(),
      password: faker.internet.password(6),
    };

    await global.signup(user);

    const response = await gCall(loginMutation, {
      data: { password: user.password },
    });

    expect(response.errors).toBeDefined();
    expect(response.data!.login).toBeNull();
  });

  it('Should fail with invalid email', async () => {
    const user = {
      name: faker.name.firstName(1),
      email: faker.internet.email(),
      password: faker.internet.password(6),
    };

    await global.signup(user);

    const response = await gCall(loginMutation, {
      data: { email: 'invalidemail', password: user.password },
    });

    expect(response.errors).toBeDefined();
    expect(response.data!.login).toBeNull();
  });

  it('Should fail with wrong email', async () => {
    const user = {
      name: faker.name.firstName(1),
      email: faker.internet.email(),
      password: faker.internet.password(),
    };

    await global.signup(user);

    const response = await gCall(loginMutation, {
      data: { email: `${user.email}m`, password: user.password },
    });

    expect(response.errors).toBeDefined();
    expect(response.data!.login).toBeNull();
  });

  it('Should login successfully', async () => {
    const user = {
      name: faker.name.firstName(1),
      email: faker.internet.email(),
      password: faker.internet.password(6),
    };

    await global.signup(user);

    const response = await gCall(loginMutation, {
      data: { email: user.email, password: user.password },
    });

    expect(response.data).toBeDefined();
    expect(response.data!.login.email).toEqual(user.email);
    expect(response.data!.login.password).toBeUndefined();
  });
});
