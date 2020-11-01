import { Field, InputType } from 'type-graphql';
import { OrderStatus } from '../types/order-status';

@InputType()
export class ChangeStatusInput {
  @Field()
  id!: string;

  @Field(() => OrderStatus)
  status!: OrderStatus;

  @Field()
  token!: string;
}
