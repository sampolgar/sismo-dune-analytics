//import types
import { QueryResult, ExecutionResponse } from './types.ts';

export class DuneAnalyticsProvider {
  apikey: string;

  constructor(apikey: string) {
    this.apikey = apikey;
  }

  // 1 refresh - const { execution_id: jobID } = await this.execute(queryID, parameters);
  async dune(queryId: number): Promise<string> {
    const { execution_id: dune_execution_id } = await this.postQuery(queryId);
    //check responses for errors
    console.log(`dune_execution_id is ${dune_execution_id}`);
    //
    // Check if the query is already completed
    // if not, then keep polling it every 5 seconds
    const { execution_id: currentDuneExecutionId}  = await this.getQuery(dune_execution_id);
    
    return dune_execution_id;
  }

  // async dune(queryId: number): Promise<string> {
  //   const { execution_id: dune_execution_id } = await this.query(queryId);
  //   console.log(`dune_execution_id is ${dune_execution_id}`);

  //   // Check if the query is already completed
  //   if (dune_execution_id === 'QUERY_STATE_COMPLETED') {
  //     return dune_execution_id;
  //   }

  //   // If the query is still pending or executing, wait for a few seconds and query again
  //   await new Promise((resolve) => setTimeout(resolve, 5000)); // wait for 5 seconds
  //   return await this.dune(queryId); // recursively call the dune function
  // }

  // 2 execute :Promise<ExecutionResponse> (this is a middle ground between the API Caller receiving a Response and the dune query needing an ExecutionResponse)
  // return response as ExecutionResponse
  async postQuery(queryId: number): Promise<ExecutionResponse> {
    const postResponse = await this.postCaller<ExecutionResponse>(
      `https://api.dune.com/api/v1/query/${queryId}/execute`
    );
    return postResponse as ExecutionResponse;
  }

  // 3 make the post request, return the promise the handler
  private async postCaller<T>(url: string): Promise<T> {
    const postCall = await fetch(url, {
      method: 'POST',
      headers: {
        'x-dune-api-key': this.apikey,
      },
    });
    return this.postHandler<T>(Promise.resolve(postCall));
  }

  async postHandler<T>(responsePromise: Promise<Response>): Promise<T> {
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

// 0
//instantiate a dune class object and send the API key in there
// execute the query with the queryid

// 3 _post sends makes the post request, sends the Promise<Response>

// 4 responseHandler receives the Promise, returns a Promise<T>. Handle errors

//when making
