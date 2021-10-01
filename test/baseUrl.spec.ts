import baseUrl from '../src/baseUrl'

describe('baseUrl', () => {
  const fetch = jest.fn(
    (async (...args) => args) as unknown as typeof globalThis.fetch
  )
  const fetchUrls = (myFetch: typeof globalThis.fetch, urls: string[]) =>
    Promise.all(urls.map((url) => myFetch(url)))

  it('should add base url', async () => {
    const myFetch = baseUrl('https://api.example.com')(fetch)
    const urls = ['/path?foo', 'path?foo']
    await fetchUrls(myFetch, urls)
    expect(fetch.mock.calls).toMatchInlineSnapshot(`
Array [
  Array [
    "https://api.example.com/path?foo",
    undefined,
  ],
  Array [
    "https://api.example.com/path?foo",
    undefined,
  ],
]
`)
  })

  it('should not change non-http urls', async () => {
    const myFetch = baseUrl('https://api.example.com')(fetch)
    const urls = ['ws://example.com', 'blob:http://localhost/uuid', 'data:,']
    await fetchUrls(myFetch, urls)
    expect(fetch.mock.calls).toMatchInlineSnapshot(`
Array [
  Array [
    "https://api.example.com/path?foo",
    undefined,
  ],
  Array [
    "https://api.example.com/path?foo",
    undefined,
  ],
  Array [
    "ws://example.com/",
    undefined,
  ],
  Array [
    "blob:http://localhost/uuid",
    undefined,
  ],
  Array [
    "data:,",
    undefined,
  ],
]
`)
  })
})
