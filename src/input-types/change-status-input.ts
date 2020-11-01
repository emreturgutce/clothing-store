import { Field, InputType } from 'type-graphql';
import { OrderStatus } from '../types';

@InputType()
export class ChangeStatusInput {
  @Field()
  id!: string;

  @Field()
  status!: OrderStatus;

  @Field()
  token!: string;
}
