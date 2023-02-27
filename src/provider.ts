//import types
import {
  QueryParams,
  ExecutionState,
  ExecuteQuery,
  ExecutionStatusComplete,
  ExecutionResults,
  Rows,
  Row,
} from './types.ts';

export class DuneAnalyticsProvider {
  apikey: string;

  public constructor(apikey: string) {
    this.apikey = apikey;
  }

  public async dune(
    queryId: number,
    queryParams?: QueryParams
  ): Promise<Row[]> {
    const { execution_id, state } = await this.executeNewQuery(
      queryId,
      queryParams
    );

    console.log(
      `dune_execution_id is ${execution_id} intial state is ${state}`
    );

    await this.getExecutionStatus(execution_id);

    const results = await this.getResults(execution_id);

    const { rows }: Rows = results.result;

    return rows;
  }

  async getExecutionStatus(executionId: string): Promise<string> {
    while (true) {
      //TODO add a max timeout timer
      await new Promise((resolve) => setTimeout(resolve, 1000));

      const { state } = await this.getStatus(executionId);

      console.log(`Current state is ${state}`);

      if (state === ExecutionState.COMPLETED) {
        return state;
      } else if (
        state === ExecutionState.EXECUTING ||
        state === ExecutionState.PENDING
      ) {
        continue;
      } else {
        throw new Error(state);
      }
    }
  }

  //https://dune.com/docs/api/api-reference/execute-query-id/
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

  //https://dune.com/docs/api/api-reference/execution-status/
  async getStatus(executionId: string): Promise<ExecutionStatusComplete> {
    const getResponse = await this.getApiData<ExecutionStatusComplete>(
      `https://api.dune.com/api/v1/execution/${executionId}/status`
    );
    return getResponse as ExecutionStatusComplete;
  }

  //https://dune.com/docs/api/api-reference/execution-results/
  async getResults(executionId: string): Promise<ExecutionResults> {
    const getResponse = await this.getApiData<ExecutionResults>(
      `https://api.dune.com/api/v1/execution/${executionId}/results`
    );
    return getResponse as ExecutionResults;
  }

  async postApiData<T>(url: string, queryParams?: QueryParams): Promise<T> {
    console.log(`posting to ${url} with ${JSON.stringify(queryParams)}`);
    const postCall = await fetch(url, {
      method: 'POST',
      headers: {
        'x-dune-api-key': this.apikey,
      },
      body: JSON.stringify({ query_parameters: queryParams || {} }),
    });
    return this.apiRequestHandler<T>(Promise.resolve(postCall));
  }

  async getApiData<T>(url: string): Promise<T> {
    const getCall = await fetch(url, {
      method: 'GET',
      headers: {
        'x-dune-api-key': this.apikey,
      },
    });
    return this.apiRequestHandler<T>(Promise.resolve(getCall));
  }

  async apiRequestHandler<T>(responsePromise: Promise<Response>): Promise<T> {
    const apiResponse = await responsePromise
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          console.log(
            response,
            response.status,
            response.statusText,
            'check the request URL and request parameters'
          );
          throw new Error(response.statusText);
        }
      })
      .catch((error) => {
        throw new Error(`here 2: ${error}`);
      });
    if (apiResponse.error) {
      throw new Error(`here 3: ${apiResponse.error}`);
    }
    return apiResponse;
  }
}
