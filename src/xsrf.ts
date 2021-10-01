import toHeaders from './utils/toHeaders'
import toObject from './utils/toObject'
import {FetchEnhancer} from './types'

const getCookie = (key: string) => {
  const [, value] = new RegExp(`${key}=([^;]+)`).exec(document.cookie) || []
  return value
}

const xsrfMethods = ['DELETE', 'PATCH', 'POST', 'PUT']

const xsrf =
  ({cookieName = '_xsrf', headerName = 'x-xsrftoken'} = {}): FetchEnhancer =>
  (fetch) =>
  (url, options = {}) => {
    const headers = toHeaders(options.headers)
    if (
      typeof document !== 'undefined' &&
      options.method &&
      xsrfMethods.indexOf(options.method.toUpperCase()) !== -1
    ) {
      const xsrfToken = getCookie(cookieName)
      if (xsrfToken) {
        headers.set(headerName, xsrfToken)
      }
    }

    return fetch(url, {
      ...options,
      headers: toObject(headers),
    })
  }

export default xsrf
