import { DuneAnalyticsProvider } from './src/index.ts';
import { load } from 'https://deno.land/std/dotenv/mod.ts';
import { FetchedData, QueryParams } from './src/types.ts';
import { DuneErrorFactory } from './src/errors.ts';

const env = await load();
const DUNE_API_KEY = env['DUNE_API_KEY'] || '';

const duneAnalyticsProvider = new DuneAnalyticsProvider(DUNE_API_KEY);

// these are the variables that need changing
const queryId = 2034748; //2034748 nouns  //1215383 cow
const queryParameters: QueryParams = {};

async function getDuneData() {
  const dailyAuctionData = await duneAnalyticsProvider.executeQuery(
    queryId,
    queryParameters
  );

  const duneEthAddressColumn = 'Winner 1';
  const formattedData: FetchedData = {};

  for (const row of dailyAuctionData) {
    formattedData[row[duneEthAddressColumn]] = 1;
  }

  if (formattedData.undefined) {
    throw DuneErrorFactory.createError(102);
  }

  console.log(`formattedData: ${JSON.stringify(formattedData)}`);
}

getDuneData().catch((e) => {
  console.log(`here with the error! ${e}`);
});
