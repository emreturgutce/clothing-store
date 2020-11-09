import { Arg, Authorized, Ctx, Query, Resolver } from 'type-graphql';
import jwt from 'jsonwebtoken';
import { Context, UserRoles } from '../../types';
import { JWT_SECRET } from '../../config';
import { Order } from '../../models/order';
import { User } from '../../models/user';

@Resolver()
export class GetOrderByUserResolver {
  @Authorized([UserRoles.user, UserRoles.admin])
  @Query(() => [Order])
  async getOrderByUser(
    @Ctx() { req }: Context,
    @Arg('userId') userId?: string,
  ): Promise<Order[]> {
    const id = jwt.verify(req.session!.userId, JWT_SECRET);

    const user = await User.findOneOrFail({ where: { id } });

    if (user.role.name === UserRoles.admin) {
      const orders = await Order.find({
        where: { user: { id: userId } },
      });

      return orders;
    }

    const orders = await Order.find({
      where: { user: { id } },
    });

    return orders;
  }
}
