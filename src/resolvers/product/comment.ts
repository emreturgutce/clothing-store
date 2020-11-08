import { Arg, Authorized, Ctx, Mutation, Resolver } from 'type-graphql';
import jwt from 'jsonwebtoken';
import { JWT_SECRET } from '../../config';
import { Product } from '../../models/product';
import { User } from '../../models/user';
import { Context, UserRoles } from '../../types';
import { Comment } from '../../models/comment';

@Resolver()
export class CommentProductResolver {
  @Authorized([UserRoles.user, UserRoles.admin])
  @Mutation(() => Product, { nullable: true })
  async commentProduct(
    @Arg('productId') productId: string,
    @Arg('content') content: string,
    @Ctx() { req }: Context,
  ): Promise<Product | null> {
    const userId = jwt.verify(req.session!.userId, JWT_SECRET);

    const user = await User.findOneOrFail({ where: { id: userId } });

    const product = await Product.findOneOrFail({
      where: { id: productId },
      relations: ['comments'],
    });

    const val = user.checkIfUserBoughtTheProduct(product);

    if (!val) {
      return null;
    }

    const comment = Comment.create({ content });

    if (!product.comments) {
      product.comments = [comment];
    } else {
      product.comments.push(comment);
    }

    await product.save();

    return product;
  }
}
