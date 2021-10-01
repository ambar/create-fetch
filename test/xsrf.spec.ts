import xsrf from '../src/xsrf'

const sampleCookie = '_xsrf=uuid|foo.bar;_ga=1'

describe('xsrf', () => {
  const fetch = jest.fn(
    (async (...args) => args) as unknown as typeof globalThis.fetch
  )

  beforeEach(() => {
    fetch.mockReset()
    document.cookie = '_xsrf='
  })

  it('should add xsrf header when using POST/PATCH/POST/PUT', async () => {
    document.cookie = sampleCookie
    const myFetch = xsrf()(fetch)
    await myFetch('/', {method: 'POST'})
    const [, {headers}] = fetch.mock.calls[0]
    expect(headers).toMatchSnapshot()

    const methods = ['DELETE', 'PATCH', 'POST', 'PUT']
    for (const method of methods) {
      await myFetch('/', {method})
      const [, options] = fetch.mock.calls[0]
      expect(options.headers).toMatchObject(headers)

      await myFetch('/', {method: method.toLowerCase()})
      const [, options2] = fetch.mock.calls[0]
      expect(options2.headers).toMatchObject(headers)
    }
  })

  it('should not add xsrf header when using GET/HEAD/OPTIONS', async () => {
    document.cookie = sampleCookie
    const myFetch = xsrf()(fetch)
    await myFetch('/')
    const [, {headers}] = fetch.mock.calls[0]
    expect(headers).toMatchSnapshot()

    const methods = ['GET', 'HEAD', 'OPTIONS']
    for (const method of methods) {
      await myFetch('/', {method})
      const [, options] = fetch.mock.calls[1]
      expect(options.headers).toMatchObject(headers)
    }
  })

  it('should add xsrf header with custom header name', async () => {
    document.cookie = sampleCookie
    const myFetch = xsrf({headerName: 'x-xsrf-token'})(fetch)
    await myFetch('/', {method: 'POST'})
    expect(fetch.mock.calls[0]).toMatchSnapshot()
  })

  it('should add xsrf header with custom cookie name', async () => {
    document.cookie = 'csrf=uuid'
    const myFetch = xsrf({cookieName: 'csrf'})(fetch)
    await myFetch('/', {method: 'POST'})
    expect(fetch.mock.calls[0]).toMatchSnapshot()
  })

  it('should not match cookie', async () => {
    document.cookie = 'xsrf=foo;__xsrf_=bar;xsrf_=bar'
    const myFetch = xsrf()(fetch)
    await myFetch('/', {method: 'POST'})
    expect(fetch.mock.calls[0]).toMatchSnapshot()
  })

  it('should work without options', async () => {
    const myFetch = xsrf()(fetch)
    await myFetch('/')
    expect(fetch.mock.calls[0]).toMatchSnapshot()
  })
})
