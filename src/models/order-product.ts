import { BaseEntity, Column, Entity, ManyToOne } from 'typeorm';
import { Field, ObjectType } from 'type-graphql';
import { Min } from 'class-validator';
import { Order } from './order';
import { Product } from './product';

@ObjectType()
@Entity()
export class OrderProduct extends BaseEntity {
  @Field(() => Order)
  @ManyToOne(() => Order, (order) => order.orderProducts, {
    onDelete: 'CASCADE',
  })
  order!: Order;

  @Field(() => Product)
  @ManyToOne(() => Product, { cascade: true, eager: true })
  product!: Product;

  @Field()
  @Column('int', { default: 1 })
  @Min(0)
  quantity!: number;
}
