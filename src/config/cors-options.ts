import { FRONTEND_URL } from '../constants';

export const corsOptions = {
  origin: FRONTEND_URL,
  credentials: true,
};
