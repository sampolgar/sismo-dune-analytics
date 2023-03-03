export enum ExecutionState {
  PENDING = 'QUERY_STATE_PENDING',
  EXECUTING = 'QUERY_STATE_EXECUTING',
  FAILED = 'QUERY_STATE_FAILED',
  COMPLETED = 'QUERY_STATE_COMPLETED',
  CANCELLED = 'QUERY_STATE_CANCELLED',
  EXPIRED = 'QUERY_STATE_EXPIRED',
}

// export interface ErrorDictionary {
//   [key: number]: string;
// }

export type QueryParams = Record<string, string>;

//response from 1st call /api/v1/query/2034748/execute
export type ExecuteQuery = {
  execution_id: string;
  state: ExecutionState;
};

//response from 2nd call /api/v1/execution/{{executionid}}/status
export interface ExecutionStatus extends ExecuteQuery {
  query_id: number;
  submitted_at: Date;
  expires_at: Date;
  execution_started_at: Date;
  execution_ended_at?: Date;
}

//response from 2nd call /api/v1/execution/{{executionid}}/status
export interface ExecutionStatusComplete extends ExecutionStatus {
  result_metadata?: {
    column_names: string[];
    result_set_bytes: number;
    total_row_count: number;
    datapoint_count: number;
    pending_time_millis: number;
    execution_time_millis: number;
  };
}

//when execution status is completed /api/v1/execution/{{executionid}}/results
export interface ExecutionResults extends ExecutionStatus {
  execution_ended_at: Date;
  result: {
    metadata: {
      column_names: string[];
      result_set_bytes: number;
      total_row_count: number;
      datapoint_count: number;
      pending_time_millis: number;
      execution_time_millis: number;
    };
    rows: Row[];
  };
}

export interface Rows {
  rows: Row[];
}

//dynamic Row type only interested in the address field
export interface Row {
  addressField: string;
  [key: string]: any;
}

export interface ExecutionError {
  error: string;
}

//number should be BigNumberIsh - changed for testing
export type FetchedData = {
  [address: string]: number;
};
