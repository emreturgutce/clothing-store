import { IsPhoneNumber, Length } from 'class-validator';
import { Field, InputType } from 'type-graphql';
import { LoginInput } from './login-input';

@InputType()
export class RegisterInput extends LoginInput {
  @Field({ nullable: true })
  @Length(2, 255)
  name?: string;

  @Field({ nullable: true })
  @IsPhoneNumber('TR')
  phone?: string;
}
