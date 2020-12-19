import { validateOrReject } from 'class-validator';
import { Field, ID, ObjectType } from 'type-graphql';
import {
    BaseEntity,
    BeforeInsert,
    BeforeUpdate,
    CreateDateColumn,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
} from 'typeorm';

export abstract class InternalEntity extends BaseEntity {
    @PrimaryGeneratedColumn('uuid')
    readonly id!: string;

    @CreateDateColumn({ type: 'timestamp' })
    createdAt!: Date;

    @CreateDateColumn({ type: 'timestamp' })
    updatedAt!: Date;

    @BeforeInsert()
    @BeforeUpdate()
    async validate() {
        await validateOrReject(this);
    }
}

@ObjectType()
export abstract class ExternalEntity extends BaseEntity {
    @Field(() => ID)
    @PrimaryGeneratedColumn('uuid')
    readonly id!: string;

    @Field()
    @CreateDateColumn({ type: 'timestamp' })
    createdAt!: Date;

    @Field()
    @UpdateDateColumn({ type: 'timestamp' })
    updatedAt!: Date;

    @BeforeInsert()
    @BeforeUpdate()
    async validate() {
        await validateOrReject(this);
    }
}
