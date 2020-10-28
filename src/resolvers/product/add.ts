import { Arg, Mutation, Resolver } from 'type-graphql';
import { ProductInput } from '../../input-types/product-input';
import { Product } from '../../models/product';

@Resolver()
export class AddProductResolver {
  @Mutation(() => Product)
  async add(
    @Arg('data') { name, price, description, stock }: ProductInput,
  ): Promise<Product> {
    const product = Product.create({
      name,
      price,
      description,
      stock,
    }).save();

    return product;
  }
}
