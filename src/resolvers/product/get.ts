import { Arg, Authorized, Query, Resolver } from 'type-graphql';
import { Product } from '../../models/product';

@Resolver()
export class GetProductsResolver {
  @Authorized()
  @Query(() => [Product], { nullable: true })
  async getProducts(
    @Arg('take') take: number,
    @Arg('skip') skip: number,
  ): Promise<Product[]> {
    const [products, total] = await Product.findAndCount({
      relations: ['owner', 'categories'],
      take,
      skip: skip * take,
    });

    if (take) {
      console.log({
        page: Math.ceil((total - take * skip) / take),
        lastPage: Math.ceil(total / take),
      });
    }

    return products;
  }
}
