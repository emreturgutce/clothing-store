import { v4 as uuid } from 'uuid';
import { CONFIRM_USER_PREFIX } from '../constants';
import { redis } from '../config';

export const createConfirmationUrl = async (
  userId: string,
): Promise<string> => {
  const token = uuid();

  await redis.set(`${CONFIRM_USER_PREFIX}${token}`, userId, 'ex', 60 * 60 * 24);

  return `http://localhost:3000/user/confirm/${token}`;
};
