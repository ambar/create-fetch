export default (defaults = {}) => fetch => (url, options = {}) =>
  fetch(url, {
    ...defaults,
    ...options,
    headers: {...defaults.headers, ...options.headers},
  })
