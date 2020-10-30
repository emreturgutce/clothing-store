import { Arg, Authorized, Mutation, Resolver } from 'type-graphql';
import { Category } from '../../models/category';

@Resolver()
export class DelCategoryResolver {
  @Authorized()
  @Mutation(() => Boolean)
  async delCategory(
    @Arg('id')
    id: string,
  ): Promise<boolean> {
    const result = await Category.delete(id);

    if (!result.affected) {
      return false;
    }

    return true;
  }
}
