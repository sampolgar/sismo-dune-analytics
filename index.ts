import { load } from 'https://deno.land/std/dotenv/mod.ts';

const env = await load();
const DUNE_API_KEY = env['DUNE_API_KEY'];

//Execute Query
//
//POST v1/query/{{query_id}}/execute
//https://api.dune.com/api/v1/query/{{query_id}}/execute
const queryId = 2034748;

let execute = await fetch(
  `https://api.dune.com/api/v1/query/${queryId}/execute`,
  {
    method: 'POST',
    headers: {
      'x-dune-api-key': DUNE_API_KEY,
    },
  }
);

const body = await execute.text();
console.log(body);

//Execution Status
//
//GET v1/execution/{{execution_id}}/status
//https://api.dune.com/api/v1/execution/{{execution_id}}/status

let executionId = '01GSYJ5R1AE5WFXX1TQWH87MV4';
let executionStatus = await fetch(
  `https://api.dune.com/api/v1/execution/${executionId}/status`,
  {
    method: 'GET',
    headers: {
      'x-dune-api-key': DUNE_API_KEY,
    },
  }
);

const body2 = await executionStatus.text();
console.log(body2);

//Execution Results
//
//GET v1/execution/{{execution_id}}/results
//https://api.dune.com/api/v1/execution/{{execution_id}}/results

let executionResults = await fetch(
  `https://api.dune.com/api/v1/execution/${executionId}/results`,
  {
    method: 'GET',
    headers: {
      'x-dune-api-key': DUNE_API_KEY,
    },
  }
);

const body3 = await executionResults.text();
console.log(body3);
