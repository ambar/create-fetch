import toHeaders from './utils/toHeaders'
import toObject from './utils/toObject'

const isPlainObject = obj =>
  obj !== null &&
  typeof obj === 'object' &&
  Object.getPrototypeOf(obj) === Object.prototype

/**
 * Stringify body
 */
const bodify = () => fetch => (url, {body, ...options} = {}) => {
  let headers = toHeaders(options.headers)
  const contentType = 'content-type'
  if (body instanceof URLSearchParams) {
    // patches old browsers
    if (!headers.get(contentType)) {
      headers.set(contentType, 'application/x-www-form-urlencoded')
    }
  } else if (isPlainObject(body) || Array.isArray(body)) {
    body = JSON.stringify(body)
    if (!headers.get(contentType)) {
      headers.set(contentType, 'application/json')
    }
  }

  return fetch(url, {
    ...options,
    body,
    headers: toObject(headers),
  })
}

export default bodify
