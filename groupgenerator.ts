import { DuneAnalyticsProvider } from './src/index.ts';
import { load } from 'https://deno.land/std/dotenv/mod.ts';
import { FetchedData, QueryParams } from './src/types.ts';

const env = await load();
const DUNE_API_KEY = env['DUNE_API_KEY'] || '';

const duneAnalyticsProvider = new DuneAnalyticsProvider(DUNE_API_KEY);

// these are the variables that need changing
const queryId = 2034748; //2034748 nouns  //1215383 cow
const addressFieldName = 'Winner';

//TODO add query parameters as strings
// const queryParameters: QueryParams = {};
const queryParameters: QueryParams = {
  TextField: 'Plain Text',
  NumberField: '3.1415926535',
  DateField: '2022-05-04 00:00:00',
  ListField: 'Option 1',
};

const duneData = await duneAnalyticsProvider.dune(queryId, queryParameters);
console.log(duneData);

const formattedData: FetchedData = {};

for (const row of duneData) {
  formattedData[row[addressFieldName]] = 1;
}
