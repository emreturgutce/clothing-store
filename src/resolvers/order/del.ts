import { Arg, Authorized, Mutation, Resolver } from 'type-graphql';
import { Order } from '../../models/order';
import { UserRoles } from '../../types';

@Resolver()
export class DeleteOrderResolver {
  @Authorized([UserRoles.admin])
  @Mutation(() => Boolean)
  async deleteOrder(@Arg('id') id: string): Promise<boolean> {
    return Order.deleteById(id);
  }
}
