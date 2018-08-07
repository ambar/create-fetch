import baseUrl from '../src/baseUrl'

describe('baseUrl', () => {
  const fetch = (...args) => Promise.resolve(args)

  it('should add base url', async () => {
    const myFetch = baseUrl('https://api.example.com')(fetch)
    const result = await myFetch('/users')
    expect(result).toContainEqual('https://api.example.com/users')
    expect(result).toEqual(await myFetch('users'))

    const myFetchWithTrailingSlash = baseUrl('https://api.example.com/')(fetch)
    expect(result).toEqual(await myFetchWithTrailingSlash('/users'))
    expect(result).toEqual(await myFetchWithTrailingSlash('users'))
  })

  it('should add base path', async () => {
    const myFetch = baseUrl('/apis/v4')(fetch)
    const result = await myFetch('/users')
    expect(result).toContainEqual('/apis/v4/users')
    expect(result).toEqual(await myFetch('users'))
  })

  it('should not add base url for absolute url', async () => {
    const myFetch = baseUrl('//api.example.com')(fetch)
    const absoluteUrls = [
      '//api2.example.com',
      'http://api2.example.com',
      'https://api2.example.com',
      'data:image/webp;base64,UklGRh4AAABXRUJQVlA4TBEAAAAvAAAAAAfQ//73v/+BiOh/AAA=',
    ]
    for (const url of absoluteUrls) {
      expect(await myFetch(url)).toContainEqual(url)
    }

    const nonAbsoluteUrls = ['/http://example.com', '/http://example.com']
    for (const url of nonAbsoluteUrls) {
      expect(await myFetch(url)).not.toContainEqual(url)
    }
  })

  it('should not add base url for data url', async () => {
    const myFetch = baseUrl('//api.example.com')(fetch)
    const dataUrls = [
      'data:text/*,Hi',
      'data:text/plain,Hi',
      'data: text/plain,Hi',
      'data:text/plain;charset=US-ASCII,Hi',
      'data:text/plain;base64,aGk=',
      'data:,Hi',
      'data: , Hi',
      'data:image/webp;base64,UklGRh4AAABXRUJQVlA4TBEAAAAvAAAAAAfQ//73v/+BiOh/AAA=',
    ]
    for (const url of dataUrls) {
      expect(await myFetch(url)).toContainEqual(url)
    }

    const nonDataUrls = ['data:hi', '/data:text/*,Hi']
    for (const url of nonDataUrls) {
      expect(await myFetch(url)).not.toContainEqual(url)
    }
  })
})
