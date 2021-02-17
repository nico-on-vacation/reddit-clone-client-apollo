import { Cache, QueryInput } from "@urql/exchange-graphcache";

//This just gives me typesafety in the function fn()
export function betterUpdateQuery<Result, Query>(
  cache: Cache,
  qi: QueryInput,
  result: any,
  fn: (r: Result, q: Query) => Query
) {
  return cache.updateQuery(qi, (data) => fn(result, data as any) as any);
}
