import { graphql, GraphQLSchema } from 'graphql';
import { Maybe } from 'graphql/jsutils/Maybe';
import { createSchema } from './create-schema';

interface Options {
  source: string;
  variableValues?: Maybe<{
    [key: string]: any;
  }>;
  userId?: string;
}

let schema: GraphQLSchema;

(async () => {
  schema = await createSchema();
})();

export const gCall = async ({ source, variableValues, userId }: Options) => {
  return graphql({
    schema,
    source,
    variableValues,
    contextValue: {
      req: {
        session: {
          userId,
        },
      },
      res: {
        clearCookie: jest.fn(),
      },
    },
  });
};
