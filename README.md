# create-fetch

Utility for [fetch](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API).

## Install

```
npm install create-fetch
```

## Usage

```js
import fetch from 'cross-fetch' // universal fetch polyfill
import createFetch, {query, headers, bodyStringifier} from 'create-fetch'

const myFetch = createFetch(fetch, [
  query(),
  bodyStringifier(),
  headers({'x-requested-with': 'fetch'}),
])

// same as:
// const myFetch = compose(
//   query(),
//   bodyStringifier(),
//   headers({'x-requested-with': 'fetch'})
// )(fetch)

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
