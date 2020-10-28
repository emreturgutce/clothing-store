import { Length } from 'class-validator';
import { Field, InputType } from 'type-graphql';

@InputType()
export class ChangePasswordInput {
  @Field()
  token!: string;

  @Field()
  @Length(5, 255)
  password!: string;
}
