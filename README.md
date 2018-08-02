# create-fetch

Utilities for [fetch](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API).

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

## API

- [`defaults(options)`](#defaults)
- [`headers(options)`](#headers)
- [`query()`](#query)
- [`bodyStringifier()`](#bodyStringifier)
- [`xsrf()`](#xsrf)

### <a name='defaults'></a>`defaults(options)`

Add default request options.

```js
import {defaults} from 'create-fetch'

const myFetch = defaults({
  credentials: 'same-origin',
})(fetch)
myFetch('/')
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

### <a name='xsrf'></a>`xsrf()`

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
