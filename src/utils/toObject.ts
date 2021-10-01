const toObject =
  Object.fromEntries ||
  ((obj) =>
    Array.from(obj).reduce(
      (acc: Record<string, unknown>, [k, v]) => (
        (acc[k as keyof typeof acc] = v), acc
      ),
      {}
    ))

export default toObject
