import { define } from 'typeorm-seeding';
import Faker from 'faker';
import { User } from '../models/user';

define(User, (faker: typeof Faker) => {
    const gender = faker.random.number(1);

    const userOptions = {
        name: faker.name.firstName(gender),
        phone: faker.phone.phoneNumber(),
        email: faker.internet.email(),
        password: faker.internet.password(),
    };

    const user = User.create(userOptions);

    return user;
});
