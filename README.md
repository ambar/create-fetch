# create-fetch

Utilities for custom [fetch](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch).

[![Coverage Status](https://coveralls.io/repos/github/ambar/create-fetch/badge.svg?branch=master)](https://coveralls.io/github/ambar/create-fetch?branch=master)
[![npm version](https://badgen.net/npm/v/create-fetch)](https://www.npmjs.com/package/create-fetch)
[![minzipped size](https://badgen.net/bundlephobia/minzip/create-fetch)](https://bundlephobia.com/result?p=create-fetch)

## Install

```console
npm install create-fetch
```

## Usage

```js
import 'cross-fetch/polyfill' // add universal-fetch polyfill if needed
import {composeFetch, query, headers, bodify} from 'create-fetch'

const myFetch = composeFetch([
  query(),
  bodify(),
  headers({'x-requested-with': 'fetch'}),
])(fetch)

// same as:
// const myFetch = compose(query(), ...)(fetch)

// could also use pipeline operator:
// const myFetch = fetch |> query() |> ...

myFetch('/api', {
  method: 'POST',
  query: {filter: 'user'},
  body: {name: 'JoJo'},
})
// =>
// POST /api?filter=user
// Request Headers:
//   content-type: application/json
//   x-requested-with: fetch
// Request Payload:
//   {"name":"JoJo"}
```

### Typing

```ts
import {FetchCompose, FetchEnhancer, query, bodify} from 'create-fetch'
import flowRight from 'lodash/flowRight'

// inject extra options
type FooInit = {foo?: boolean}
const foo =
  (): FetchEnhancer<FooInit> =>
  (fetch) =>
  (url, {foo, ...options}) => {
    if (foo) {
      // ...
    }
    return fetch(url, options)
  }

const bar = (): FetchEnhancer => (fetch) => (url, options) => {
  return fetch(url, options)
}

// same as `composeFetch`
const myFetch = (flowRight as FetchCompose)([
  //
  foo(),
  bar(),
  query(),
  bodify(),
])(fetch)

// (url: RequestInfo, options?: RequestInit & QueryInit & FooInit) => Promise<Response>
myFetch('/', {
  withEncrypt: true,
})
```

### ESM

Import from [`module`](https://caniuse.com/#search=modules) script (1.4K gzip size):

```html
<script type="module">
  import createFetch, {query, headers} from 'https://unpkg.com/create-fetch'

  const myFetch = createFetch(fetch, [
    query(),
    headers({'x-requested-with': 'fetch'}),
  ])
  myFetch('/api', {query: {foo: 'bar'}})
</script>
```

## API

- [`defaults(options)`](#defaults)
- [`baseUrl(url)`](#baseUrl)
- [`headers(options)`](#headers)
- [`query()`](#query)
- [`bodify()`](#bodify)
- [`xsrf(options)`](#xsrf)

### <a name='defaults'></a>`defaults(options)`

Add default request options.

```js
import {defaults} from 'create-fetch'

const myFetch = defaults({
  credentials: 'same-origin',
})(fetch)
myFetch('/')
```

### <a name='baseUrl'></a>`baseUrl(url)`

Add request base url.

```js
import {baseUrl} from 'create-fetch'

const ghApi = baseUrl('https://api.github.com')(fetch)
ghApi('/users')
// =>
// GET https://api.github.com/users
```

### <a name='headers'></a>`headers(options)`

Add default request headers.

```js
import {headers} from 'create-fetch'

const myFetch = headers({
  'x-requested-with': 'fetch',
  // null or undefined will be removed
  'x-foo': null,
})(fetch)

myFetch('/')
// =>
// GET /
// Request Headers:
//   x-requested-with: fetch
```

### <a name='query'></a>`query()`

Stringify query string.

```js
import {query} from 'create-fetch'

const myFetch = query()(fetch)

myFetch('/', {
  query: {
    filter: 'user'
    // null or undefined will be set to empty
    foo: null
  },
})
// =>
// GET /?filter=user&foo
```

### <a name='bodify'></a>`bodify()`

Stringify request body.

```js
import {bodify} from 'create-fetch'

const myFetch = bodify()(fetch)

// stringify json by default
myFetch('/', {
  method: 'POST',
  body: {name: 'JoJo'},
})
// =>
// POST /
// Request Headers:
//   content-type: application/json
// Request Payload:
//   {"name":"JoJo"}

// stringify form
myFetch('/', {
  method: 'POST',
  body: new URLSearchParams({name: 'JoJo'}),
})
// =>
// POST /
// Request Headers:
//   content-type: application/x-www-form-urlencoded
// Request Payload:
//   name=JoJo
```

### <a name='xsrf'></a>`xsrf(options)`

Add XSRF token header.

```js
import {xsrf} from 'create-fetch'

const myFetch = xsrf({
  cookieName, // defaults to `_xsrf`
  headerName, // defaults to `x-xsrftoken`
})(fetch)

myFetch('/', {
  method: 'POST',
})
// =>
// POST /
// Request Headers:
//   x-xsrftoken: <xsrf-token>
```
