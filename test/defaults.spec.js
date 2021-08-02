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
    const result = await myFetch('/api', {headers: {b: 2, c: 1}})
    expect(result).toEqual(
      await myFetch('/api', {headers: {a: '1, 2', b: '2', c: '1'}})
    )
    expect(result).toEqual(
      await myFetch('/api', {headers: new Headers({a: '1, 2', b: '2', c: '1'})})
    )
  })
})
