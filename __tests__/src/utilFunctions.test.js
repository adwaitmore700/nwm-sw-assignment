/*
  Unit Test cases for utility functions
*/


const { RESOURCES } = require("../../src/constants");
const utilFunctions = require("../../src/utilFunctions");

global.console = {
  log: jest.fn(),
};

test("Should throw error while making API call", async () => {
  await expect(utilFunctions.generateCSVOutput()).rejects.toThrowError(
    new Error(RESOURCES.CSV_GENERATION_ERROR_TEXT)
  );
});

test("Should log successful message on writing", async () => {
  const generateCSVOutput = jest.spyOn(utilFunctions, "generateCSVOutput");
  const mockData = [
    {
      ticker: "TSLA",
      quantity: 10,
      currentPrice: "$100.00",
      high: "$80.00",
      low: "30.00$",
      currentValue: "$1000.00$",
    },
  ];
  await generateCSVOutput(mockData);
  expect(global.console.log).toHaveBeenCalledWith(RESOURCES.CSV_SUCCESS_TEXT);
});
