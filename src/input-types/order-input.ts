import { Field, InputType } from 'type-graphql';

@InputType()
class OrderProductInput {
  @Field()
  productId!: string;

  @Field()
  quantity!: number;
}

@InputType()
export class OrderInputs {
  @Field(() => [OrderProductInput])
  orderProductInputs!: OrderProductInput[];
}
