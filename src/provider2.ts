import {
  QueryParams,
  ExecutionState,
  ExecuteQuery,
  ExecutionStatusComplete,
  ExecutionResults,
  Rows,
  Row,
  // ErrorDictionary,
} from './types.ts';
import { DuneErrorFactory } from './errors.ts';

export class DuneAnalyticsProvider2 {
  apikey: string;

  public constructor(apikey: string) {
    this.apikey = apikey;
  }

  public async execute<T>(
    queryId: number,
    queryParams?: QueryParams
  ): Promise<T | string> {
    const apiPromise = await this.executeNewQuery(queryId, queryParams);
    const response = await apiPromise;
    const { execution_id = '', state = '', error = '' } = apiPromise;
    if (error) {
      console.log(`error is ${error}`);
      return error;
    } else {
      return { execution_id: execution_id, state: state } as T;
    }

    // const status: ExecutionState = { execution_id: execution_id, state: state };

    // return status;
  }

  async executeNewQuery(
    queryId: number,
    queryParams?: QueryParams
  ): Promise<ExecuteQuery> {
    const postResponse = await this.postApiData<ExecuteQuery>(
      `https://api.dune.com/api/v1/query/${queryId}/execute`,
      queryParams
    );
    return postResponse as ExecuteQuery;
  }

  async postApiData<T>(url: string, queryParams?: QueryParams): Promise<T> {
    console.log(`posting to ${url} with ${JSON.stringify(queryParams)}`);
    const postResponse = fetch(url, {
      method: 'POST',
      headers: {
        'x-dune-api-key': this.apikey,
      },
      body: JSON.stringify({ query_parameters: queryParams || {} }),
    });
    return this.apiRequestHandler<T>(postResponse);
  }

  async apiRequestHandler<T>(responsePromise: Promise<Response>): Promise<T> {
    const apiResponse = await responsePromise
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
      })
      .catch((e) => {
        console.log(`e ----------->>>>>>${e}`);
        throw DuneErrorFactory.createError(e.response.status, e.response.url);
      });
    // console.log(`apiResponse ----------->>>>>>${JSON.stringify(apiResponse)}`);
    // if (apiResponse.error) {
    //   throw DuneErrorFactory.createError(102, apiResponse.error as string);
    // }
    return apiResponse;
  }
}
