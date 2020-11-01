import { GraphQLScalarType, Kind } from 'graphql';

export const AvatarScalar = new GraphQLScalarType({
  name: 'avatar',
  description: 'Avatar scalar type',
  serialize(value: any): string {
    if (!(value instanceof Buffer)) {
      throw new Error('AvatarScalar can only serialize Buffer values');
    }

    return value.toString('base64');
  },
  parseValue(value: any): Buffer {
    if (typeof value !== 'string') {
      throw new Error('AvatarScalar can only parse string values');
    }

    return Buffer.from(value, 'base64');
  },
  parseLiteral(ast): Buffer {
    if (ast.kind !== Kind.STRING) {
      throw new Error('AvatarScalar can only parse string values');
    }

    return Buffer.from(ast.value, 'base64');
  },
});
