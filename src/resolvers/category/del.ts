import { Arg, Authorized, Mutation, Resolver } from 'type-graphql';
import { Category } from '../../models/category';

@Resolver()
export class DelCategoryResolver {
  @Authorized()
  @Mutation(() => Boolean)
  async delCategory(
    @Arg('categoryId')
    categoryId: string,
  ): Promise<boolean> {
    const result = await Category.delete(categoryId);

    if (!result.affected) {
      return false;
    }

    return true;
  }
}
