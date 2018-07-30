const compose = (...fns) => arg => fns.reduceRight((acc, f) => f(acc), arg)

const createFetch = (fetch, middlewares = []) => compose(...middlewares)(fetch)

export default createFetch
