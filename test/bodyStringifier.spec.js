import bodyStringifier from '../src/bodyStringifier'

const objectSample = {username: 'Jo Jo', lang: '中文', age: undefined}
const arraySample = [1, 2, true]

describe('bodyStringifier', () => {
  const fetch = (...args) => Promise.resolve(args)

  it('should stringify json', async () => {
    const myFetch = bodyStringifier()(fetch)
    expect(await myFetch('/api', {body: objectSample})).toMatchSnapshot()
    expect(await myFetch('/api', {body: arraySample})).toMatchSnapshot()
  })

  it('should stringify form', async () => {
    const myFetch = bodyStringifier()(fetch)
    expect(
      await myFetch('/api', {bodyType: 'form', body: objectSample})
    ).toMatchSnapshot()
    expect(
      await myFetch('/api', {bodyType: 'form', body: arraySample})
    ).toMatchSnapshot()
  })

  it('should not stringify with non-plain-object or non-array', async () => {
    const myFetch = bodyStringifier()(fetch)
    expect(await myFetch('/api', {body: new class Foo {}()})).toMatchSnapshot()
    expect(await myFetch('/api', {body: new FormData()})).toMatchSnapshot()
    expect(await myFetch('/api', {body: new Map()})).toMatchSnapshot()
    expect(await myFetch('/api', {body: true})).toMatchSnapshot()
    expect(await myFetch('/api', {body: null})).toMatchSnapshot()
  })

  it('should not stringify when given a wrong bodyType', async () => {
    const myFetch = bodyStringifier()(fetch)
    expect(
      await myFetch('/api', {bodyType: 'unknown', body: objectSample})
    ).toMatchSnapshot()
  })

  it('should work without options', async () => {
    const myFetch = bodyStringifier()(fetch)
    expect(await myFetch('/api')).toMatchSnapshot()
  })
})
