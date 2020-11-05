import { Arg, Authorized, Query, Resolver } from 'type-graphql';
import { Product } from '../../models/product';

@Resolver()
export class GetProductByIdResolver {
  @Authorized()
  @Query(() => Product)
  async getProductById(@Arg('id') id: string): Promise<Product> {
    const product = await Product.findOneOrFail(id);

    return product;
  }
}
