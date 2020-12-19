import { IsEmail, Length } from 'class-validator';
import { Field, InputType } from 'type-graphql';

@InputType()
export class LoginInput {
    @Field()
    @IsEmail(undefined, { message: 'email must be valid' })
    email!: string;

    @Field()
    @Length(6, 255, {
        message: 'password must be between 6 and 255 characters',
    })
    password!: string;
}
