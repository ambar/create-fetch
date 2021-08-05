import getEntries from './getEntries'

// filter null or undefined
const filterNil = (obj) => getEntries(obj).filter(([k, v]) => v != null)

const toHeaders = (headers) =>
  new Headers(
    headers instanceof Headers ? headers : (headers && filterNil(headers)) || {}
  )

export default toHeaders
