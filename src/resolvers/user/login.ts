import { Arg, Ctx, Mutation, Resolver } from 'type-graphql';
import { AuthenticationError } from 'apollo-server-express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { LoginInput } from '../../input-types/login-input';
import { User } from '../../models/user';
import { Context } from '../../types';
import { JWT_SECRET } from '../../config';

@Resolver()
export class LoginUserResolver {
    @Mutation(() => User, { nullable: true })
    async login(
        @Arg('data') { email, password }: LoginInput,
        @Ctx() ctx: Context,
    ): Promise<User | null> {
        const user = await User.findOne({ where: { email } });

        if (!user) {
            throw new AuthenticationError('Wrong email or password');
        }

        const isValid = await bcrypt.compare(password, user.password);

        if (!isValid) {
            throw new AuthenticationError('Wrong email or password');
        }

        ctx.req.session!.userId = jwt.sign(user.id, JWT_SECRET);

        return user;
    }
}
