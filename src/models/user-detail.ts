import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Field, ID, ObjectType } from 'type-graphql';
import { IsPhoneNumber, Length } from 'class-validator';

@ObjectType()
@Entity()
export class UserDetail extends BaseEntity {
  @Field(() => ID)
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Field({ nullable: true })
  @Column({ nullable: true })
  @Length(2, 255, {
    message: 'name must be between 2 and 255 characters',
  })
  name?: string;

  @Field({ nullable: true })
  @Column({ nullable: true, unique: true })
  @IsPhoneNumber('TR', { message: 'phone number must be valid' })
  phone?: string;

  @Field({ nullable: true })
  @CreateDateColumn({
    type: 'timestamp',
  })
  createdAt!: Date;

  @Field({ nullable: true })
  @CreateDateColumn({
    type: 'timestamp',
  })
  updatedAt!: Date;
}
