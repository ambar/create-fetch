import toHeaders from './utils/toHeaders'
import toObject from './utils/toObject'
import {FetchEnhancer} from './types'

export default (defaults: RequestInit = {}): FetchEnhancer =>
  (fetch) =>
  (url, options = {}) =>
    fetch(url, {
      ...defaults,
      ...options,
      headers: toObject([
        // same-key values will be deduped
        ...toHeaders(defaults.headers),
        ...toHeaders(options.headers),
      ]),
    })
