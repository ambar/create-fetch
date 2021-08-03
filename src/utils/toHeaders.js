import isPlainObject from './isPlainObject'

// filter null or undefined
const filterNil = (obj) => Object.entries(obj).filter(([k, v]) => v != null)

const toHeaders = (headers) =>
  new Headers(isPlainObject(headers) ? filterNil(headers) : headers || {})

export default toHeaders
