import { Column, Entity } from 'typeorm';
import { Field, ObjectType } from 'type-graphql';
import { ExternalEntity } from './base-entity';
import { UserRoles } from '../types/user-roles';

@ObjectType()
@Entity()
export class UserRole extends ExternalEntity {
  @Field()
  @Column({
    type: 'enum',
    enum: UserRoles,
    default: UserRoles.user,
  })
  name!: UserRoles;
}
