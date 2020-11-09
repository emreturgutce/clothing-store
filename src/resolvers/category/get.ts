import { Authorized, Query, Resolver } from 'type-graphql';
import { Category } from '../../models/category';
import { UserRoles } from '../../types';

@Resolver()
export class GetCategoriesResolver {
  @Authorized([UserRoles.user, UserRoles.admin])
  @Query(() => [Category], { nullable: true })
  async getCategories(): Promise<Category[]> {
    return Category.find({});
  }
}
