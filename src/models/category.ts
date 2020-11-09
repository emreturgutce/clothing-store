import { Column, Entity } from 'typeorm';
import { Field, ObjectType } from 'type-graphql';
import { Length } from 'class-validator';
import { ExternalEntity } from './base-entity';

@ObjectType()
@Entity()
export class Category extends ExternalEntity {
  @Field()
  @Column({ unique: true })
  @Length(2, 255, { message: 'name must be between 2 and 255 characters' })
  name!: string;

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

  static async deleteById(id: string): Promise<boolean> {
    return !!(await this.delete(id)).affected;
  }

  static async updateNameById(id: string, name: string) {
    return !!(await Category.update({ id }, { name })).affected;
  }
}
