import { Length } from 'class-validator';
import { Field, ID, InputType } from 'type-graphql';

@InputType()
export class CategoryInput {
  @Field(() => ID, { nullable: true })
  id?: string;

  @Field()
  @Length(2, 255)
  name!: string;
}
