import headers from '../src/headers'

describe('headers', () => {
  const fetch = (...args) => Promise.resolve(args)

  it('should add headers', async () => {
    const myFetch = headers({'x-version': '1.0'})(fetch)
    expect(await myFetch('/')).toMatchSnapshot()
    expect(
      await myFetch('/', {headers: {'x-version': '1.1'}})
    ).toMatchSnapshot()
  })
})
