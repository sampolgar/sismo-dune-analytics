import { DuneAnalyticsProvider } from './src/index.ts';
import { load } from 'https://deno.land/std/dotenv/mod.ts';
import { FetchedData, QueryParams } from './src/types.ts';
import { DuneAnalyticsProvider2 } from './src/provider2.ts';

const env = await load();
const DUNE_API_KEY = env['DUNE_API_KEY'] || '';
const duneAnalyticsProvider2 = new DuneAnalyticsProvider2(DUNE_API_KEY);

const queryId2 = 2034748; //2034748 nouns  //1215383 cow
const addressFieldName = 'Winner';
const queryParameters: QueryParams = {};
const formattedData: FetchedData = {};

const duneData = await duneAnalyticsProvider2
  .execute(queryId2, queryParameters)
  .then((data) => {
    console.log(`here with the data! ${JSON.stringify(data)}`);
  })
  .catch((e) => {
    console.log(`here with the error! ${e}`);
  });
