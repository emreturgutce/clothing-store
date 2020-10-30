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
    const userId = jwt.verify(req.session!.userId, JWT_SECRET);

    const order = await Order.findOne(id, { relations: ['user'] });

    if (!order) {
      return false;
    }

    if (order.user.id !== userId) {
      return false;
    }

    order.status = status;

    await order.save();

    return true;
  }
}
