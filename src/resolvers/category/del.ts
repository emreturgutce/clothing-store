import { Arg, Authorized, Mutation, Resolver } from 'type-graphql';
import { Category } from '../../models/category';
import { UserRoles } from '../../types';

@Resolver()
export class DelCategoryResolver {
  @Authorized([UserRoles.admin])
  @Mutation(() => Boolean)
  async delCategory(
    @Arg('id')
    id: string,
  ): Promise<boolean> {
    return Category.deleteById(id);
  }
}
