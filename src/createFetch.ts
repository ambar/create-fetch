import {FetchEnhancer, FetchCompose, FetchCreate} from './types'

const compose =
  (...fns) =>
  (arg) =>
    fns.reduceRight((acc, f) => f(acc), arg)

export const composeFetch: FetchCompose = compose
export const createFetch: FetchCreate = (fetch, enhancers: FetchEnhancer[] = []) => compose(...enhancers)(fetch)
export default createFetch
