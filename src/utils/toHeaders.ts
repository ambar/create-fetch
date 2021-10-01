import getEntries from './getEntries'

type KVObject = Record<string, unknown>

// filter null or undefined
const filterNil = (obj: KVObject) =>
  (getEntries(obj) as string[][]).filter(([, v]) => v != null)

const toHeaders = (headers: HeadersInit | KVObject) =>
  new Headers(
    headers instanceof Headers
      ? headers
      : (headers && filterNil(headers as KVObject)) || {}
  )

export default toHeaders
