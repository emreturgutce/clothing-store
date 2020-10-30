import { Length } from 'class-validator';
import { Field, InputType } from 'type-graphql';

@InputType()
export class CategoryInput {
  @Field()
  @Length(2, 255, { message: 'name must be between 2 and 255 characters' })
  name!: string;
}
