import bodify from '../src/bodify'

const objectSample = {username: 'Jo Jo', lang: '中文', age: undefined}
const arraySample = [
  [1, 2],
  [3, 4],
]

describe('bodify', () => {
  const fetch = async (...args) => args

  it('should accept Headers', async () => {
    const myFetch = bodify()(fetch)
    const headers = new Headers({a: 1})
    headers.append('a', 2)
    const result = await myFetch('/api', {body: {}, headers})
    expect(result).toMatchSnapshot()
    expect(result).toEqual(
      await myFetch('/api', {body: {}, headers: {a: '1, 2'}})
    )
    expect(result).toEqual(
      await myFetch('/api', {body: {}, headers: {a: '1', A: 2}})
    )
  })

  it('should stringify json', async () => {
    const myFetch = bodify()(fetch)
    expect(await myFetch('/api', {body: objectSample})).toMatchSnapshot()
    expect(await myFetch('/api', {body: arraySample})).toMatchSnapshot()
    const null0 = Object.create(null)
    const null1 = Object.create(Object.create(null))
    const null2 = Object.create(Object.create(Object.create(null)))
    expect(await myFetch('/api', {body: null0})).toMatchSnapshot()
    expect(await myFetch('/api', {body: null1})).toMatchSnapshot()
    expect(await myFetch('/api', {body: null2})).toMatchSnapshot()
  })

  it('should stringify form', async () => {
    const myFetch = bodify()(fetch)
    expect(
      await myFetch('/api', {body: new URLSearchParams(objectSample)})
    ).toMatchSnapshot()
    expect(
      await myFetch('/api', {body: new URLSearchParams(arraySample)})
    ).toMatchSnapshot()
  })

  it('should not stringify with non-plain-object or non-array', async () => {
    const myFetch = bodify()(fetch)
    expect(
      await myFetch('/api', {body: new (class Foo {})()})
    ).toMatchSnapshot()
    expect(await myFetch('/api', {body: new FormData()})).toMatchSnapshot()
    expect(await myFetch('/api', {body: new Map()})).toMatchSnapshot()
    expect(await myFetch('/api', {body: true})).toMatchSnapshot()
    expect(await myFetch('/api', {body: null})).toMatchSnapshot()
  })

  it('should work without options', async () => {
    const myFetch = bodify()(fetch)
    expect(await myFetch('/api')).toMatchSnapshot()
  })

  it('should allow custom content-type', async () => {
    const myFetch = bodify()(fetch)
    const contentType = 'content-type'
    const formResult = await myFetch('/api', {
      body: new URLSearchParams(),
      headers: {
        [contentType]: 'application/vnd.org+form',
      },
    })
    const jsonResult = await myFetch('/api', {
      body: {},
      headers: {
        [contentType]: 'application/vnd.org+json',
      },
    })
    expect(formResult).toMatchSnapshot()
    expect(jsonResult).toMatchSnapshot()
    // ignore cases
    expect(
      await myFetch('/api', {
        body: new URLSearchParams(),
        headers: {
          [contentType.toUpperCase()]: 'application/vnd.org+form',
        },
      })
    ).toEqual(formResult)
    expect(
      await myFetch('/api', {
        body: {},
        headers: {
          [contentType.toUpperCase()]: 'application/vnd.org+json',
        },
      })
    ).toEqual(jsonResult)
  })
})
