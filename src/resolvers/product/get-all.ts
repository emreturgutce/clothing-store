import { Authorized, Query, Resolver } from 'type-graphql';
import { Product } from '../../models/product';

@Resolver()
export class GetAllProductsResolver {
  @Authorized()
  @Query(() => [Product], { nullable: true })
  async getAllProducts(): Promise<Product[]> {
    const products = await Product.find({});

    return products;
  }
}
