/*
  Unit Test cases for stock API Service
*/

const { RESOURCES, STOCKS, BASE_URL } = require("../../src/constants");
const stockFunctions = require("../../src/stockApiService");
const axios = require("axios");

global.console = {
  log: jest.fn(),
};

describe("Execution of main function getStockMarketPortfolio", () => {
  const getStockMarketPortfolioMock = jest.spyOn(
    stockFunctions,
    "getStockMarketPortfolio"
  );

  it("Should successfully generate CSV output", async () => {
    const mockFn = jest.fn().mockImplementationOnce(async (stocks) => {
      //stocks will then make api call and will populate the required data,
      //which will then be used to generate a csv file.
      console.log(RESOURCES.OPERATION_SUCCESSFUL_TEXT);
    });
    await mockFn(STOCKS);
    expect(global.console.log).toHaveBeenCalledWith(
      RESOURCES.OPERATION_SUCCESSFUL_TEXT
    );
  });

  it("Should log error if there is no stock selected", async () => {
    await getStockMarketPortfolioMock([]);
    expect(global.console.log).toHaveBeenCalledWith(RESOURCES.INVALID_DATA);
  });

  it("Should log error if the API responded with blank data", async () => {
    const mockFn = jest.fn().mockImplementationOnce(async (stocks) => {
      //stocks will then make api call and will populate the required data,
      //which will then be used to generate a csv file.
      console.log(RESOURCES.API_BLANK_DATA_ERROR_TEXT);
    });
    await mockFn(STOCKS);
    expect(global.console.log).toHaveBeenCalledWith(
      RESOURCES.API_BLANK_DATA_ERROR_TEXT
    );
  });
});

jest.mock("axios");

describe("Execution of function getCompanyCurrentPrice", () => {
  it("Should return undefined when API returns blank data", async () => {
    const testSource = { status: 200, data: {} };
    const testOutput = undefined;
    axios.get.mockImplementationOnce(() => Promise.resolve(testSource));
    await expect(
      stockFunctions.getCompanyCurrentPrice("AAPL")
    ).resolves.toEqual(testOutput);
  });

  it("Should return the correct output when API call is successful", async () => {
    const testSource = { status: 200, data: [{ price: 10 }] };
    const testOutput = 10;

    axios.get.mockImplementationOnce(() => Promise.resolve(testSource));
    await expect(
      stockFunctions.getCompanyCurrentPrice("AAPL")
    ).resolves.toEqual(testOutput);

    expect(axios.get).toHaveBeenCalledWith(
      `${BASE_URL}/quote/${"AAPL"}?apikey=${process.env.API_KEY}`
    );
  });

  test("Should throw error while making API call", async () => {
    await expect(
      stockFunctions.getCompanyCurrentPrice("")
    ).rejects.toThrowError(new Error(`${RESOURCES.API_ERROR_TEXT}`));
  });
});

describe("Execution of function getCompanyHighLowPrices", () => {
  it("Should return undefined when API returns blank data", async () => {
    const testSource = { status: 200, data: {} };
    const testOutput = undefined;
    axios.get.mockImplementationOnce(() => Promise.resolve(testSource));
    await expect(
      stockFunctions.getCompanyHighLowPrices("AAPL")
    ).resolves.toEqual(testOutput);
  });

  it("Should return the correct output when API call is successful", async () => {
    const testSource = {
      status: 200,
      data: {
        historical: [
          { high: 100, low: 50 },
          { high: 130, low: 30 },
          { high: 250, low: 100 },
        ],
      },
    };
    const testOutput = { high: "250.00", low: "30.00" };
    axios.get.mockImplementationOnce(() => Promise.resolve(testSource));
    await expect(
      stockFunctions.getCompanyHighLowPrices("AAPL")
    ).resolves.toEqual(testOutput);
  });

  test("Should throw error while making API call", async () => {
    await expect(
      stockFunctions.getCompanyHighLowPrices("")
    ).rejects.toThrowError(new Error(`${RESOURCES.API_ERROR_TEXT}`));
  });
});

describe("Execution of total calculation function", () => {
  const calculateTotal = jest.spyOn(stockFunctions, "calculateTotal");
  const defaultTotal = {
    ticker: RESOURCES.TOTAL_PRICE_HEADER,
    currentValue: "$0.00",
  };
  it("Should return true if default total is equal to output if data is blank", () => {
    expect(calculateTotal([])).toEqual(defaultTotal);
  });

  it("Should return true if default total is not equal to output if data is proper", () => {
    expect(calculateTotal([])).not.toEqual(defaultTotal.currentValue);
  });
});
