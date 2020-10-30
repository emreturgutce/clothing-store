import { GraphQLError, GraphQLFormattedError } from 'graphql';

export const formatError = (
  err: GraphQLError,
): GraphQLFormattedError<Record<string, any>> => {
  if (err.message.match(/validation error/i)) {
    const errors: string[] = [];

    if (err.extensions) {
      for (const { constraints } of err.extensions!.exception
        .validationErrors) {
        const error = Object.values(constraints).toString();

        errors.push(error);
      }
    } else {
      errors.push(err.message);
    }

    return { message: errors.toString() };
  }

  return { message: err.message };
};
