import { Arg, Authorized, Mutation, Resolver } from 'type-graphql';
import { Category } from '../../models/category';
import { CategoryInput } from '../../input-types/category-input';

@Resolver()
export class UpdateCategoryResolver {
  @Authorized()
  @Mutation(() => Boolean)
  async updateCategory(
    @Arg('id') id: string,
    @Arg('data')
    { name }: CategoryInput,
  ): Promise<boolean> {
    const result = await Category.update({ id }, { name });

    if (!result.affected) {
      return false;
    }

    return true;
  }
}
