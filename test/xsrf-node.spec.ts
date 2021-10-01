/**
 * @jest-environment node
 */

import xsrf from '../src/xsrf'

describe('xsrf', () => {
  const fetch = jest.fn(
    (async (...args) => args) as unknown as typeof globalThis.fetch
  )

  it('should not throw on server-side', async () => {
    const myFetch = xsrf()(fetch)
    expect(() => myFetch('/', {method: 'POST'})).not.toThrow()
  })
})
