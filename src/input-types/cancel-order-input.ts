import { Field, InputType } from 'type-graphql';

@InputType()
export class CancelOrderInput {
    @Field()
    id!: string;
}
