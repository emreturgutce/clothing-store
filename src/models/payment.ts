import {
  BaseEntity,
  CreateDateColumn,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Field, ID, ObjectType } from 'type-graphql';
import { Order } from './order';

@ObjectType()
@Entity()
export class Payment extends BaseEntity {
  @Field(() => ID)
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Field(() => Order)
  @OneToOne(() => Order)
  @JoinColumn()
  order!: Order;

  @Field()
  stripeId!: string;

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
