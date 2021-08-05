import getEntries from './utils/getEntries'

// preserve legacy querystring/qs behavior, set null or undefined to empty
const mapNilToEmpty = (obj) => getEntries(obj).map(([k, v]) => [k, v ?? ''])

/**
 * Stringify query string
 */
const query =
  () =>
  (fetch) =>
  (url, {query, ...options} = {}) => {
    if (query !== null && typeof query === 'object') {
      const params = (
        query instanceof URLSearchParams
          ? query
          : new URLSearchParams(mapNilToEmpty(query))
      ).toString()
      if (params) {
        const index = url.lastIndexOf('?')
        url +=
          (index === -1 ? '?' : index === url.length - 1 ? '' : '&') + params
      }
    }

    return fetch(url, options)
  }

export default query
