import { Query, Resolver } from 'type-graphql';
import { Product } from '../../models/product';

@Resolver()
export class GetAllProductsResolver {
  @Query(() => [Product], { nullable: true })
  async getAllProducts(): Promise<Product[]> {
    const products = await Product.find({});

    return products;
  }
}
