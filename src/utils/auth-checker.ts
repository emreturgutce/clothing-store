import jwt from 'jsonwebtoken';
import { AuthChecker } from 'type-graphql';
import { JWT_SECRET } from '../config';
import { User } from '../models/user';
import { Context } from '../types';

export const authChecker: AuthChecker<Context> = async ({ context }, roles) => {
  if (!context.req.session?.userId) {
    return false;
  }

  const userId = jwt.verify(context.req.session.userId, JWT_SECRET);

  const user = await User.findOne({ where: { id: userId } });

  if (!user) {
    return false;
  }

  if (roles.length > 0) {
    return roles.includes(user.role.name);
  }

  return true;
};
