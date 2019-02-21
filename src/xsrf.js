import toHeaders from './utils/toHeaders'
import toObject from './utils/toObject'

const getCookie = key => {
  const [, value] = document.cookie.match(new RegExp(`${key}=([^;]+)`)) || []
  return value
}

const xsrfMethods = ['DELETE', 'PATCH', 'POST', 'PUT']

const xsrf = ({
  cookieName = '_xsrf',
  headerName = 'x-xsrftoken',
} = {}) => fetch => (url, options = {}) => {
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
