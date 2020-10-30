import { Arg, Authorized, Query, Resolver } from 'type-graphql';
import { Category } from '../../models/category';

@Resolver()
export class GetCategoryByIdResolver {
  @Authorized()
  @Query(() => Category, { nullable: true })
  async getCategoryById(
    @Arg('categoryId') categoryId: string,
  ): Promise<Category | undefined> {
    const category = await Category.findOne({ where: { id: categoryId } });

    return category;
  }
}
