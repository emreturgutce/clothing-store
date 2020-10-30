import { Arg, Authorized, Mutation, Resolver } from 'type-graphql';
import { Category } from '../../models/category';
import { CategoryInput } from '../../input-types/category-input';

@Resolver()
export class AddCategoryResolver {
  @Authorized()
  @Mutation(() => Category, { nullable: true })
  async addCategory(
    @Arg('data')
    { name }: CategoryInput,
  ): Promise<Category | null> {
    const category = await Category.create({
      name,
    }).save();

    return category;
  }
}
