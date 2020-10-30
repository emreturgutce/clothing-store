import { Arg, Authorized, Mutation, Resolver } from 'type-graphql';
import { Order } from '../../models/order';

@Resolver()
export class DelOrderResolver {
  @Authorized()
  @Mutation(() => Boolean)
  async delOrder(@Arg('id') id: string): Promise<boolean> {
    const result = await Order.delete(id);

    if (!result.affected) {
      return false;
    }

    return true;
  }
}
