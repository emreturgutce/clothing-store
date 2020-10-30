import { Authorized, Query, Resolver } from 'type-graphql';
import { Category } from '../../models/category';

@Resolver()
export class GetCategoriesResolver {
  @Authorized()
  @Query(() => [Category], { nullable: true })
  async getCategories(): Promise<Category[] | null> {
    const category = await Category.find({});

    return category;
  }
}
