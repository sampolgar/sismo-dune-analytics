//Deno test cases using assertions https://deno.land/manual@v1.31.1/basics/testing/assertions
import * as mod from 'https://deno.land/std@0.178.0/testing/asserts.ts';
import { load } from 'https://deno.land/std/dotenv/mod.ts';
import { DuneAnalyticsProvider } from './src/index.ts';
import { FetchedData, QueryParams } from './src/types.ts';
import { DuneErrorFactory } from './src/errors.ts';

/* 
 First 2 queries we test for successful responses
*/
//https://dune.com/queries/2034748
Deno.test('successful query no query params', async () => {
  const queryId = 2034748;
  const addressFieldName = 'Winner';
  const queryParameters: QueryParams = {};
  const formattedData = await runQuery(
    queryId,
    addressFieldName,
    queryParameters
  );

  const expectedResults: FetchedData = {
    '0x2536c09e5f5691498805884fa37811be3b2bddb4': 1,
    '0xae7f458667f1b30746354abc3157907d9f6fd15e': 1,
    '0xeb1c22baacafac7836f20f684c946228401ff01c': 1,
    '0x68f9d801c96ac6ccf562f3600cef77c4504449b6': 1,
  };

  mod.assertEquals(formattedData, expectedResults);
});

//https://dune.com/queries/1618116?address_t6c1ea=0x3CAaE25Ee616f2C8E13C74dA0813402eae3F496b&chain_e15077=arbitrum
Deno.test('successful query with query params', async () => {
  const queryId = 1618116;
  const addressFieldName = 'holder';
  const queryParameters: QueryParams = {
    address: '0x3CAaE25Ee616f2C8E13C74dA0813402eae3F496b',
    blocknumber: '66257668',
    chain: 'arbitrum',
  };
  const formattedData = await runQuery(
    queryId,
    addressFieldName,
    queryParameters
  );

  const expectedResults: FetchedData = {
    '0x3caae25ee616f2c8e13c74da0813402eae3f496b': 1,
  };
  mod.assertObjectMatch(formattedData, expectedResults);
});

/*
Now we test for the below cases
- wrong dune api key
- no dune api key
- wrong query params
- no query params - expected query params
- wrong address field name
- no address field name - expected address field name
- queryid doesn't exist
- dune api key is invalid
- dune api is missing
- no results returned
- wrong query parameters
- massive query
*/

//wrong dune api key
Deno.test('wrong dune api key', () => {
  mod.assertThrows(
    () => {
      runQuery(2034748, 'Winner', {}, 'wrongduneapikey');
    },
    Error,
    '401 - Unauthorized, check your Dune API key'
  );
});

Deno.test('Test Assert Throws', () => {
  mod.assertThrows(
    () => {
      throw DuneErrorFactory.createError(401);
    },
    Error,
    '401 - Unauthorized, check your Dune API key'
  );
});

async function runQuery(
  queryId: number,
  addressFieldName: string,
  queryParameters: QueryParams,
  t?: any
): Promise<FetchedData> {
  const env = await load();
  console.log(t);
  const DUNE_API_KEY = t || env['DUNE_API_KEY'];
  const duneAnalyticsProvider = new DuneAnalyticsProvider(DUNE_API_KEY);

  const formattedData: FetchedData = {};

  try {
    const duneData = await duneAnalyticsProvider.dune(queryId, queryParameters);
    for (const row of duneData) {
      formattedData[row[addressFieldName]] = 1;
    }
    if (formattedData.undefined) throw DuneErrorFactory.createError(101);
  } catch (error) {
    console.log(`here i am`);
    throw DuneErrorFactory.createError(error.status, error.url);
  }
  return formattedData;
}
