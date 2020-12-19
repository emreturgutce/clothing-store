import { Min } from 'class-validator';
import { Field, InputType } from 'type-graphql';

@InputType()
class OrderProductInput {
    @Field()
    productId!: string;

    @Field()
    @Min(0)
    quantity!: number;
}

@InputType()
export class OrderInputs {
    @Field(() => [OrderProductInput])
    orderProductInputs!: OrderProductInput[];

    @Field()
    addressId!: string;
}
