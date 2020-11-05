import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Field, ID, ObjectType } from 'type-graphql';
import { IsEmail, Length } from 'class-validator';
import { UserDetail } from './user-detail';
import { Product } from './product';

@ObjectType()
@Entity()
export class User extends BaseEntity {
  @Field(() => ID)
  @PrimaryGeneratedColumn('uuid')
  id!: string;

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
  @OneToOne(() => UserDetail, { cascade: true, eager: true })
  @JoinColumn()
  detail!: UserDetail;

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
