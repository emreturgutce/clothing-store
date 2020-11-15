import { registerEnumType } from 'type-graphql';

export enum UserRoles {
  admin = 'ADMIN',
  user = 'USER',
}

registerEnumType(UserRoles, {
  name: 'UserRoles',
});
