import jwt from 'jsonwebtoken';
import { AuthChecker } from 'type-graphql';
import { JWT_SECRET } from '../config';
import { Context } from '../types/context';

export const authChecker: AuthChecker<Context> = ({ context }) => {
  if (!context.req.session!.userId) {
    return false;
  }

  const isValid = jwt.verify(context.req.session!.userId, JWT_SECRET);

  if (!isValid) {
    return false;
  }

  return true;
};
