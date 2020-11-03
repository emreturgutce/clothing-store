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

expirationQueue.process(async ({ data: { orderId } }, done) => {
  if (!orderId) {
    return done(new Error('OrderId could not found.'));
  }

  const order = await Order.findOne(orderId);

  if (!order) {
    return done();
  }

  if (order.status === OrderStatus.completed) {
    return done();
  }

  order.status = OrderStatus.expired;

  await order.save();

  return done();
});

export { expirationQueue };
