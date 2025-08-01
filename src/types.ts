export type Fetch = typeof fetch
export type FetchReturn = ReturnType<Fetch>

/**
 * Enhance fetch
 *
 * **Example**
 *
 * ```ts
 * // with extra arguments
 * type FooInit = {foo?: boolean}
 * const foo = (): FetchEnhancer<FooInit> => (fetch) => (url, {foo, ...options}) => {
 *   if (foo) {
 *     // ...
 *   }
 *   return fetch(url, options)
 * }
 *
 * // no extra arguments
 * const bar = (): FetchEnhancer => (fetch) => (url, options) => {
 *   return fetch(url, options)
 * }
 *
 * const myFetch = foo()(bar()(fetch))
 * ```
 */
// eslint-disable-next-line @typescript-eslint/ban-types
export type FetchEnhancer<Extra = {}> = <F extends Fetch>(
  fetch: F
) => (
  url: Parameters<F>[0],
  options?: Override<RequestInit, Extra>
) => FetchReturn

type Override<T, U> = U extends undefined
  ? NonNullable<T>
  : Omit<NonNullable<T>, keyof U> & U

type ExtractGeneric<T> = T extends FetchEnhancer<infer X> ? X : never

type SpreadGeneric<T extends readonly [...any]> = T extends readonly [
  infer L,
  ...infer R
]
  ? Override<ExtractGeneric<L>, SpreadGeneric<R>>
  : unknown

/**
 * Compose fetch
 *
 * **Example**
 *
 * ```ts
 * const myFetch = (myCompose as FetchCompose)(query, bodify)(fetch)
 * ```
 */
export type FetchCompose = <FEs extends FetchEnhancer[]>(
  ...args: FEs
) => <F extends Fetch>(
  fetch: F
) => (
  url: Parameters<F>[0],
  options?: Override<Parameters<F>[1], SpreadGeneric<FEs>>
) => FetchReturn

export type FetchCreate = <
  F extends Fetch,
  FEs extends readonly FetchEnhancer[]
>(
  fetch: F,
  args: FEs
) => (
  url: Parameters<F>[0],
  options?: Override<Parameters<F>[1], SpreadGeneric<FEs>>
) => FetchReturn

/**
 * Generic fetch type
 *
 * ```
 * type MyFetch = FetchType<typeof query>
 * ```
 */
export type FetchType<FEs extends readonly FetchEnhancer[]> = (
  url: Parameters<Fetch>[0],
  options?: Override<Parameters<Fetch>[1], SpreadGeneric<FEs>>
) => FetchReturn
