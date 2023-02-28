// test scenarios
// queryid doesn't exist
// dune api key is invalid
// dune api is missing
// no results returned
// wrong query parameters
// massive query

// all gas fees: https://dune.com/queries/64430/
// Date format: 2022-05-04 00:00:00
//

// this should result in 400 error
//const queryId = 2034748; //2034748 nouns  //1215383 cow

// const queryParameters: QueryParams = {
//   TextField: 'Plain Text',
//   NumberField: '3.1415926535',
//   DateField: '2022-05-04 00:00:00',
//   ListField: 'Option 1',
// };

// ## this should result in query state completed
// const queryId = 1215383; //2034748 nouns  //1215383 cow
// const addressFieldName = 'Winner';

// //TODO add query parameters as strings
// // const queryParameters: QueryParams = {};
// const queryParameters: QueryParams = {
//   TextField: 'Plain Text',
//   NumberField: '3.1415926535',
//   DateField: '2022-05-04 00:00:00',
//   ListField: 'Option 1',
// };

// [
//   {
//     date_field: "2022-05-04T00:00:00",
//     list_field: "Option 1",
//     number_field: 3.1415926535,
//     text_field: "Plain Text"
//   }
// ]

// if formatted data key is 0, return error (check the address field matches the address field in Dune) { undefined: 1 }
// for (const row of duneData) {
//   formattedData[row[addressFieldName]] = 1;
// }

// console.log(formattedData);
