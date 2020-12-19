import { Authorized, Query, Resolver } from 'type-graphql';
import { Order } from '../../models/order';

@Resolver()
export class GetOrdersResolver {
    @Authorized('ADMIN')
    @Query(() => [Order], { nullable: true })
    async getOrders(): Promise<Order[]> {
        return Order.find({});
    }
}
