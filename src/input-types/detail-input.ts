import { IsPhoneNumber } from 'class-validator';
import { Field, InputType } from 'type-graphql';

@InputType()
export class DetailInput {
  @Field()
  name?: string;

  @Field()
  @IsPhoneNumber('TR')
  phone?: string;
}
