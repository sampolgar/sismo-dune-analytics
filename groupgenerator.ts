import { DuneAnalyticsProvider } from './src/index.ts';
import { load } from 'https://deno.land/std/dotenv/mod.ts';
import { FetchedData, QueryParams } from './src/types.ts';
import { DuneErrorFactory } from './src/errors.ts';

const env = await load();
const DUNE_API_KEY = env['DUNE_API_KEY'] || '';

const duneAnalyticsProvider = new DuneAnalyticsProvider(DUNE_API_KEY);

// these are the variables that need changing
const queryId = 2034748; //2034748 nouns  //1215383 cow
const addressFieldName = 'Winner';

const queryParameters: QueryParams = {};

const formattedData: FetchedData = {};

try {
  const duneData = await duneAnalyticsProvider.dune(queryId, queryParameters);
  for (const row of duneData) {
    formattedData[row[addressFieldName]] = 1;
  }
  if (formattedData.undefined) throw DuneErrorFactory.createError(101);
} catch (error) {
  console.log(error);
}

console.log(formattedData);
