import { Arg, Authorized, Query, Resolver } from 'type-graphql';
import { Order } from '../../models/order';

@Resolver()
export class GetOrderByIdResolver {
  @Authorized()
  @Query(() => Order, { nullable: true })
  async getOrderById(@Arg('id') id: string): Promise<Order | undefined> {
    return Order.findOneOrFail(id, {
      join: {
        alias: 'order',
        leftJoinAndSelect: {
          address: 'order.address',
          orderProducts: 'order.orderProducts',
          product: 'orderProducts.product',
        },
      },
    });
  }
}
