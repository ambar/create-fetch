export default (baseUrl) => (fetch) => (url, options) =>
  fetch(new URL(url, baseUrl).toString(), options)
