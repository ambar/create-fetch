import querystring from 'querystring'

const isPlainObject = obj =>
  typeof obj === 'object' &&
  obj !== null &&
  Object.getPrototypeOf(obj) === Object.prototype

/**
 * Stringify body
 */
const bodyStringifier = () => fetch => (
  url,
  {body, bodyType, ...options} = {}
) => {
  let itsHeaders = null
  if (isPlainObject(body) || Array.isArray(body)) {
    if (bodyType === 'form') {
      body = querystring.stringify(body)
      itsHeaders = {'content-type': 'application/x-www-form-urlencoded'}
    } else if (bodyType === 'json' || bodyType === undefined) {
      body = JSON.stringify(body)
      itsHeaders = {'content-type': 'application/json'}
    }
  }

  return fetch(url, {
    ...options,
    body,
    headers: {
      ...options.headers,
      ...itsHeaders,
    },
  })
}

export default bodyStringifier
