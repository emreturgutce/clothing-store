import { ObjectType } from 'type-graphql';
import { Product } from '../models/product';
import { PaginatedResponse } from './abstract-paginated';

@ObjectType()
export class PaginatedProductsResponse extends PaginatedResponse(Product) {}
