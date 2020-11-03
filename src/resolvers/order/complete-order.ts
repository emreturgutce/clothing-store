import { Arg, Authorized, Ctx, Mutation, Resolver } from 'type-graphql';
import jwt from 'jsonwebtoken';
import { Order } from '../../models/order';
import { Context, OrderStatus } from '../../types';
import { JWT_SECRET, stripe } from '../../config';
import { Payment } from '../../models/payment';
import { CompleteOrderInput } from '../../input-types/complete-order-input';

@Resolver()
export class CompleteOrderResolver {
  @Authorized()
  @Mutation(() => Order, { nullable: true })
  async completeOrderStatus(
    @Arg('data') { id, token }: CompleteOrderInput,
    @Ctx() { req }: Context,
  ): Promise<Order | null> {
    const userId = jwt.verify(req.session!.userId, JWT_SECRET);

    const order = await Order.findOneOrFail(id, {
      join: {
        alias: 'order',
        leftJoinAndSelect: {
          user: 'order.user',
          address: 'order.address',
          orderProducts: 'order.orderProducts',
          product: 'orderProducts.product',
        },
      },
    });

    if (
      order.status !== OrderStatus.awaitingPayment ||
      order.user.id !== userId
    ) {
      return null;
    }

    const charge = await stripe.charges.create({
      currency: 'usd',
      amount:
        order.orderProducts
          .map((oP) => oP.product.price * oP.quantity)
          .reduce((total, amount) => total + amount) * 100,
      source: token,
    });

    const payment = await Payment.create({
      stripeId: charge.id,
    }).save();

    order.payment = payment;
    order.status = OrderStatus.completed;

    await order.save();

    return order;
  }
}
