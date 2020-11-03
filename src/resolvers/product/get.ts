import { Authorized, Query, Resolver } from 'type-graphql';
import { Product } from '../../models/product';

@Resolver()
export class GetProductsResolver {
  @Authorized()
  @Query(() => [Product], { nullable: true })
  async getProducts(): Promise<Product[]> {
    const products = await Product.find({ relations: ['owner', 'categories'] });

    return products;
  }
}
