import { Column, Entity, JoinColumn, OneToMany, OneToOne } from 'typeorm';
import { Field, ObjectType } from 'type-graphql';
import { IsBoolean, IsEmail, IsOptional, Length } from 'class-validator';
import { UserDetail } from './user-detail';
import { Order } from './order';
import { ExternalEntity } from './base-entity';
import { UserRole } from './user-role';
import { Product } from './product';
import { OrderStatus } from '../types';

@ObjectType()
@Entity()
export class User extends ExternalEntity {
  @Field()
  @Column({ unique: true })
  @IsEmail(undefined, { message: 'email must be valid' })
  email!: string;

  @Column()
  @Length(6, 255, { message: 'password must be between 6 and 255 characters' })
  password!: string;

  @Field({ defaultValue: false })
  @Column({ default: false })
  @IsOptional()
  @IsBoolean()
  confirmed!: boolean;

  @Field({ nullable: true })
  @Column('bytea', { nullable: true })
  avatar?: Buffer;

  @Field()
  @OneToOne(() => UserRole, {
    cascade: true,
    eager: true,
    onDelete: 'CASCADE',
  })
  @JoinColumn()
  role!: UserRole;

  @Field()
  @OneToOne(() => UserDetail, {
    cascade: true,
    eager: true,
    onDelete: 'CASCADE',
  })
  @JoinColumn()
  detail!: UserDetail;

  @Field(() => [Product], { nullable: true })
  @OneToMany(() => Product, (product) => product.owner, {
    nullable: true,
    cascade: true,
  })
  products?: Product[];

  @Field(() => [Order], { nullable: true })
  @OneToMany(() => Order, (order) => order.user, {
    cascade: true,
    nullable: true,
  })
  orders!: Order[];

  checkIfUserBoughtTheProduct(product: Product): boolean {
    for (const { orderProducts, status } of this.orders) {
      if (status === OrderStatus.completed) {
        for (const { product: p } of orderProducts) {
          if (p.id === product.id) {
            return true;
          }
        }
      }
    }

    return false;
  }

  checkIfUserIsOwner(productId: string): boolean {
    if (!this.products) {
      return false;
    }

    for (const { id } of this.products) {
      if (id === productId) {
        return true;
      }
    }
    return false;
  }
}
