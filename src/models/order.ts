import {
  BaseEntity,
  BeforeInsert,
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Field, ID, ObjectType } from 'type-graphql';
import { User } from './user';
import { OrderProduct } from './order-product';
import { ORDER_EXPIRATION_TIME } from '../constants';
import { OrderStatus } from '../types';
import { Address } from './address';
import { Payment } from './payment';

@ObjectType()
@Entity()
export class Order extends BaseEntity {
  @Field(() => ID)
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Field(() => User)
  @ManyToOne(() => User, { eager: true })
  user!: User;

  @Field(() => Payment, { nullable: true })
  @OneToOne(() => Payment)
  @JoinColumn()
  payment?: Payment;

  @Field()
  @Column({
    type: 'enum',
    enum: OrderStatus,
    default: OrderStatus.awaitingPayment,
  })
  status!: OrderStatus;

  @Field()
  @Column({ type: 'bigint' })
  expiresAt!: number;

  @Field(() => [OrderProduct])
  @OneToMany(() => OrderProduct, (orderProduct) => orderProduct.order, {
    cascade: true,
    eager: true,
  })
  orderProducts!: OrderProduct[];

  @Field(() => Address, { nullable: true })
  @ManyToOne(() => Address)
  address!: Address;

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

  @BeforeInsert()
  private generateExpiresAt() {
    const expiration = new Date();

    this.expiresAt = expiration.setSeconds(
      expiration.getSeconds() + ORDER_EXPIRATION_TIME,
    );
  }
}
