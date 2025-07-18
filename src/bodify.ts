import toHeaders from './utils/toHeaders'
import toObject from './utils/toObject'
import isPlainObject from './utils/isPlainObject'
import type {FetchEnhancer} from './types'
import type {JsonObject, JsonArray} from 'type-fest'

/**
 * Stringify body
 */
const bodify =
  (): FetchEnhancer<{body?: BodyInit | JsonObject | JsonArray}> =>
  (fetch) =>
  (url, {body, ...options} = {}) => {
    const headers = toHeaders(options.headers)
    const contentType = 'content-type'
    if (body instanceof URLSearchParams) {
      // patches old browsers
      if (!headers.get(contentType)) {
        headers.set(
          contentType,
          'application/x-www-form-urlencoded;charset=UTF-8'
        )
      }
    } else if (isPlainObject(body) || Array.isArray(body)) {
      body = JSON.stringify(body)
      if (!headers.get(contentType)) {
        headers.set(contentType, 'application/json')
      }
    }

    return fetch(url, {
      ...options,
      // @ts-expect-error skip
      body,
      headers: toObject(headers) as HeadersInit,
    })
  }

export default bodify
