import { createTestClient } from 'apollo-server-testing';
import { helloQuery, registerMutation } from '../../../mutations';
import { UserRoles } from '../../../types';
import { createTestUser } from '../../../utils/create-test-user';

describe('Register Mutation Test Suite', () => {
  it('Hello Query', async () => {
    const { query } = createTestClient(global.server);

    type Data = { hello: string };

    const res = await query<Data>({ query: helloQuery });

    expect(res).toBeDefined();
    expect(res.data?.hello).toEqual('hello World');
    expect(res.errors).toBeUndefined();
    expect(res.extensions).toBeUndefined();
  });

  it('Successful Register Mutation', async () => {
    const { mutate } = createTestClient(global.server);

    const user = createTestUser();

    const res = await mutate({
      mutation: registerMutation,
      variables: {
        data: user,
      },
    });

    expect(res).toBeDefined();
    expect(res.errors).toBeUndefined();
    expect(res.extensions).toBeUndefined();
    expect(res.data.register).toBeDefined();

    const {
      id,
      email,
      password,
      confirmed,
      avatarId,
      role,
      detail,
      createdAt,
      updatedAt,
    } = res.data.register;

    expect(id).toBeDefined();
    expect(email).toBeDefined();
    expect(password).toBeUndefined();
    expect(confirmed).toEqual(false);
    expect(avatarId).toBeNull();
    expect(role.name).toEqual(UserRoles.user);
    expect(detail.name).toEqual(user.name);
    expect(detail.phone).toEqual(user.phone);
    expect(createdAt).toBeDefined();
    expect(updatedAt).toBeDefined();
  });

  it('Should Fail With Invalid Email', async () => {
    const { mutate } = createTestClient(global.server);

    const res = await mutate({
      mutation: registerMutation,
      variables: {
        data: createTestUser({ email: 'invalidemail' }),
      },
    });

    expect(res).toBeDefined();
    expect(res.errors).toBeDefined();
    // @ts-ignore
    expect(res.errors[0].message).toEqual('Argument Validation Error');
    expect(res.extensions).toBeUndefined();
    expect(res.data.register).toBeNull();
  });

  it('Should Fail When Length of Password Less Than 6', async () => {
    const { mutate } = createTestClient(global.server);

    const res = await mutate({
      mutation: registerMutation,
      variables: {
        data: createTestUser({ password: '12345' }),
      },
    });

    expect(res).toBeDefined();
    expect(res.errors).toBeDefined();
    // @ts-ignore
    expect(res.errors[0].message).toEqual('Argument Validation Error');
    expect(res.extensions).toBeUndefined();
    expect(res.data.register).toBeNull();
  });
});
