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
  email!: string;

  @Column()
  password!: string;

  @Field({ defaultValue: false })
  @Column({ default: false })
  confirmed!: boolean;

  @Field({ nullable: true })
  @Column('bytea', { nullable: true })
  avatar?: string;

  @Field()
  @OneToOne(() => UserDetail, { onDelete: 'CASCADE' })
  @JoinColumn()
  detail!: UserDetail;

  @Field(() => [Product])
  @OneToMany(() => Product, (photo) => photo.owner, { onDelete: 'CASCADE' })
  products!: Product[];

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
