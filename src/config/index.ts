import dotenv from 'dotenv';

dotenv.config();

if (!process.env.SESSION_SECRET) {
  throw new Error('SESSION_SECRET must be defined as env variable');
}

if (!process.env.JWT_SECRET) {
  throw new Error('JWT_SECRET must be defined as env variable');
}

export const { SESSION_SECRET, JWT_SECRET } = process.env;
