import { IsNumber, Length } from 'class-validator';
import { Field, InputType } from 'type-graphql';

@InputType()
export class ProductInput {
  @Field()
  @Length(2, 255, { message: 'name must be between 2 and 255 characters' })
  name!: string;

  @Field()
  @IsNumber(undefined, { message: 'price must be number' })
  price!: number;

  @Field()
  @Length(2, 255, {
    message: 'description must be between 2 and 255 characters',
  })
  description!: string;

  @Field()
  @IsNumber(undefined, { message: 'price must be number' })
  stock!: number;

  @Field(() => [String], { nullable: true })
  categoryNames?: string[];
}
