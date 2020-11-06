import { Arg, Authorized, Ctx, Mutation, Resolver } from 'type-graphql';
import jwt from 'jsonwebtoken';
import { JWT_SECRET } from '../../config';
import { Order } from '../../models/order';
import { Product } from '../../models/product';
import { User } from '../../models/user';
import { Context, OrderStatus } from '../../types';
import { Comment } from '../../models/comment';

const checkIfUserBoughtTheProduct = (orders: Order[], product: Product) => {
  for (const { orderProducts, status } of orders) {
    if (status === OrderStatus.completed) {
      for (const { product: p } of orderProducts) {
        if (p.id === product.id) {
          return true;
        }
      }
    }
  }
  return false;
};

@Resolver()
export class CommentProductResolver {
  @Authorized()
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

    const orders = await Order.find({
      where: {
        user,
      },
    });

    const val = checkIfUserBoughtTheProduct(orders, product);

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
