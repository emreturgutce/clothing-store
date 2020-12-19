import { Field, InputType } from 'type-graphql';

@InputType()
export class CompleteOrderInput {
    @Field()
    id!: string;

    @Field()
    token!: string;
}
