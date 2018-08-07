const reAbsoluteUrl = /^(\w+:)?\/\//
const reDataUrl = /^data:[^,]*,/

const joinUrl = (a, b) => {
  return [a.replace(/\/$/, ''), b.replace(/^\//, '')].join('/')
}

export default baseUrl => fetch => (url, options) => {
  return fetch(
    reAbsoluteUrl.test(url) || reDataUrl.test(url)
      ? url
      : joinUrl(baseUrl, url),
    options
  )
}
