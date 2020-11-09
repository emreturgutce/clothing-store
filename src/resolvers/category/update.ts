import { Arg, Authorized, Mutation, Resolver } from 'type-graphql';
import { Category } from '../../models/category';
import { CategoryInput } from '../../input-types/category-input';
import { UserRoles } from '../../types';

@Resolver()
export class UpdateCategoryResolver {
  @Authorized([UserRoles.admin])
  @Mutation(() => Boolean)
  async updateCategory(
    @Arg('id') id: string,
    @Arg('data') { name }: CategoryInput,
  ): Promise<boolean> {
    return Category.updateNameById(id, name);
  }
}
