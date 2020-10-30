import { Arg, Authorized, Query, Resolver } from 'type-graphql';
import { Product } from '../../models/product';

@Resolver()
export class GetProductByIdResolver {
  @Authorized()
  @Query(() => Product, { nullable: true })
  async getProductById(@Arg('id') id: string): Promise<Product | undefined> {
    const product = await Product.findOne(id);

    return product;
  }
}
