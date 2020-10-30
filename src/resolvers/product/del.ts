import { Arg, Authorized, Mutation, Resolver } from 'type-graphql';
import { Product } from '../../models/product';

@Resolver()
export class DelProductResolver {
  @Authorized()
  @Mutation(() => Boolean)
  async delProduct(@Arg('id') id: string): Promise<boolean> {
    const result = await Product.delete(id);

    if (!result.affected) {
      return false;
    }

    return true;
  }
}
