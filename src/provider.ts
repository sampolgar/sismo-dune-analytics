//import types
import {
  QueryStatusResponse,
  ExecuteQueryResponse,
  QueryResult,
  Row,
  Rows,
  ExecutionState,
} from './types.ts';

export class DuneAnalyticsProvider {
  apikey: string;

  constructor(apikey: string) {
    this.apikey = apikey;
  }

  async dune(queryId: number): Promise<Row[]> {
    const { execution_id, state } = await this.executeNewQuery(queryId);

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
      await new Promise((resolve) => setTimeout(resolve, 5000));

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

  async executeNewQuery(queryId: number): Promise<ExecuteQueryResponse> {
    const postResponse = await this.postApiData<ExecuteQueryResponse>(
      `https://api.dune.com/api/v1/query/${queryId}/execute`
    );
    return postResponse as ExecuteQueryResponse;
  }

  async getStatus(executionId: string): Promise<QueryStatusResponse> {
    const getResponse = await this.getApiData<QueryStatusResponse>(
      `https://api.dune.com/api/v1/execution/${executionId}/status`
    );
    return getResponse as QueryStatusResponse;
  }

  async getResults(executionId: string): Promise<QueryResult> {
    const getResponse = await this.getApiData<QueryResult>(
      `https://api.dune.com/api/v1/execution/${executionId}/results`
    );
    return getResponse as QueryResult;
  }

  private async postApiData<T>(url: string): Promise<T> {
    const postCall = await fetch(url, {
      method: 'POST',
      headers: {
        'x-dune-api-key': this.apikey,
      },
    });
    return this.apiRequestHandler<T>(Promise.resolve(postCall));
  }

  private async getApiData<T>(url: string): Promise<T> {
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
          throw new Error(response.statusText);
        }
      })
      .catch((error) => {
        throw new Error(error);
      });
    if (apiResponse.error) {
      throw new Error(apiResponse.error);
    }
    return apiResponse;
  }
}
