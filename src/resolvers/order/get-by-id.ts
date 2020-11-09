import { Arg, Authorized, Ctx, Query, Resolver } from 'type-graphql';
import jwt from 'jsonwebtoken';
import { JWT_SECRET } from '../../config';
import { Order } from '../../models/order';
import { Context, UserRoles } from '../../types';
import { User } from '../../models/user';

@Resolver()
export class GetOrderByIdResolver {
  @Authorized([UserRoles.user, UserRoles.admin])
  @Query(() => Order, { nullable: true })
  async getOrderById(
    @Arg('id') id: string,
    @Ctx() { req }: Context,
  ): Promise<Order> {
    const userId = jwt.verify(req.session!.userId, JWT_SECRET);

    const user = await User.findOneOrFail({ where: { id: userId } });

    if (user.role.name === UserRoles.admin) {
      const order = await Order.findOneOrFail({ where: { id } });

      return order;
    }

    const order = await Order.findOneOrFail({ where: { id, user } });

    return order;
  }
}
