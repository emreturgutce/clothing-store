import { IsPhoneNumber, Length } from 'class-validator';
import { Field, InputType } from 'type-graphql';
import { LoginInput } from './login-input';

@InputType()
export class RegisterInput extends LoginInput {
  @Field({ nullable: true })
  @Length(2, 255, {
    message: 'name must be between 2 and 255 characters',
  })
  name?: string;

  @Field({ nullable: true })
  @IsPhoneNumber('TR', { message: 'phone number must be valid' })
  phone?: string;
}
