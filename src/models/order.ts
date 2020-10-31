import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Field, ID, ObjectType } from 'type-graphql';
import { User } from './user';
import { OrderProduct } from './order-product';
import { calculateExpiration } from '../utils';

export enum OrderStatus {
  created = 'CREATED',
  paymentWaiting = 'PAYMENT_WAITING',
  cancelled = 'CANCELLED',
  complete = 'COMPLETE',
}

@ObjectType()
@Entity()
export class Order extends BaseEntity {
  @Field(() => ID)
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Field(() => User)
  @ManyToOne(() => User)
  user!: User;

  @Field()
  @Column({
    type: 'enum',
    enum: OrderStatus,
    default: OrderStatus.created,
  })
  status!: OrderStatus;

  @Field()
  @Column({ default: calculateExpiration(), type: 'bigint' })
  expiresAt!: number;

  @Field(() => [OrderProduct])
  @OneToMany(() => OrderProduct, (orderProduct) => orderProduct.order, {
    onDelete: 'CASCADE',
  })
  orderProducts!: OrderProduct[];

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
