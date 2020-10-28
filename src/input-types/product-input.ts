import { IsNumber, Length } from 'class-validator';
import { Field, InputType } from 'type-graphql';

@InputType()
export class ProductInput {
  @Field()
  @Length(2, 255)
  name!: string;

  @Field()
  @IsNumber()
  price!: number;

  @Field()
  @Length(2, 255)
  description!: string;

  @Field()
  @IsNumber()
  stock!: number;
}
