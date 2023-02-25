//import types
import {
  QueryStatusResponse,
  ExecuteQueryResponse,
  QueryResult,
  Row,
  Rows,
  FetchedData,
} from './types.ts';

export class DuneAnalyticsProvider {
  apikey: string;

  constructor(apikey: string) {
    this.apikey = apikey;
  }

  // 1 refresh - const { execution_id: jobID } = await this.execute(queryID, parameters);
  async dune<T extends Rows>(queryId: number): Promise<Row[]> {
    const { execution_id, state } = await this.postQuery(queryId);
    //check responses for errors
    console.log(
      `dune_execution_id is ${execution_id} intial state is ${state}`
    );

    const finalState = await this.stateChecker(execution_id);

    console.log(`final state is ${finalState}`);

    const results = await this.getResults(execution_id);
    const { rows }: Rows = results.result;
    return rows;
  }

  async stateChecker(executionId: string): Promise<string> {
    while (true) {
      await new Promise((resolve) => setTimeout(resolve, 5000));

      const { state } = await this.getStatus(executionId);

      console.log(`Current state is ${state}`);

      if (state === 'QUERY_STATE_COMPLETED') {
        return state;
      }
    }
  }

  // 2 execute :Promise<ExecuteQueryResponse> (this is a middle ground between the API Caller receiving a Response and the dune query needing an ExecuteQueryResponse)
  // return response as ExecuteQueryResponse
  async postQuery(queryId: number): Promise<ExecuteQueryResponse> {
    const postResponse = await this.postCaller<ExecuteQueryResponse>(
      `https://api.dune.com/api/v1/query/${queryId}/execute`
    );
    return postResponse as ExecuteQueryResponse;
  }

  async getStatus(executionId: string): Promise<QueryStatusResponse> {
    const getResponse = await this.getCaller<QueryStatusResponse>(
      `https://api.dune.com/api/v1/execution/${executionId}/status`
    );
    return getResponse as QueryStatusResponse;
  }

  async getResults(executionId: string): Promise<QueryResult> {
    const getResponse = await this.getCaller<QueryResult>(
      `https://api.dune.com/api/v1/execution/${executionId}/results`
    );
    return getResponse as QueryResult;
  }

  // 3 make the post request, return the promise the handler
  private async postCaller<T>(url: string): Promise<T> {
    const postCall = await fetch(url, {
      method: 'POST',
      headers: {
        'x-dune-api-key': this.apikey,
      },
    });
    return this.requestHandler<T>(Promise.resolve(postCall));
  }

  private async getCaller<T>(url: string): Promise<T> {
    const getCall = await fetch(url, {
      method: 'GET',
      headers: {
        'x-dune-api-key': this.apikey,
      },
    });
    return this.requestHandler<T>(Promise.resolve(getCall));
  }

  async requestHandler<T>(responsePromise: Promise<Response>): Promise<T> {
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
