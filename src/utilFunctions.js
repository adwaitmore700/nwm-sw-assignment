const fs = require('fs');
const createCsvWriter = require("csv-writer").createObjectCsvWriter;

/*
  This util function generates a CSV file in the project folder
  @dataList - List of the data (the selected stocks with their total) that needs to be mapped to the CSV file
  @return operation status : Boolean
*/
const generateCSVOutput = async (dataList) => {
    if(!fs.existsSync('output')){
      fs.mkdirSync('output');
    }
    if(dataList && dataList.length > 0){
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
      await csvWriter.writeRecords(dataList);
      return true;
    }
    return false;
  };

module.exports = generateCSVOutput;