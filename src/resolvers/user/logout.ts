import { Authorized, Ctx, Query, Resolver } from 'type-graphql';
import { COOKIE_NAME } from '../../constants';
import { Context } from '../../types';

@Resolver()
export class MeResolver {
  @Authorized()
  @Query(() => Boolean)
  async logout(@Ctx() ctx: Context): Promise<Boolean | any> {
    return new Promise((resolve, reject) => {
      ctx.req.session!.destroy((err: Error) => {
        if (err) {
          return reject(err);
        }

        ctx.res.clearCookie(COOKIE_NAME);

        return resolve(true);
      });
    });
  }
}
