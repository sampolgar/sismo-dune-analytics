//import types
import { QueryStatusResponse, ExecuteQueryResponse } from './types.ts';

export class DuneAnalyticsProvider {
  apikey: string;

  constructor(apikey: string) {
    this.apikey = apikey;
  }

  // 1 refresh - const { execution_id: jobID } = await this.execute(queryID, parameters);
  async dune(queryId: number): Promise<string> {
    const { execution_id: initialDuneExecutionId, state: initialState } =
      await this.postQuery(queryId);
    //check responses for errors
    console.log(
      `dune_execution_id is ${initialDuneExecutionId} intial state is ${initialState}`
    );
    // Check if the query is already completed
    // if not, then keep polling it every 5 seconds
    while (true) {
      await new Promise((resolve) => setTimeout(resolve, 5000));
      const { state, execution_id } = await this.getQuery(
        initialDuneExecutionId
      );
      
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

  async getQuery(executionId: string): Promise<QueryStatusResponse> {
    const getResponse = await this.getCaller<QueryStatusResponse>(
      `https://api.dune.com/api/v1/execution/${executionId}/status`
    );
    return getResponse as QueryStatusResponse;
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