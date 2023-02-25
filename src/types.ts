export interface QueryStatusResponse {
  execution_id: string;
  query_id: number;
  state:
    | 'QUERY_STATE_EXECUTING'
    | 'QUERY_STATE_PENDING'
    | 'QUERY_STATE_COMPLETED';
  submitted_at: string;
  expires_at: string;
  execution_started_at: string;
  execution_ended_at?: string;
  result_metadata?: {
    column_names: string[];
    result_set_bytes: number;
    total_row_count: number;
    datapoint_count: number;
    pending_time_millis: number;
    execution_time_millis: number;
  };
}

export type ExecuteQueryResponse = {
  execution_id: string;
  state: string;
};

export interface Rows {
  rows: Row[];
}

export interface Row {
  date: string;
  nounid: number;
  winner: string;
  paid: number;
  eth_price_usd: number;
  ma_last_7_auction: number;
  ma_last_30_auction: number;
  url: string;
  cumulative: number;
}

export interface QueryResult {
  execution_id: string;
  query_id: number;
  state: string;
  submitted_at: string;
  expires_at: string;
  execution_started_at: string;
  execution_ended_at: string;
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

//state = QUERY_STATE_PENDING, QUERY_STATE_EXECUTING, QUERY_STATE_COMPLETED, QUERY_STATE_FAILED,

export type ExecutionStatus = {
  execution_id: string;
  query_id: number;
  state: string;
  submitted_at: Date;
  expires_at: Date;
  execution_started_at: Date;
};

//QUERY_STATE_EXECUTING;
export type QueryResponse = {
  execution_id: string;
  query_id: number;
  state: string;
  submitted_at: Date;
  expires_at: Date;
  execution_started_at: Date;
};

//number should be BigNumberIsh - changed for testing
export type FetchedData = {
  [address: string]: number;
};

//can change state to a type

//https://dune.com/docs/api/api-reference/execution-results/#example-response
// ): Promise<FetchedData> {
