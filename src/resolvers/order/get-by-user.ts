import { Authorized, Ctx, Query, Resolver } from 'type-graphql';
import jwt from 'jsonwebtoken';
import { Context } from '../../types';
import { JWT_SECRET } from '../../config';
import { Order } from '../../models/order';

@Resolver()
export class GetOrderByUserResolver {
  @Authorized()
  @Query(() => [Order])
  async getOrderByUser(@Ctx() { req }: Context): Promise<Order[]> {
    const id = jwt.verify(req.session!.userId, JWT_SECRET);

    const order = await Order.find({
      where: { user: { id } },
      join: {
        alias: 'order',
        leftJoinAndSelect: {
          orderProducts: 'order.orderProducts',
          product: 'orderProducts.product',
        },
      },
    });

    return order;
  }
}
