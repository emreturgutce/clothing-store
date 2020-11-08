import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToMany,
} from 'typeorm';
import { Field, Float, Int, ObjectType } from 'type-graphql';
import { IsNumber, Length, Min } from 'class-validator';
import { Category } from './category';
import { User } from './user';
import { Comment } from './comment';
import { ExternalEntity } from './base-entity';

@ObjectType()
@Entity()
export class Product extends ExternalEntity {
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
  @Min(0, { message: 'count cannot be less than 0' })
  count!: number;

  @Field(() => [Int], { nullable: true })
  @Column('simple-array', { nullable: true })
  rate!: number[];

  @Field(() => Float, { nullable: true })
  get averageRate() {
    if (!this.rate) {
      return null;
    }

    const ratingsCount = this.rate.length;

    if (ratingsCount === 0) {
      return null;
    }

    const ratingsSum = this.rate.reduce((a, b) => a + b, 0);

    return ratingsSum / ratingsCount;
  }

  @Field(() => [Category], { nullable: true })
  @ManyToMany(() => Category, { eager: true })
  @JoinTable()
  categories?: Category[];

  @Field(() => User)
  @ManyToOne(() => User, { eager: true, onDelete: 'CASCADE' })
  owner!: User;

  @Field(() => [Comment], { nullable: true })
  @OneToMany(() => Comment, (comment) => comment.product, {
    nullable: true,
    cascade: true,
  })
  comments!: Comment[];
}
