import baseUrl from '../src/baseUrl'

describe('baseUrl', () => {
  const fetch = async (...args) => args
  const fetchUrls = (myFetch, urls) =>
    Promise.all(urls.map((url) => myFetch(url)))

  it('should add base url', async () => {
    const myFetch = baseUrl('https://api.example.com')(fetch)
    const urls = ['/path?foo', 'path?foo']
    expect(await fetchUrls(myFetch, urls)).toMatchInlineSnapshot(`
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
    expect(await fetchUrls(myFetch, urls)).toMatchInlineSnapshot(`
Array [
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
