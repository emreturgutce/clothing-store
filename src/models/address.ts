import { Column, Entity, ManyToOne } from 'typeorm';
import { Field, ObjectType } from 'type-graphql';
import { User } from './user';
import { ExternalEntity } from './base-entity';
import { OptionalAddressInput } from '../input-types/address-input';

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

  static async deleteFromUser(
    addressId: string,
    user?: User,
  ): Promise<boolean> {
    return !!(
      await this.delete({
        id: addressId,
        user: user || undefined,
      })
    ).affected;
  }

  static async getFromUser(addressId: string, user?: User): Promise<Address> {
    return this.findOneOrFail({
      where: { id: addressId, user: user || undefined },
    });
  }

  static async updateFromUser(
    addressId: string,
    optionalAddressInput: OptionalAddressInput,
    user?: User,
  ): Promise<boolean> {
    return !!(
      await Address.update(
        {
          id: addressId,
          user,
        },
        optionalAddressInput,
      )
    ).affected;
  }
}
