import query from '../src/query'

describe('query', () => {
  const fetch = jest.fn(
    (async (...args) => args[0]) as unknown as typeof globalThis.fetch
  )

  it('should add query string', async () => {
    const myFetch = query()(fetch)
    expect(await myFetch('/api', {query: {foo: 1, bar: 2}})).toBe(
      '/api?foo=1&bar=2'
    )
    expect(
      await myFetch('/api', {query: new URLSearchParams({foo: 'bar'})})
    ).toBe('/api?foo=bar')
  })

  it('should not add query string with empty query', async () => {
    const myFetch = query()(fetch)
    expect(await myFetch('/api', {query: {}})).toBe('/api')
    expect(await myFetch('/api', {query: null})).toBe('/api')
  })

  it('should handle existing query string', async () => {
    const myFetch = query()(fetch)
    expect(await myFetch('/api?ok', {query: {foo: 1}})).toBe('/api?ok&foo=1')
    expect(await myFetch('/api?', {query: {foo: 1}})).toBe('/api?foo=1')
    expect(await myFetch('/api?', {query: {}})).toBe('/api?')
    expect(await myFetch('/api?', {query: false as unknown})).toBe('/api?')
  })

  it('should set null or undefined to empty string', async () => {
    const myFetch = query()(fetch)
    const values = {a: null, b: undefined, c: 0}
    expect(
      await myFetch('/', {
        query: values,
      })
    ).toMatchSnapshot('plain')
    expect(
      await myFetch('/', {
        query: new Map(Object.entries(values)),
      })
    ).toMatchSnapshot('iterator')
  })

  it('should work without options', async () => {
    const myFetch = query()(fetch)
    expect(await myFetch('/api')).toMatchSnapshot()
  })
})
