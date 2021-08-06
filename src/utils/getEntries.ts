const isIterable = (obj) =>
  obj != null && typeof Symbol !== 'undefined' && Symbol.iterator in obj

export default function getEntries(obj) {
  return isIterable(obj) ? Array.from(obj) : Object.entries(obj)
}
