import {
  BeforeInsert,
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  OneToOne,
} from 'typeorm';
import { Field, ObjectType } from 'type-graphql';
import { User } from './user';
import { OrderProduct } from './order-product';
import { ORDER_EXPIRATION_TIME } from '../constants';
import { OrderStatus } from '../types';
import { Address } from './address';
import { Payment } from './payment';
import { ExternalEntity } from './base-entity';

@ObjectType()
@Entity()
export class Order extends ExternalEntity {
  @Field(() => User)
  @ManyToOne(() => User, (user) => user.orders, {
    eager: true,
    onDelete: 'CASCADE',
  })
  user!: User;

  @Field(() => Payment, { nullable: true })
  @OneToOne(() => Payment, { cascade: true, nullable: true, eager: true })
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

  @BeforeInsert()
  private generateExpiresAt() {
    const expiration = new Date();

    this.expiresAt = expiration.setSeconds(
      expiration.getSeconds() + ORDER_EXPIRATION_TIME,
    );
  }

  static async deleteById(id: string): Promise<boolean> {
    return !!(await Order.delete(id)).affected;
  }
}
