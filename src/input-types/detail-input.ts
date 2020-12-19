import { IsPhoneNumber, Length } from 'class-validator';
import { Field, InputType } from 'type-graphql';

@InputType()
export class DetailInput {
    @Field({ nullable: true })
    @Length(2, 255, { message: 'name must be between 2 and 255 characters' })
    name?: string;

    @Field({ nullable: true })
    @IsPhoneNumber('TR', { message: 'phone number must be valid' })
    phone?: string;
}
