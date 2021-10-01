import xsrf from '../src/xsrf'

const sampleCookie = '_xsrf=uuid|foo.bar;_ga=1'

describe('xsrf', () => {
  const fetch = async (...args) => args

  beforeEach(() => {
    document.cookie = '_xsrf='
  })

  it('should add xsrf header when using POST/PATCH/POST/PUT', async () => {
    document.cookie = sampleCookie
    const myFetch = xsrf()(fetch)
    const [, {headers}] = await myFetch('/', {method: 'POST'})
    expect(headers).toMatchSnapshot()

    const methods = ['DELETE', 'PATCH', 'POST', 'PUT']
    for (const method of methods) {
      const [, options] = await myFetch('/', {method})
      expect(options.headers).toMatchObject(headers)

      const [, options2] = await myFetch('/', {method: method.toLowerCase()})
      expect(options2.headers).toMatchObject(headers)
    }
  })

  it('should not add xsrf header when using GET/HEAD/OPTIONS', async () => {
    document.cookie = sampleCookie
    const myFetch = xsrf()(fetch)
    const [, {headers}] = await myFetch('/')
    expect(headers).toMatchSnapshot()

    const methods = ['GET', 'HEAD', 'OPTIONS']
    for (const method of methods) {
      const [, options] = await myFetch('/', {method})
      expect(options.headers).toMatchObject(headers)
    }
  })

  it('should add xsrf header with custom header name', async () => {
    document.cookie = sampleCookie
    const myFetch = xsrf({headerName: 'x-xsrf-token'})(fetch)
    expect(await myFetch('/', {method: 'POST'})).toMatchSnapshot()
  })

  it('should add xsrf header with custom cookie name', async () => {
    document.cookie = 'csrf=uuid'
    const myFetch = xsrf({cookieName: 'csrf'})(fetch)
    expect(await myFetch('/', {method: 'POST'})).toMatchSnapshot()
  })

  it('should not match cookie', async () => {
    document.cookie = 'xsrf=foo;__xsrf_=bar;xsrf_=bar'
    const myFetch = xsrf()(fetch)
    expect(await myFetch('/', {method: 'POST'})).toMatchSnapshot()
  })

  it('should work without options', async () => {
    const myFetch = xsrf()(fetch)
    expect(await myFetch('/')).toMatchSnapshot()
  })
})
