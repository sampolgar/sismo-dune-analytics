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
- Inspiration [Benjamin Smith Cow Protocol](https://github.com/bh2smith) [Dune Client](https://github.com/cowprotocol/ts-dune-client/)

## Getting started

This uses Deno as a runtime environment.
1. Install [Deno](https://deno.land/) or `brew install deno`
2. add your Dune API key to the `.env` file
3. ensure `"deno.enable": true` is set in your vscode workspace settings, example provided in `.vscode/settings.json`
4. execute `deno run groupgenerator.ts`

Queries

- Nouns DAO https://dune.com/queries/2034748

Requirements
-[] handle execution responses (pending, executing, time out because data above 250mb)
-[] handle errors

Execution Status

- QUERY_STATE_PENDING - query execution is waiting for execution slot
- QUERY_STATE_EXECUTING - query is executing
- QUERY_STATE_FAILED - execution failed
- QUERY_STATE_COMPLETED - execution completed successfully
- QUERY_STATE_CANCELLED - execution cancelled by user
- QUERY_STATE_EXPIRED - query execution expired, result no longer available

Error Handling
