import { Arg, Authorized, Query, Resolver } from 'type-graphql';
import { PaginationInput } from '../../input-types/pagination-input';
import { Product } from '../../models/product';
import { PaginatedProductsResponse } from '../../response-types/paginated-products';

@Resolver()
export class GetProductsResolver {
  @Authorized()
  @Query(() => PaginatedProductsResponse, { nullable: true })
  async getProducts(
    @Arg('data') { take, skip }: PaginationInput,
  ): Promise<PaginatedProductsResponse> {
    const [products, total] = await Product.findAndCount({
      relations: ['owner', 'categories'],
      take,
      skip: skip * take,
    });

    return {
      items: products,
      hasMore: (skip + 1) * take < total,
      total,
    };
  }
}
