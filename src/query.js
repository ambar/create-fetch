import querystring from 'querystring'

/**
 * Stringify query string
 */
const query = () => fetch => (url, {query, ...options} = {}) => {
  if (typeof query === 'object') {
    const params = querystring.stringify(query)
    if (params) {
      const index = url.lastIndexOf('?')
      url += (index === -1 ? '?' : index === url.length - 1 ? '' : '&') + params
    }
  }

  return fetch(url, options)
}

export default query
