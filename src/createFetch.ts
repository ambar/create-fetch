/* eslint-disable @typescript-eslint/no-unsafe-return */
import {FetchEnhancer, FetchCompose, FetchCreate} from './types'

const compose =
  (...fns: ((...args: any[]) => any)[]) =>
  (arg) =>
    fns.reduceRight((acc, f) => f(acc), arg)

/**
 * ```ts
 * import {composeFetch, query, bodify} from 'create-fetch'
 *
 * const myFetch = composeFetch(
 *   query(),
 *   bodify(),
 * )(fetch)
 * ```
 */
export const composeFetch: FetchCompose = compose

/**
 * ```ts
 * import {createFetch, query, bodify} from 'create-fetch'
 *
 * const myFetch = createFetch(fetch, <const>[
 *   query(),
 *   bodify(),
 * ])
 * ```
 */
export const createFetch: FetchCreate = (
  fetch,
  enhancers: readonly FetchEnhancer[] = []
) => compose(...enhancers)(fetch)
export default createFetch
