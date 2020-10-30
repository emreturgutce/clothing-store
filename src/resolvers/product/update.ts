import { Arg, Authorized, Mutation, Resolver } from 'type-graphql';
import { Category } from '../../models/category';
import { ProductInput } from '../../input-types/product-input';
import { Product } from '../../models/product';

interface UpdateOptions {
  name: string;
  description: string;
  price: number;
  stock: number;
  categories?: Category[];
}

@Resolver()
export class UpdateProductResolver {
  @Authorized()
  @Mutation(() => Boolean)
  async updateProduct(
    @Arg('data')
    { id, name, description, price, stock, categoryNames }: ProductInput,
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

    const result = await Product.update({ id }, { ...updateOptions });
    if (!result.affected) {
      return false;
    }

    return true;
  }
}
