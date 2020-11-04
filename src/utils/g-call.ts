import { graphql } from 'graphql';
import { createSchema } from './create-schema';

export const gCall = async (
  query: string,
  variables: any,
  ctx = { req: { session: {} } },
) => {
  const schema = await createSchema();

  return graphql(schema, query, null, ctx, variables);
};
