import { Arg, Authorized, Mutation, Resolver } from 'type-graphql';
import { Category } from '../../models/category';
import { ProductInput } from '../../input-types/product-input';
import { Product } from '../../models/product';

interface UpdateOptions {
  name?: string;
  description?: string;
  price?: number;
  stock?: number;
  categories?: Category[];
}

@Resolver()
export class UpdateProductResolver {
  @Authorized()
  @Mutation(() => Boolean)
  async updateProduct(
    @Arg('id') id: string,
    @Arg('data')
    { name, description, price, stock, categoryNames }: ProductInput,
  ): Promise<boolean> {
    let categories: Category[];

    const updateOptions: UpdateOptions = {
      name,
      description,
      price,
      stock,
    };

    if (categoryNames) {
      categories = await Category.findByNames(categoryNames);
      updateOptions.categories = categories;
    }

    const product = await Product.findOneOrFail(id);

    if (name) {
      product.name = name;
    }

    if (description) {
      product.description = description;
    }

    if (price) {
      product.price = price;
    }

    if (stock) {
      product.stock = stock;
    }

    if (updateOptions.categories) {
      product.categories = updateOptions.categories;
    }

    await product.save();

    return true;
  }
}
