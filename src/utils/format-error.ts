import { GraphQLError, GraphQLFormattedError } from 'graphql';
import { NODE_ENV } from '../config';

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

    if (err.message.match(/Could not find any entity of type "Address"/gi)) {
        return { message: 'Could not find any entity of type "Address"' };
    }

    if (err.message.match(/Duplicate key value violates unique constraint/gi)) {
        return { message: 'Field already in use' };
    }

    return {
        message:
            NODE_ENV === 'development' ? err.message : 'Something went wrong!',
    };
};
