import defaults from '../src/defaults'

describe('defaults', () => {
  const fetch = async (...args) => args

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

  it('should accept Headers', async () => {
    const headers = new Headers({a: 1, b: 1})
    headers.append('a', 2)
    const myFetch = defaults({headers})(fetch)
    expect(await myFetch('/', {headers: {b: 1, c: 1}})).toMatchSnapshot()
    // do not merge to `b: '1, 2'`
    expect(
      await myFetch('/', {headers: new Headers({a: '1, 2', b: '2', c: '1'})})
    ).toMatchSnapshot()
  })

  it('should filter null or undefined', async () => {
    const values = {a: null, b: undefined, c: 0, d: false, e: ''}
    const myFetch = defaults({headers: values})(fetch)
    const extra = {f: null, g: 1}
    expect(await myFetch('/', {headers: extra})).toMatchSnapshot('plain')
    expect(
      await myFetch('/', {headers: new Map(Object.entries(extra))})
    ).toMatchSnapshot('iterator')
  })
})
