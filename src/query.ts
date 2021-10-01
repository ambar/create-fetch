import getEntries from './utils/getEntries'
import {FetchEnhancer} from './types'

// preserve legacy querystring/qs behavior, set null or undefined to empty
const mapNilToEmpty = (obj: Record<string, any>) =>
  getEntries(obj).map(([k, v]) => [k, (v as string) ?? ''])

type QueryInit = {
  query?: string[][] | Record<string, any> | URLSearchParams
}

/**
 * Stringify query string
 */
const query =
  (): FetchEnhancer<QueryInit> =>
  (fetch) =>
  (url, {query, ...options} = {}) => {
    if (query !== null && typeof query === 'object') {
      const params = (
        query instanceof URLSearchParams
          ? query
          : new URLSearchParams(mapNilToEmpty(query))
      ).toString()
      if (params) {
        url = String(url)
        const index = url.lastIndexOf('?')
        url +=
          (index === -1 ? '?' : index === url.length - 1 ? '' : '&') + params
      }
    }

    return fetch(url, options)
  }

export default query
