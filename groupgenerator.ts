import { DuneAnalyticsProvider } from './src/index.ts';
import { load } from 'https://deno.land/std/dotenv/mod.ts';
import { FetchedData } from './src/types.ts';

const env = await load();
const DUNE_API_KEY = env['DUNE_API_KEY'] || '';

const duneAnalyticsProvider = new DuneAnalyticsProvider(DUNE_API_KEY);

// these are the variables that need changing
const queryId = 2034748;
const addressFieldName = 'Winner'; //
const queryParameters = {}; //TODO add query parameters

const duneData = await duneAnalyticsProvider.dune(queryId);
const formattedData: FetchedData = {};

for (const row of duneData) {
  formattedData[row[addressFieldName]] = 1;
}
