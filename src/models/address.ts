import { Column, Entity, ManyToOne } from 'typeorm';
import { Field, ObjectType } from 'type-graphql';
import { User } from './user';
import { ExternalEntity } from './base-entity';

@ObjectType()
@Entity()
export class Address extends ExternalEntity {
  @Field()
  @Column('text')
  addressLines!: string;

  @Field()
  @Column('int')
  zipcode!: number;

  @Field()
  @Column()
  city!: string;

  @Field(() => User)
  @ManyToOne(() => User, { onDelete: 'CASCADE', eager: true })
  user!: User;
}
