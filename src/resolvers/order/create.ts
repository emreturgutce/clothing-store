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
import { expirationQueue } from '../../config/expiration-queue';
import { calculateDelay } from '../../utils/calculate-delay';

@Resolver()
export class CreateOrderResolver {
  @Authorized()
  @Mutation(() => Order, { nullable: true })
  async createOrder(
    @Arg('orderProducts') { orderProductInputs, addressId }: OrderInputs,
    @Ctx() { req }: Context,
  ): Promise<Order | null> {
    const userId = jwt.verify(req.session!.userId, JWT_SECRET);

    const user = await User.findOneOrFail({ where: { id: userId } });

    const orderProducts: OrderProduct[] = [];

    for await (const { productId, quantity } of orderProductInputs) {
      const product = await Product.findOneOrFail({
        where: { id: productId },
      });

      if (quantity > product.stock) {
        throw new Error('Stock error');
      }

      product.stock -= quantity;

      const orderProduct = OrderProduct.create({
        product,
        quantity,
      });

      orderProducts.push(orderProduct);
    }

    const address = await Address.findOneOrFail({
      where: { id: addressId, user },
    });

    const order = await Order.create({
      user,
      orderProducts,
      address,
    }).save();

    await expirationQueue.add(
      { orderId: order.id },
      { delay: calculateDelay(order.expiresAt) },
    );

    return order;
  }
}
