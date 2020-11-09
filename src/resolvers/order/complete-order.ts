import { Arg, Authorized, Ctx, Mutation, Resolver } from 'type-graphql';
import jwt from 'jsonwebtoken';
import { Order } from '../../models/order';
import { Context, OrderStatus, UserRoles } from '../../types';
import { JWT_SECRET, stripe } from '../../config';
import { Payment } from '../../models/payment';
import { CompleteOrderInput } from '../../input-types/complete-order-input';

@Resolver()
export class CompleteOrderResolver {
  @Authorized([UserRoles.user, UserRoles.admin])
  @Mutation(() => Order, { nullable: true })
  async completeOrder(
    @Arg('data') { id, token }: CompleteOrderInput,
    @Ctx() { req }: Context,
  ): Promise<Order | null> {
    const userId = jwt.verify(req.session!.userId, JWT_SECRET);

    const order = await Order.findOneOrFail(id);

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

    for (const { product, quantity } of order.orderProducts) {
      product.count += quantity;
    }

    const payment = Payment.create({
      stripeId: charge.id,
    });

    order.payment = payment;
    order.status = OrderStatus.completed;

    await order.save();

    return order;
  }
}
