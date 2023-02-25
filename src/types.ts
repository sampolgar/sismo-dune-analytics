export enum ExecutionState {
  PENDING = 'QUERY_STATE_PENDING',
  EXECUTING = 'QUERY_STATE_EXECUTING',
  FAILED = 'QUERY_STATE_FAILED',
  COMPLETED = 'QUERY_STATE_COMPLETED',
  CANCELLED = 'QUERY_STATE_CANCELLED',
  EXPIRED = 'QUERY_STATE_EXPIRED',
}

//response from 1st call /api/v1/query/2034748/execute
export type ExecuteQueryResponse = {
  execution_id: string;
  state: ExecutionState;
};

//response from 2nd call /api/v1/execution/01GT5F65285F7SVED2SWJP2GP0/status
export type ExecutionStatus = {
  execution_id: string;
  query_id: number;
  state: ExecutionState;
  submitted_at: Date;
  expires_at: Date;
  execution_started_at: Date;
};

//response from 2nd call /api/v1/execution/01GT5F65285F7SVED2SWJP2GP0/status
export interface QueryStatusResponse {
  execution_id: string;
  query_id: number;
  state: ExecutionState;
  submitted_at: Date;
  expires_at: Date;
  execution_started_at: Date;
  execution_ended_at?: Date;
  result_metadata?: {
    column_names: string[];
    result_set_bytes: number;
    total_row_count: number;
    datapoint_count: number;
    pending_time_millis: number;
    execution_time_millis: number;
  };
}

//when execution status is completed
export interface QueryResult {
  execution_id: string;
  query_id: number;
  state: ExecutionState.COMPLETED;
  submitted_at: Date;
  expires_at: Date;
  execution_started_at: Date;
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

//number should be BigNumberIsh - changed for testing
export type FetchedData = {
  [address: string]: number;
};
