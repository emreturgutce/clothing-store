import {
  Arg,
  Authorized,
  Ctx,
  Mutation,
  Resolver,
  createUnionType,
} from 'type-graphql';
import jwt from 'jsonwebtoken';
import { Order, OrderStatus } from '../../models/order';
import { Context } from '../../types/context';
import { JWT_SECRET } from '../../config';
import { stripe } from '../../config/stripe';
import { Payment } from '../../models/payment';

const ReturnType = createUnionType({
  name: 'ReturnType',
  types: () => [Payment, Order] as const,
});

@Resolver()
export class ChangeOrderStatusResolver {
  @Authorized()
  @Mutation(() => ReturnType, { nullable: true })
  async changeOrderStatus(
    @Arg('id') id: string,
    @Arg('status') status: OrderStatus,
    @Ctx() { req }: Context,
    @Arg('token') token?: string,
  ): Promise<Payment | Order | null> {
    if (status === OrderStatus.created) {
      return null;
    }

    const userId = jwt.verify(req.session!.userId, JWT_SECRET);

    const order = await Order.findOne(id, {
      join: {
        alias: 'order',
        leftJoinAndSelect: {
          user: 'order.user',
          orderProducts: 'order.orderProducts',
          product: 'orderProducts.product',
        },
      },
    });

    if (!order) {
      return null;
    }

    if (order.status === OrderStatus.cancelled) {
      return null;
    }

    if (order.expiresAt < new Date().getTime()) {
      order.status = OrderStatus.cancelled;

      await order.save();

      return null;
    }

    if (status === order.status) {
      return null;
    }

    if (order.user.id !== userId) {
      return null;
    }

    if (status === OrderStatus.completed) {
      if (order.status === OrderStatus.paymentWaiting) {
        const charge = await stripe.charges.create({
          currency: 'usd',
          amount:
            order.orderProducts
              .map((oP) => oP.product.price * oP.quantity)
              .reduce((total, amount) => total + amount) * 100,
          source: token,
        });

        const payment = await Payment.create({
          order,
          stripeId: charge.id,
        }).save();

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
