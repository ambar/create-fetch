import getEntries from './getEntries'

// filter null or undefined
const filterNil = (obj: any) => (getEntries(obj) as string[][]).filter(([k, v]) => v != null)

const toHeaders = (headers: HeadersInit | object) =>
  new Headers(
    headers instanceof Headers ? headers : (headers && filterNil(headers)) || {}
  )

export default toHeaders
