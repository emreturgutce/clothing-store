import faker from 'faker';

export const createFakeUser = () => {
    return {
        name: faker.name.firstName(0),
        phone: faker.phone.phoneNumber(),
        email: faker.internet.email(),
        password: faker.internet.password(8),
    };
};
