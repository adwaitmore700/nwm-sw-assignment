const fs = require("fs");
const createCsvWriter = require("csv-writer").createObjectCsvWriter;
const { RESOURCES } = require("./constants");
/*
  This util function generates a CSV file in the project folder
  @dataList - List of the data (the selected stocks with their total) that needs to be mapped to the CSV file
  @return operation status : Boolean
*/
const generateCSVOutput = async (dataList) => {
  try {
    if (dataList && Array.isArray(dataList) && dataList.length > 0) {
      if (!fs.existsSync("output")) {
        fs.mkdirSync("output");
      }
      const csvWriter = createCsvWriter({
        path: "output/portfolio.csv",
        header: [
          { id: "ticker", title: "Ticker" },
          { id: "quantity", title: "Quantity" },
          { id: "currentPrice", title: "Current Price" },
          { id: "high", title: "High" },
          { id: "low", title: "Low" },
          { id: "currentValue", title: "Current Value" },
        ],
      });
      try {
        await csvWriter.writeRecords(dataList);
        console.log(RESOURCES.CSV_SUCCESS_TEXT);
      } catch (error) {
        throw new Error(RESOURCES.CSV_GENERATION_ERROR_TEXT);
      }
    } else {
      throw new Error(RESOURCES.CSV_GENERATION_ERROR_TEXT);
    }
  } catch (error) {
    throw new Error(error.message);
  }
};

module.exports = { generateCSVOutput };
