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

  const order = await Order.findOne({
    join: {
      alias: 'order',
      leftJoinAndSelect: {
        orderProducts: 'order.orderProducts',
        product: 'orderProducts.product',
      },
    },
  });

  if (!order) {
    return done();
  }

  if (order.status === OrderStatus.completed) {
    return done();
  }

  for await (const { product, quantity } of order.orderProducts) {
    product.stock += quantity;

    await product.save();
  }

  order.status = OrderStatus.expired;

  await order.save();

  return done();
});

export { expirationQueue };
