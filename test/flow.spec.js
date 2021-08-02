const pipe =
  (...fns) =>
  (arg) =>
    fns.reduce((acc, f) => f(acc), arg)
const compose =
  (...fns) =>
  (arg) =>
    fns.reduceRight((acc, f) => f(acc), arg)

const seq = []

const dummy = (name) => {
  seq.push(name + '0')
  return (fetch) => {
    seq.push(name + '1')
    return (url, options) => {
      seq.push(name + '2')
      return fetch(url, options).then((r) => {
        seq.push(name + '3')
        return r
      })
    }
  }
}

describe('flow', () => {
  const fetch = async (...args) => args

  beforeEach(() => {
    seq.length = 0
  })

  test('simple wrap', async () => {
    const myFetch = dummy('b')(dummy('a')(fetch))
    await myFetch('/api')
    expect(seq.join(' > ')).toBe('b0 > a0 > a1 > b1 > b2 > a2 > a3 > b3')
  })

  test('pipeline operator', async () => {
    const myFetch = fetch |> dummy('a') |> dummy('b')
    await myFetch('/api')
    expect(seq.join(' > ')).toBe('a0 > a1 > b0 > b1 > b2 > a2 > a3 > b3')
  })

  // left to right
  test('pipe', async () => {
    const myFetch = pipe(dummy('a'), dummy('b'))(fetch)
    await myFetch('/api')
    expect(seq.join(' > ')).toBe('a0 > b0 > a1 > b1 > b2 > a2 > a3 > b3')
  })

  // right to left
  test('compose', async () => {
    const myFetch = compose(dummy('a'), dummy('b'))(fetch)
    await myFetch('/api')
    expect(seq.join(' > ')).toBe('a0 > b0 > b1 > a1 > a2 > b2 > b3 > a3')
  })

  test('manual pipe', async () => {
    const myFetch = [dummy('a'), dummy('b')].reduce(
      (prev, next) => next(prev),
      fetch
    )
    // same as: [fetch, dummy('a'), dummy('b')].reduce((prev, next) => next(prev))
    await myFetch('/api')
    expect(seq.join(' > ')).toBe('a0 > b0 > a1 > b1 > b2 > a2 > a3 > b3')
  })

  test('manual compose', async () => {
    const myFetch = [dummy('a'), dummy('b')].reduceRight(
      (prev, next) => next(prev),
      fetch
    )
    // same as: [dummy('a'), dummy('b'), fetch].reduceRight((prev, next) => next(prev))
    await myFetch('/api')
    expect(seq.join(' > ')).toBe('a0 > b0 > b1 > a1 > a2 > b2 > b3 > a3')
  })
})
