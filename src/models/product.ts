import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  JoinTable,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Field, ID, ObjectType } from 'type-graphql';
import { IsNumber, Length, Max, Min } from 'class-validator';
import { Category } from './category';
import { User } from './user';

@ObjectType()
@Entity()
export class Product extends BaseEntity {
  @Field(() => ID)
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Field()
  @Column({ unique: true })
  @Length(2, 255, { message: 'name must be between 2 and 255 characters' })
  name!: string;

  @Field()
  @Column('float')
  @IsNumber(undefined, { message: 'price must be number' })
  @Min(0, { message: 'price cannot be less than 0' })
  price!: number;

  @Field()
  @Column('text')
  @Length(2, 255, {
    message: 'description must be between 2 and 255 characters',
  })
  description!: string;

  @Field()
  @Column('int')
  @IsNumber(undefined, { message: 'price must be number' })
  @Min(0, { message: 'stock cannot be less than 0' })
  stock!: number;

  @Field({ defaultValue: 0 })
  @Column('int', { default: 0 })
  @IsNumber()
  @Min(0, { message: 'count cannot be less than 0' })
  count!: number;

  @Field({ defaultValue: 0 })
  @Column('int', { default: 0 })
  @Min(0, { message: 'viewRate cannot be less than 0' })
  @Max(5, { message: 'viewRate cannot be more than 5' })
  viewRate!: number;

  @Field(() => [Category], { nullable: true })
  @ManyToMany(() => Category, { eager: true })
  @JoinTable()
  categories?: Category[];

  @Field(() => User)
  @ManyToOne(() => User, { eager: true })
  owner!: User;

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
