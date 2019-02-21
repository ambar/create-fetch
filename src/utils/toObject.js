const toObject =
  Object.fromEntries ||
  (iterable => {
    const obj = {}
    for (const [key, value] of iterable) {
      obj[key] = value
    }
    return obj
  })

export default toObject
