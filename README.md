# Sismo Dune Client

This is the [Sismo Data Provider](https://docs.sismo.io/sismo-docs/technical-documentation/sismo-hub/data-providers) for [Dune Analytics](https://dune.com/docs/api/api-reference).

## What does it do?

Dune analytics queries blockchain data. Dune users can create their own queries, for example

- all addresses that first bought a bored ape
- all the addresses that held a token for more than 30 days
- etc

Sismo issues ZK badges to users that meet a criteria, more info on Sismo and ZK Badges [here](https://docs.sismo.io/sismo-docs/technical)

This client allows Sismo to issue ZK badges to users that meet the Dune query criteria.

## Resources

- [Dune API](https://dune.com/docs/api/api-reference)
- Inspiration [Benjamin Smith Cow Protocol](https://github.com/bh2smith) and his project [Dune Client](https://github.com/cowprotocol/ts-dune-client/)

## Getting started

This uses Deno as a runtime environment.

1. Install [Deno](https://deno.land/) or `brew install deno`
2. add your Dune API key to the `.env` file
3. ensure `"deno.enable": true` is set in your vscode workspace settings, example provided in `.vscode/settings.json`
4. execute `deno run groupgenerator.ts`

https://dune.com/docs/app/queries/parameters/#summary

## Error codes to catch

- 429 - Too many requests

### 400

```json
{
  "error": "query parameter chain has invalid value fantom for type enum"
}
```

## Dune Query Parameters

[Dune Analytics Query Parameters](https://dune.com/docs/app/queries/parameters/) are a way to pass parameters to the Dune query.
You'll need to copy the Query Parameter - represented by the `{{var}}` syntax from Dune and insert it into the query parameter object.

Errors

```json
Response {
  body: ReadableStream { locked: false },
  bodyUsed: false,
  headers: Headers {
  "access-control-allow-credentials": "true",
  "access-control-allow-headers": "Content-Type, Content-Length, Accept-Encoding, Accept, Origin, X-Dune-Api-Key",
  "access-control-allow-methods": "OPTIONS, GET, POST",
  "access-control-allow-origin": "*",
  "content-type": "application/json; charset=utf-8",
  date: "Tue, 28 Feb 2023 04:14:37 GMT",
  "strict-transport-security": "max-age=15724800; includeSubDomains",
  vary: "Accept-Encoding"
},
  ok: false,
  redirected: false,
  status: 400,
  statusText: "Bad Request",
  url: "https://api.dune.com/api/v1/query/2034748/execute"
}
```

The TextField parameter is wrong
const queryId = 1215383; //2034748 nouns //1215383 cow
const addressFieldName = 'Winner';

//TODO add query parameters as strings
// const queryParameters: QueryParams = {};


const queryParameters: QueryParams = {
TextField2: 'Plain Text',
NumberField: '3.1415926535',
DateField: '2022-05-04 00:00:00',
ListField: 'Option 1',
};

Response {
body: ReadableStream { locked: false },
bodyUsed: false,
headers: Headers {
"access-control-allow-credentials": "true",
"access-control-allow-headers": "Content-Type, Content-Length, Accept-Encoding, Accept, Origin, X-Dune-Api-Key",
"access-control-allow-methods": "OPTIONS, GET, POST",
"access-control-allow-origin": "\*",
"content-type": "application/json; charset=utf-8",
date: "Tue, 28 Feb 2023 04:19:43 GMT",
"strict-transport-security": "max-age=15724800; includeSubDomains",
vary: "Accept-Encoding"
},
ok: false,
redirected: false,
status: 400,
statusText: "Bad Request",
url: "https://api.dune.com/api/v1/query/1215383/execute"
} 400 Bad Request check the request URL and request parameters

Wrong Query ID

Response {
body: ReadableStream { locked: false },
bodyUsed: false,
headers: Headers {
"access-control-allow-credentials": "true",
"access-control-allow-headers": "Content-Type, Content-Length, Accept-Encoding, Accept, Origin, X-Dune-Api-Key",
"access-control-allow-methods": "OPTIONS, GET, POST",
"access-control-allow-origin": "\*",
"content-type": "application/json; charset=utf-8",
date: "Tue, 28 Feb 2023 04:21:56 GMT",
"strict-transport-security": "max-age=15724800; includeSubDomains",
vary: "Accept-Encoding"
},
ok: false,
redirected: false,
status: 403,
statusText: "Forbidden",
url: "https://api.dune.com/api/v1/query/1215/execute"
} 403 Forbidden check the request URL and request parameters
error: Uncaught (in promise) Error: here 2: Error: Forbidden

Wrong API Key

Response {
body: ReadableStream { locked: false },
bodyUsed: false,
headers: Headers {
"access-control-allow-credentials": "true",
"access-control-allow-headers": "Content-Type, Content-Length, Accept-Encoding, Accept, Origin, X-Dune-Api-Key",
"access-control-allow-methods": "OPTIONS, GET, POST",
"access-control-allow-origin": "\*",
"content-type": "application/json; charset=utf-8",
date: "Tue, 28 Feb 2023 04:23:02 GMT",
"strict-transport-security": "max-age=15724800; includeSubDomains",
vary: "Accept-Encoding"
},
ok: false,
redirected: false,
status: 401,
statusText: "Unauthorized",
url: "https://api.dune.com/api/v1/query/1215383/execute"
} 401 Unauthorized check the request URL and request parameters

Calling the API, the logs should show you
...

If the logs show you the following, you may have the address field wrong. Check the Dune query and make sure the address field is correct.

<!-- const queryId = 2034748; //2034748 nouns  //1215383 cow
const addressFieldName = 'Winneroo';
const queryParameters: QueryParams = {}; -->

{
Cumulative: 1274.75,
Date: "2021-08-17T20:02:48+00:00",
"ETH price ($)": 3086.47,
"MA last 30 auctions": 141.6,
"MA last 7 auctions": 84.5,
Paid: 155,
URL: '<a href="https://opensea.io/assets/0x9c8ff314c9bc7f6e59a9d9225fb22946427edc03/9" target="_blank">htt...',
Winner: "0x0c9e1b96ac2c254d099e160edfcd015d6442db86",
nounId: 9
},
