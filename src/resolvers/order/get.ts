import { Authorized, Query, Resolver } from 'type-graphql';
import { Order } from '../../models/order';

@Resolver()
export class GetOrdersResolver {
  @Authorized()
  @Query(() => [Order], { nullable: true })
  async getOrders(): Promise<Order[]> {
    const orders = await Order.find({
      join: {
        alias: 'order',
        leftJoinAndSelect: {
          address: 'order.address',
          orderProducts: 'order.orderProducts',
          product: 'orderProducts.product',
        },
      },
    });

    return orders;
  }
}
