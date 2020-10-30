import { Arg, Authorized, Mutation, Resolver } from 'type-graphql';
import { Product } from '../../models/product';

@Resolver()
export class DelProductResolver {
  @Authorized()
  @Mutation(() => Boolean)
  async delProduct(
    @Arg('productId')
    productId: string,
  ): Promise<boolean> {
    const result = await Product.delete(productId);

    if (!result.affected) {
      return false;
    }

    return true;
  }
}
