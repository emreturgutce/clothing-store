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

enum Status {
  complete = 'COMPLETE',
  cancelled = 'CANCELLED',
  pending = 'PENDING',
}

@ObjectType()
@Entity()
export class Order extends BaseEntity {
  @Field(() => ID)
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Field()
  @ManyToOne(() => User)
  user!: User;

  @Field()
  @Column({
    type: 'enum',
    enum: Status,
    default: Status.pending,
  })
  status!: Status;

  @Field(() => [OrderProduct])
  @OneToMany(() => OrderProduct, (orderProduct) => orderProduct.order)
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
