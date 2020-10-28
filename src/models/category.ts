import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Field, ID, ObjectType } from 'type-graphql';

@ObjectType()
@Entity()
export class Category extends BaseEntity {
  @Field(() => ID)
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Field()
  @Column({ unique: true })
  name!: string;

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