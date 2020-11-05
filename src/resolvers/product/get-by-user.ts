import { Authorized, Ctx, Query, Resolver } from 'type-graphql';
import jwt from 'jsonwebtoken';
import { Product } from '../../models/product';
import { Context } from '../../types';
import { JWT_SECRET } from '../../config';

@Resolver()
export class GetProductByUserResolver {
  @Authorized()
  @Query(() => [Product])
  async getProductByUser(@Ctx() { req }: Context): Promise<Product[]> {
    const id = jwt.verify(req.session!.userId, JWT_SECRET);

    const product = await Product.find({
      where: { owner: { id } },
    });

    return product;
  }
}
