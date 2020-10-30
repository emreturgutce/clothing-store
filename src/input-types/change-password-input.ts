import { Length } from 'class-validator';
import { Field, InputType } from 'type-graphql';

@InputType()
export class ChangePasswordInput {
  @Field()
  token!: string;

  @Field()
  @Length(6, 255, { message: 'password must be between 6 and 255 characters' })
  password!: string;
}
