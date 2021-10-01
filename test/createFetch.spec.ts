/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import createFetch from '../src/createFetch'
import query from '../src/query'
import bodify from '../src/bodify'
import {FetchEnhancer} from '../src/types'

describe('createFetch', () => {
  const fetch = jest.fn(
    (async (...args) => args) as unknown as typeof globalThis.fetch
  )

  it('should create fetch without middlewares', async () => {
    const myFetch = createFetch(fetch, [])
    expect(await myFetch('/api')).toMatchSnapshot()
    expect(
      await myFetch('/api', {headers: {'x-version': '1'}})
    ).toMatchSnapshot()
  })

  it('should create fetch with middlewares', async () => {
    const presets = [query(), bodify()] as const
    const myFetch = createFetch(fetch, presets)

    // default
    expect(await myFetch('/api')).toMatchSnapshot()
    // query string
    expect(await myFetch('/api', {query: {filter: 'name'}})).toMatchSnapshot()
    // json
    expect(
      await myFetch('/api', {method: 'POST', body: {name: 'JoJo'} as any})
    ).toMatchSnapshot()
    // form
    expect(
      await myFetch('/api', {
        method: 'POST',
        query: {filter: 'name'},
        body: new URLSearchParams({name: 'JoJo'}),
      })
    ).toMatchSnapshot()
  })

  it('should create fetch with compose', async () => {
    const next =
      (
        onNext: (...args: Parameters<typeof globalThis.fetch>) => void
      ): FetchEnhancer =>
      (fetch) =>
      (url, options) => {
        onNext(url, options)
        return fetch(url, options)
      }

    const onNext = jest.fn()
    const myFetch = createFetch(fetch, [query(), next(onNext)] as const)
    await myFetch('/api', {method: 'POST', query: {foo: 1}})
    expect(onNext).toBeCalledWith('/api?foo=1', {method: 'POST'})
  })
})
