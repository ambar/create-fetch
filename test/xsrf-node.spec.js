/**
 * @jest-environment node
 */

import xsrf from '../src/xsrf'

describe('xsrf', () => {
  const fetch = async (...args) => args

  it('should not throw on server-side', async () => {
    const myFetch = xsrf()(fetch)
    expect(() => myFetch('/', {method: 'POST'})).not.toThrow()
  })
})
