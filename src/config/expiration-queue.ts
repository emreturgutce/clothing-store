import Queue from 'bull';
import { REDIS_HOST } from '.';
import { Order } from '../models/order';
import { OrderStatus } from '../types';

interface Payload {
  orderId: string;
}

const expirationQueue = new Queue<Payload>('order:expiration', {
  redis: {
    host: REDIS_HOST,
  },
});

expirationQueue.process(async ({ data: { orderId } }) => {
  if (!orderId) {
    return null;
  }

  await Order.update(orderId, { status: OrderStatus.expired });
});

export { expirationQueue };
