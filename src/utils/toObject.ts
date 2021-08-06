const toObject =
  Object.fromEntries ||
  ((obj) => Array.from(obj).reduce((acc, [k, v]) => ((acc[k] = v), acc), {}))

export default toObject
