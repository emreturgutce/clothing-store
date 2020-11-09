import { Arg, Authorized, Mutation, Resolver } from 'type-graphql';
import { Category } from '../../models/category';
import { CategoryInput } from '../../input-types/category-input';
import { UserRoles } from '../../types';

@Resolver()
export class AddCategoryResolver {
  @Authorized([UserRoles.user, UserRoles.admin])
  @Mutation(() => Category, { nullable: true })
  async addCategory(
    @Arg('data') { name }: CategoryInput,
  ): Promise<Category | null> {
    return Category.create({
      name,
    }).save();
  }
}
