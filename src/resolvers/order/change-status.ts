import { Arg, Authorized, Ctx, Mutation, Resolver } from 'type-graphql';
import jwt from 'jsonwebtoken';
import { Order, OrderStatus } from '../../models/order';
import { Context } from '../../types/context';
import { JWT_SECRET } from '../../config';

@Resolver()
export class ChangeOrderStatusResolver {
  @Authorized()
  @Mutation(() => Boolean, { nullable: true })
  async changeOrderStatus(
    @Arg('id') id: string,
    @Arg('status') status: OrderStatus,
    @Ctx() { req }: Context,
  ): Promise<boolean> {
    if (status === OrderStatus.created) {
      return false;
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
      return false;
    }

    if (order.status === OrderStatus.cancelled) {
      return false;
    }

    if (order.expiresAt < new Date().getTime()) {
      order.status = OrderStatus.cancelled;

      await order.save();

      return false;
    }

    if (status === order.status) {
      return false;
    }

    if (order.user.id !== userId) {
      return false;
    }

    if (status === OrderStatus.completed) {
      if (order.status === OrderStatus.paymentWaiting) {
        order.status = status;
      } else {
        return false;
      }
    } else {
      if (status === OrderStatus.cancelled) {
        for await (const { product, quantity } of order.orderProducts) {
          product.stock += quantity;

          await product.save();
        }
      }
      order.status = status;
    }

    await order.save();

    return true;
  }
}
