import { Arg, Authorized, Query, Resolver } from 'type-graphql';
import { Product } from '../../models/product';

@Resolver()
export class GetProductByIdResolver {
  @Authorized()
  @Query(() => Product, { nullable: true })
  async getProductById(
    @Arg('productId') productId: string,
  ): Promise<Product | undefined> {
    const product = await Product.findOne(productId);

    return product;
  }
}
