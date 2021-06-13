/*
  This file consists of all the application constants
*/

const STOCKS = [
  { ticker: "AAPL", quantity: 5 },
  { ticker: "AMZN", quantity: 10 },
  { ticker: "TSLA", quantity: 15 },
];

const BASE_URL = "https://financialmodelingprep.com/api/v3";

const RESOURCES = {
  OPERATION_SUCCESSFUL_TEXT:"Operation successfully completed. Please check the output folder.",
  API_ERROR_TEXT:"Error occured. Please try again.",
  API_BLANK_DATA_ERROR_TEXT:"No results found.",
  INVALID_DATA:"Invalid data",
  CSV_SUCCESS_TEXT:"CSV File generated successfully",
  CSV_GENERATION_ERROR_TEXT :"Error occurred while generating the CSV output file.",
  TICKER_HEADER:"Ticker",
  QUANTITY_HEADER:"Quantity",
  CURRENT_PRICE_HEADER:"Current Price",
  HIGH_PRICE_HEADER:"High",
  LOW_PRICE_HEADER:"Low",
  CURRENT_VALUE_HEADER:"Current Value",
  TOTAL_PRICE_HEADER:"Total"
}

module.exports = {
  STOCKS,
  BASE_URL,
  RESOURCES
}