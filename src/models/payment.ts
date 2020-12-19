import { Column, Entity } from 'typeorm';
import { Field, ObjectType } from 'type-graphql';
import { ExternalEntity } from './base-entity';

@ObjectType()
@Entity()
export class Payment extends ExternalEntity {
    @Field()
    @Column()
    stripeId!: string;
}
