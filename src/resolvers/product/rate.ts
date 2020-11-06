import { Arg, Authorized, Ctx, Mutation, Resolver } from 'type-graphql';
import jwt from 'jsonwebtoken';
import { JWT_SECRET } from '../../config';
import { Order } from '../../models/order';
import { Product } from '../../models/product';
import { User } from '../../models/user';
import { Context, OrderStatus } from '../../types';

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
export class RateProductResolver {
  @Authorized()
  @Mutation(() => Product, { nullable: true })
  async rateProduct(
    @Arg('productId') productId: string,
    @Arg('rate') rate: number,
    @Ctx() { req }: Context,
  ): Promise<Product | null> {
    const userId = jwt.verify(req.session!.userId, JWT_SECRET);

    const user = await User.findOneOrFail({ where: { id: userId } });

    const product = await Product.findOneOrFail({ where: { id: productId } });

    const orders = await Order.find({
      where: {
        user,
      },
    });

    const val = checkIfUserBoughtTheProduct(orders, product);

    if (!val) {
      return null;
    }

    if (!product.rate) {
      product.rate = [rate];
    } else {
      product.rate.push(rate);
    }

    await product.save();

    return product;
  }
}
