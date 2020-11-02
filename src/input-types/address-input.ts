import { Length, Max, Min } from 'class-validator';
import { Field, InputType } from 'type-graphql';

@InputType()
export class AddressInput {
  @Field()
  @Length(2, 255, {
    message: 'addressLines must be between 2 and 255 characters',
  })
  addressLines!: string;

  @Field()
  @Min(1000)
  @Max(70000)
  zipcode!: number;

  @Field()
  @Length(2, 100, { message: 'city must be between 2 and 100 ' })
  city!: string;
}

@InputType()
export class OptionalAddressInput {
  @Field({ nullable: true })
  @Length(2, 255, {
    message: 'addressLines must be between 2 and 255 characters',
  })
  addressLines?: string;

  @Field({ nullable: true })
  @Min(1000)
  @Max(70000)
  zipcode?: number;

  @Field({ nullable: true })
  @Length(2, 100, { message: 'city must be between 2 and 100 ' })
  city?: string;
}
