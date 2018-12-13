# create-fetch

Utilities for custom [fetch](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch).

[![build status](https://badgen.net/travis/ambar/create-fetch)](https://travis-ci.org/ambar/create-fetch)
[![npm version](https://badgen.net/npm/v/create-fetch)](https://www.npmjs.com/package/create-fetch)
[![minzipped size](https://badgen.net/bundlephobia/minzip/create-fetch)](https://bundlephobia.com/result?p=create-fetch)

## Install

```console
npm install create-fetch
```

## Usage

```js
import fetch from 'cross-fetch' // use universal fetch if needed
import createFetch, {query, headers, bodyStringifier} from 'create-fetch'

const myFetch = createFetch(fetch, [
  query(),
  bodyStringifier(),
  headers({'x-requested-with': 'fetch'}),
])

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

Import from [`module`](https://caniuse.com/#search=modules) script (1.4K gzip size):

```html
<script type="module">
  import createFetch, {query, headers} from 'https://unpkg.com/create-fetch'

  const myFetch = createFetch(fetch, [
    query(),
    headers({'x-requested-with': 'fetch'}),
  ])
  myFetch('/example.html', {query: {foo: 'bar'}})
</script>
```

## API

- [`defaults(options)`](#defaults)
- [`baseUrl(url)`](#baseUrl)
- [`headers(options)`](#headers)
- [`query()`](#query)
- [`bodyStringifier()`](#bodyStringifier)
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
  query: {filter: 'user'},
})
// =>
// GET /?filter=user
```

### <a name='bodyStringifier'></a>`bodyStringifier()`

Stringify request body.

```js
import {bodyStringifier} from 'create-fetch'

const myFetch = bodyStringifier()(fetch)

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
  bodyType: 'form',
  body: {name: 'JoJo'},
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
