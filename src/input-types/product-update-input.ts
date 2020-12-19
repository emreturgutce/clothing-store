import { IsNumber, Length, Min } from 'class-validator';
import { Field, InputType } from 'type-graphql';

@InputType()
export class ProductUpdateInput {
    @Field({ nullable: true })
    @Length(2, 255, { message: 'name must be between 2 and 255 characters' })
    name?: string;

    @Field({ nullable: true })
    @IsNumber(undefined, { message: 'price must be number' })
    @Min(0)
    price?: number;

    @Field({ nullable: true })
    @Length(2, 255, {
        message: 'description must be between 2 and 255 characters',
    })
    description?: string;

    @Field({ nullable: true })
    @IsNumber(undefined, { message: 'price must be number' })
    @Min(0)
    stock?: number;

    @Field(() => [String], { nullable: true })
    categoryNames?: string[];
}
