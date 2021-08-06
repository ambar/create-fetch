import {FetchEnhancer} from './types'

export default (baseUrl: string): FetchEnhancer =>
  (fetch) =>
  (url, options) =>
    fetch(new URL(url as string, baseUrl).toString(), options)
