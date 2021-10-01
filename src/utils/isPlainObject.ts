/* eslint-disable @typescript-eslint/no-unsafe-assignment */
// Copied from react-redux
// https://github.com/reduxjs/react-redux/blob/master/src/utils/isPlainObject.js

// NOTE: Object with the null-prototype will be treated as a plain object here:
//       It could be used to create an Object without Object.property key
//       like: "constructor", "hasOwnProperty", etc.
// EXPL: const foo = Object.create(Object.create(null))
//       foo.constructor === undefined
//       foo.hasOwnProperty === undefined
//       isPlainObject(foo) === true

/**
 * @param {any} obj The object to inspect.
 * @returns {boolean} True if the argument appears to be a plain object.
 */
export default function isPlainObject(obj: unknown) {
  if (typeof obj !== 'object' || obj === null) return false

  const proto = Object.getPrototypeOf(obj)
  if (proto === null) return true

  let baseProto = proto
  while (Object.getPrototypeOf(baseProto) !== null) {
    baseProto = Object.getPrototypeOf(baseProto)
  }

  return proto === baseProto
}
