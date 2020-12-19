import Queue from 'bull';
import { REDIS_HOST, REDIS_USER, REDIS_PASSWORD, REDIS_PORT } from '.';
import { Order } from '../models/order';
import { OrderStatus } from '../types';

interface Payload {
    orderId: string;
}

const expirationQueue = new Queue<Payload>('order:expiration', {
    redis: {
        username: REDIS_USER,
        host: REDIS_HOST,
        password: REDIS_PASSWORD,
        port: parseInt(REDIS_PORT, 10),
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
