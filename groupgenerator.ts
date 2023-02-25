import { DuneAnalyticsProvider } from './src/index.ts';
import { load } from 'https://deno.land/std/dotenv/mod.ts';
import { FetchedData } from './src/types.ts';

const env = await load();
const DUNE_API_KEY = env['DUNE_API_KEY'] || '';

const duneAnalyticsProvider = new DuneAnalyticsProvider(DUNE_API_KEY);

// these are the variables that need changing
const queryId = 2034748;
const addressFieldName = 'Winner';

// const dunePost = await duneAnalyticsProvider.dune(queryId);
const duneData: FetchedData = {};
const rows = await duneAnalyticsProvider.dune(queryId);

for (const row of rows) {
  duneData[row[addressFieldName]] = 1;
}