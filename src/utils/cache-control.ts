import { CacheHint } from 'apollo-cache-control';
import { UseMiddleware } from 'type-graphql';

export function CacheControl(hint: CacheHint) {
  return UseMiddleware(({ info }, next) => {
    console.log('CacheControl Called');
    info.cacheControl.setCacheHint(hint);
    return next();
  });
}
