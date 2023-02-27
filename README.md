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
