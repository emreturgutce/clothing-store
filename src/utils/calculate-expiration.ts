import { ORDER_EXPIRATION_TIME } from '../constants';

export const calculateExpiration = () => {
  const expiration = new Date();

  return expiration.setSeconds(expiration.getSeconds() + ORDER_EXPIRATION_TIME);
};
