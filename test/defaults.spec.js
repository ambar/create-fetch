import defaults from '../src/defaults'

describe('defaults', () => {
  const fetch = (...args) => Promise.resolve(args)

  it('should add defaults', async () => {
    const myFetch = defaults({credentials: 'include'})(fetch)
    expect(await myFetch('/')).toMatchSnapshot()
  })

  it('should add defaults and headers', async () => {
    const myFetch = defaults({
      credentials: 'include',
      headers: {
        'content-type': 'text/plain',
      },
    })(fetch)
    // add
    expect(
      await myFetch('/', {headers: {'x-version': '1.0'}})
    ).toMatchSnapshot()
    // overwrite
    expect(
      await myFetch('/', {
        credentials: 'omit',
        headers: {'content-type': 'text/json'},
      })
    ).toMatchSnapshot()
  })

  it('should work without options', async () => {
    const myFetch = defaults()(fetch)
    expect(await myFetch('/')).toMatchSnapshot()
  })
})
