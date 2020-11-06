import { Column, Entity, ManyToOne } from 'typeorm';
import { Field, ObjectType } from 'type-graphql';
import { User } from './user';
import { Product } from './product';
import { ExternalEntity } from './base-entity';

@ObjectType()
@Entity()
export class Comment extends ExternalEntity {
  @Field()
  @Column('text')
  content!: string;

  @Field({ defaultValue: 0 })
  @Column('int', { default: 0 })
  rate!: number;

  @Field(() => Product)
  @ManyToOne(() => Product, (product) => product.comments, {
    onDelete: 'CASCADE',
  })
  product!: Product;

  @Field(() => User)
  @ManyToOne(() => User, {
    onDelete: 'CASCADE',
  })
  user!: User;
}
