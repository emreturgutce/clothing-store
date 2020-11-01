import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Field, ID, ObjectType } from 'type-graphql';
import { Length } from 'class-validator';

@ObjectType()
@Entity()
export class Category extends BaseEntity {
  @Field(() => ID)
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Field()
  @Column({ unique: true })
  @Length(2, 255, { message: 'name must be between 2 and 255 characters' })
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

  static async findByNames(names: string[] = []): Promise<Category[]> {
    const categories: Category[] = [];

    for await (const name of names) {
      const category = await Category.findOne({ where: { name } });

      if (category) {
        categories.push(category);
      }
    }

    return categories;
  }
}
