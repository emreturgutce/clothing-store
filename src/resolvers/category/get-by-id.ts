import { Arg, Authorized, Query, Resolver } from 'type-graphql';
import { Category } from '../../models/category';
import { UserRoles } from '../../types';

@Resolver()
export class GetCategoryByIdResolver {
    @Authorized([UserRoles.user, UserRoles.admin])
    @Query(() => Category, { nullable: true })
    async getCategoryById(
        @Arg('id') id: string,
    ): Promise<Category | undefined> {
        return Category.findOne({ where: { id } });
    }
}
