module.exports = {
  test(val) {
    return val instanceof URLSearchParams
  },

  print(val, serialize) {
    return 'URLSearchParams: ' + serialize(val.toString())
  },
}
