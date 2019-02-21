module.exports = {
  test(val) {
    return val instanceof FormData
  },

  print(val) {
    return `FormData {${[...val].join(';')}}`
  },
}
