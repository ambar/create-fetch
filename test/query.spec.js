import query from '../src/query'

describe('query', () => {
  const fetch = url => Promise.resolve(url)

  it('should add query string', async () => {
    const myFetch = query()(fetch)
    expect(await myFetch('/api', {query: {foo: 1, bar: 2}})).toBe(
      '/api?foo=1&bar=2'
    )
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
    expect(await myFetch('/api?', {query: false})).toBe('/api?')
  })

  it('should work without options', async () => {
    const myFetch = query()(fetch)
    expect(await myFetch('/api')).toMatchSnapshot()
  })
})
