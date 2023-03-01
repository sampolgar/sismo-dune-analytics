import { assertEquals } from 'https://deno.land/std@0.178.0/testing/asserts.ts';
import { load } from 'https://deno.land/std/dotenv/mod.ts';
import { DuneAnalyticsProvider } from './src/index.ts';
import { FetchedData, QueryParams } from './src/types.ts';
import { DuneErrorFactory } from './src/errors.ts';

//tests - failure
//wrong dune api key
//no dune api key
//wrong query params
//no query params - expected query params
//wrong address field name
//no address field name - expected address field name
// queryid doesn't exist
// dune api key is invalid
// dune api is missing
// no results returned
// wrong query parameters
// massive query

//tests - success
//successful query no query params
//successful query with query params
//successful query with query params and address field name

Deno.test('create class', async (t) => {
  const env = await load();
  const DUNE_API_KEY = env['DUNE_API_KEY'] || '';
  const duneAnalyticsProvider = new DuneAnalyticsProvider(DUNE_API_KEY);

  await t.step('successful query no query params', async () => {
    const queryId = 2034748; //2034748 nouns  //1215383 cow
    const addressFieldName = 'Winner';
    const queryParameters: QueryParams = {};
    const formattedData: FetchedData = {};
    try {
      const duneData = await duneAnalyticsProvider.dune(
        queryId,
        queryParameters
      );
      for (const row of duneData) {
        formattedData[row[addressFieldName]] = 1;
      }
      if (formattedData.undefined) throw DuneErrorFactory.createError(101);
    } catch (error) {
      console.log(error);
    }
    assertEquals(formattedData, {});
  });
});

// await t.step("queryId doesn't exist", async () => {
//   const queryId = 1;
//   const addressFieldName = 'Winner';
//   const queryParameters: QueryParams = {};
//   const formattedData: FetchedData = {};
//   try {
//     const duneData = await duneAnalyticsProvider.dune(
//       queryId,
//       queryParameters
//     );
//     for (const row of duneData) {
//       formattedData[row[addressFieldName]] = 1;
//     }
//     if (formattedData.undefined) throw DuneErrorFactory.createError(101);
//   } catch (error) {
//     console.log(error);
//   }
//   assertEquals(formattedData, {});
// });
