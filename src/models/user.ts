import { Column, Entity, JoinColumn, OneToMany, OneToOne } from 'typeorm';
import { Field, ObjectType } from 'type-graphql';
import { IsEmail, Length } from 'class-validator';
import { UserDetail } from './user-detail';
import { Order } from './order';
import { ExternalEntity } from './base-entity';
import { UserRole } from './user-role';

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
  role!: UserRole;

  @Field()
  @OneToOne(() => UserDetail, {
    cascade: true,
    eager: true,
    onDelete: 'CASCADE',
  })
  @JoinColumn()
  detail!: UserDetail;

  @Field(() => [Order], { nullable: true })
  @OneToMany(() => Order, (order) => order.user, {
    cascade: true,
    nullable: true,
  })
  orders!: Order[];
}
