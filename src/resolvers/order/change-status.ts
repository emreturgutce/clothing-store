import {
  Arg,
  Authorized,
  Ctx,
  Mutation,
  Resolver,
  createUnionType,
} from 'type-graphql';
import jwt from 'jsonwebtoken';
import { Order } from '../../models/order';
import { Context, OrderStatus } from '../../types';
import { JWT_SECRET, stripe } from '../../config';
import { Payment } from '../../models/payment';
import { ChangeStatusInput } from '../../input-types/change-status-input';

const ReturnType = createUnionType({
  name: 'ReturnType',
  types: () => [Payment, Order] as const,
});

@Resolver()
export class ChangeOrderStatusResolver {
  @Authorized()
  @Mutation(() => ReturnType, { nullable: true })
  async changeOrderStatus(
    @Arg('data') { id, status, token }: ChangeStatusInput,
    @Ctx() { req }: Context,
  ): Promise<Payment | Order | null> {
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
      order.status === OrderStatus.cancelled ||
      order.status === OrderStatus.expired ||
      order.status === status ||
      order.user.id !== userId
    ) {
      return null;
    }

    if (status === OrderStatus.completed) {
      if (order.status === OrderStatus.awaitingPayment) {
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
        order.status = status;

        await order.save();

        return payment;
      }
    } else {
      if (status === OrderStatus.cancelled) {
        for await (const { product, quantity } of order.orderProducts) {
          product.stock += quantity;

          await product.save();
        }
      }
      order.status = status;

      await order.save();

      return order;
    }

    return null;
  }
}
