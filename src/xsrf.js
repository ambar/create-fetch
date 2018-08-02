const getCookie = key => {
  const [, value] = document.cookie.match(new RegExp(`${key}=([^;]+)`)) || []
  return value
}

const xsrfMethods = ['DELETE', 'PATCH', 'POST', 'PUT']

const xsrf = ({
  cookieName = '_xsrf',
  headerName = 'x-xsrftoken',
} = {}) => fetch => (url, options = {}) => {
  let itsHeaders
  if (
    options.method &&
    xsrfMethods.indexOf(options.method.toUpperCase()) !== -1 &&
    typeof window !== 'undefined'
  ) {
    const xsrfToken = getCookie(cookieName)
    if (xsrfToken) {
      itsHeaders = {[headerName]: xsrfToken}
    }
  }

  return fetch(url, {
    ...options,
    headers: {
      ...options.headers,
      ...itsHeaders,
    },
  })
}

export default xsrf
