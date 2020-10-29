import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Field, ID, ObjectType } from 'type-graphql';
import { Order } from './order';
import { Product } from './product';

@ObjectType()
@Entity()
export class OrderProduct extends BaseEntity {
  @Field(() => ID)
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Field(() => Order)
  @ManyToOne(() => Order, (order) => order.orderProducts)
  order!: Order;

  @Field()
  @OneToOne(() => Product)
  @JoinColumn()
  product!: Product;

  @Field()
  @Column('int', { default: 1 })
  quantity!: number;

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
