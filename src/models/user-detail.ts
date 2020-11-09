import { Column, Entity } from 'typeorm';
import { Field, ObjectType } from 'type-graphql';
import { IsOptional, IsPhoneNumber, Length } from 'class-validator';
import { ExternalEntity } from './base-entity';

@ObjectType()
@Entity()
export class UserDetail extends ExternalEntity {
  @Field({ nullable: true })
  @Column({ nullable: true })
  @IsOptional()
  @Length(2, 255, {
    message: 'name must be between 2 and 255 characters',
  })
  name?: string;

  @Field({ nullable: true })
  @Column({ nullable: true, unique: true })
  @IsOptional()
  @IsPhoneNumber('TR', { message: 'phone number must be valid' })
  phone?: string;
}
