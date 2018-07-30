import createFetch from '../src/createFetch'
import query from '../src/query'
import bodyStringifier from '../src/bodyStringifier'

describe('createFetch', () => {
  const fetch = (...args) => Promise.resolve(args)

  it('should create fetch without middlewares', async () => {
    const myFetch = createFetch(fetch)
    expect(await myFetch('/api')).toMatchSnapshot()
    expect(await myFetch('/api', {headers: {'x-versoin': 1}})).toMatchSnapshot()
  })

  it('should create fetch with middlewares', async () => {
    const presets = [query(), bodyStringifier()]
    const myFetch = createFetch(fetch, presets)

    // default
    expect(await myFetch('/api')).toMatchSnapshot()
    // query string
    expect(await myFetch('/api', {query: {filter: 'name'}})).toMatchSnapshot()
    // json
    expect(
      await myFetch('/api', {method: 'POST', body: {name: 'JoJo'}})
    ).toMatchSnapshot()
    // form
    expect(
      await myFetch('/api', {
        method: 'POST',
        query: {filter: 'name'},
        body: {name: 'JoJo'},
        bodyType: 'form',
      })
    ).toMatchSnapshot()
  })

  it('should create fetch with compose', async () => {
    const next = onNext => fetch => (url, options) => {
      onNext(url, options)
      return fetch(url, options)
    }

    const onNext = jest.fn()
    const myFetch = createFetch(fetch, [query(), next(onNext)])
    await myFetch('/api', {method: 'POST', query: {foo: 1}})
    expect(onNext).toBeCalledWith('/api?foo=1', {method: 'POST'})
  })
})
