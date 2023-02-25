# Sismo Dune Client

Queries

- Nouns DAO https://dune.com/queries/2034748

Requirements
-[] handle execution responses (pending, executing, time out because data above 250mb)
-[] handle errors

Execution Status

- QUERY_STATE_PENDING - query execution is waiting for execution slot
- QUERY_STATE_EXECUTING - query is executing
- QUERY_STATE_FAILED - execution failed
- QUERY_STATE_COMPLETED - execution completed successfully
- QUERY_STATE_CANCELLED - execution cancelled by user
- QUERY_STATE_EXPIRED - query execution expired, result no longer available