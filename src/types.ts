export type Fetch = typeof fetch
export type FetchReturn = ReturnType<Fetch>

export type FetchEnhancer<Extra = {}> = <F extends Fetch>(
  fetch: F
) => (
  url: Parameters<F>[0],
  options?: Parameters<F>[1] & Extra
) => FetchReturn

type ExtractGeneric<T> = T extends FetchEnhancer<infer X> ? X : never
type SpreadGeneric<T extends [...any]> = T extends [infer L, ...infer R]
  ? ExtractGeneric<L> & SpreadGeneric<R>
  : unknown

export type FetchCompose = <FEs extends FetchEnhancer[]>(
  ...args: FEs
) => <F extends Fetch>(
  fetch: F
) => (
  url: Parameters<F>[0],
  options?: Parameters<F>[1] & SpreadGeneric<FEs>
) => FetchReturn

// TODO: fix args typing
export type FetchCreate = <F extends Fetch, FEs extends FetchEnhancer[]>(
  fetch: F,
  args: FEs
) => (
  url: Parameters<F>[0],
  options?: Parameters<F>[1] & SpreadGeneric<FEs>
) => FetchReturn

