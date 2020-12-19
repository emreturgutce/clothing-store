import {
    Column,
    CreateDateColumn,
    Entity,
    Index,
    JoinTable,
    ManyToMany,
    ManyToOne,
    OneToMany,
} from 'typeorm';
import { Field, Float, Int, ObjectType } from 'type-graphql';
import { IsNumber, IsOptional, Length, Min } from 'class-validator';
import { Category } from './category';
import { User } from './user';
import { Comment } from './comment';
import { ExternalEntity } from './base-entity';
import { ProductUpdateInput } from '../input-types/product-update-input';

@ObjectType()
@Entity()
export class Product extends ExternalEntity {
    @Field()
    @Column({ unique: true })
    @Length(2, 255, { message: 'name must be between 2 and 255 characters' })
    name!: string;

    @Field()
    @Column('float')
    @IsNumber(undefined, { message: 'price must be number' })
    @Min(0, { message: 'price cannot be less than 0' })
    price!: number;

    @Field()
    @Column('text')
    @Length(2, 255, {
        message: 'description must be between 2 and 255 characters',
    })
    description!: string;

    @Field()
    @Column('int')
    @IsNumber(undefined, { message: 'price must be number' })
    @Min(0, { message: 'stock cannot be less than 0' })
    stock!: number;

    @Field({ defaultValue: 0 })
    @Column('int', { default: 0 })
    @IsOptional()
    @Min(0, { message: 'count cannot be less than 0' })
    count!: number;

    @Field(() => [Int], { nullable: true })
    @Column('simple-array', { nullable: true })
    rate!: number[];

    @Field(() => Float, { nullable: true })
    get averageRate() {
        if (!this.rate) {
            return null;
        }

        const ratingsCount = this.rate.length;

        if (ratingsCount === 0) {
            return null;
        }

        const ratingsSum = this.rate.reduce((a, b) => a + b, 0);

        return ratingsSum / ratingsCount;
    }

    @Field(() => [Category], { nullable: true })
    @ManyToMany(() => Category, { eager: true })
    @JoinTable()
    categories?: Category[];

    @Field(() => User)
    @ManyToOne(() => User, { eager: true, onDelete: 'CASCADE' })
    owner!: User;

    @Field(() => [Comment], { nullable: true })
    @OneToMany(() => Comment, (comment) => comment.product, {
        nullable: true,
        cascade: true,
    })
    comments!: Comment[];

    @CreateDateColumn({ type: 'timestamp' })
    @Index({ unique: true })
    createdAt!: Date;

    static async updateFromUser(
        productId: string,
        { name, description, price, stock, categoryNames }: ProductUpdateInput,
        user?: User,
    ): Promise<boolean> {
        return !!(
            await this.update(
                {
                    id: productId,
                    owner: user,
                },
                {
                    // eslint-disable-next-line no-use-before-define
                    ...(await helperFunc({
                        name,
                        description,
                        price,
                        stock,
                        categoryNames,
                    })),
                },
            )
        ).affected;
    }
}

const helperFunc = async (vals: ProductUpdateInput) => {
    const obj: { [k: string]: unknown } = {};

    for await (const [key, value] of Object.entries(vals)) {
        if (key === 'categoryNames') {
            if (value?.length > 0) {
                obj.categories = await Category.findByNames(value);
            }
        } else if (value) {
            obj[key] = value;
        }
    }

    return obj;
};
