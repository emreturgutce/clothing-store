import { Arg, Authorized, Ctx, Mutation, Resolver } from 'type-graphql';
import jwt from 'jsonwebtoken';
import { Order } from '../../models/order';
import { Context, OrderStatus } from '../../types';
import { JWT_SECRET } from '../../config';
import { CancelOrderInput } from '../../input-types/cancel-order-input';

@Resolver()
export class CancelOrderResolver {
  @Authorized()
  @Mutation(() => Order, { nullable: true })
  async cancelOrder(
    @Arg('data') { id }: CancelOrderInput,
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

    for await (const { product, quantity } of order.orderProducts) {
      product.stock += quantity;
    }

    order.status = OrderStatus.cancelled;

    await order.save();

    return order;
  }
}
