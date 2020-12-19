import { createTestClient } from 'apollo-server-testing';
import { loginMutation, registerMutation } from '../../../mutations';
import { UserRoles } from '../../../types';
import { createTestUser } from '../../../utils/create-test-user';

describe('Register Mutation Test Suite', () => {
    it('Successful Login Mutation', async () => {
        const { mutate } = createTestClient(global.server);

        const user = createTestUser();

        await mutate({
            mutation: registerMutation,
            variables: { data: user },
        });

        const res = await mutate({
            mutation: loginMutation,
            variables: { data: { email: user.email, password: user.password } },
        });

        expect(res).toBeDefined();
        expect(res.errors).toBeUndefined();
        expect(res.extensions).toBeUndefined();
        expect(res.data.login).toBeDefined();

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
        } = res.data.login;

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

    it('Should Fail With Wrong Password', async () => {
        const { mutate } = createTestClient(global.server);

        const user = createTestUser();

        await mutate({
            mutation: registerMutation,
            variables: { data: user },
        });

        const res = await mutate({
            mutation: loginMutation,
            variables: {
                data: { email: user.email, password: 'wrongpassword' },
            },
        });

        expect(res).toBeDefined();
        expect(res.errors).toBeDefined();
        // @ts-ignore
        expect(res.errors[0].message).toEqual('Wrong email or password');
        expect(res.extensions).toBeUndefined();
        expect(res.data.login).toBeNull();
    });

    it('Should Fail With Wrong Email', async () => {
        const { mutate } = createTestClient(global.server);

        const user = createTestUser();

        await mutate({
            mutation: registerMutation,
            variables: { data: user },
        });

        const res = await mutate({
            mutation: loginMutation,
            variables: {
                data: { email: 'wrong@email.com', password: user.password },
            },
        });

        expect(res).toBeDefined();
        expect(res.errors).toBeDefined();
        // @ts-ignore
        expect(res.errors[0].message).toEqual('Wrong email or password');
        expect(res.extensions).toBeUndefined();
        expect(res.data.login).toBeNull();
    });
});
