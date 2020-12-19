import { Min } from 'class-validator';
import { Field, InputType, Int } from 'type-graphql';

@InputType()
export class PaginationInput {
    @Field(() => Int)
    @Min(0, { message: 'take must be 0 or more' })
    take!: number;

    @Field(() => Int)
    @Min(0, { message: 'skip must be 0 or more' })
    skip!: number;
}
