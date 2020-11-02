import { Arg, Authorized, Ctx, Mutation, Resolver } from 'type-graphql';
import jwt from 'jsonwebtoken';
import { JWT_SECRET } from '../../config';
import { OrderInputs } from '../../input-types/order-input';
import { Order } from '../../models/order';
import { OrderProduct } from '../../models/order-product';
import { Product } from '../../models/product';
import { User } from '../../models/user';
import { Context } from '../../types';
import { Address } from '../../models/address';

@Resolver()
export class CreateOrderResolver {
  @Authorized()
  @Mutation(() => Order, { nullable: true })
  async createOrder(
    @Arg('orderProducts') { orderProductInputs, addressId }: OrderInputs,
    @Ctx() { req }: Context,
  ): Promise<Order | null> {
    const userId = jwt.verify(req.session!.userId, JWT_SECRET);

    const user = await User.findOne({ where: { id: userId } });

    if (!user) {
      return null;
    }

    const orderProducts: OrderProduct[] = [];

    for await (const { productId, quantity } of orderProductInputs) {
      const product = await Product.findOne({
        where: { id: productId },
      });

      if (!product) {
        continue;
      }

      product.stock -= quantity;

      await product.save();

      const orderProduct = await OrderProduct.create({
        product,
        quantity,
      }).save();

      orderProducts.push(orderProduct);
    }

    const address = await Address.findOne({ where: { id: addressId, user } });

    const order = await Order.create({
      user,
      orderProducts,
      address,
    }).save();

    return order;
  }
}
