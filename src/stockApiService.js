/*
  This file consists of the method which call external API to fetch the stock related details and then generate the CSV output file
*/

const { default: axios } = require("axios");
const { BASE_URL, RESOURCES } = require("./constants");
const generateCSVOutput = require("./utilFunctions");

/*
  Gets the Stock Market Portfolio of the person
  @stockList - The list of the selected stocks with its quantity
  @return null
*/
const getStockMarketPortfolio = async (stockList) => {
  try {
    let output = [];
    for (let i = 0; i < stockList.length; i++) {
      let stock = stockList[i];
      let currentPrice = await getCompanyCurrentPrice(stock.ticker);
      let highLowPrice = await getCompanyHighLowPrices(stock.ticker);
      if (currentPrice && highLowPrice) {
        let resultStock = {
          ticker: stock.ticker,
          quantity: stock.quantity,
          currentPrice: `$${currentPrice}`,
          high: `$${highLowPrice.high}`,
          low: `$${highLowPrice.low}`,
          currentValue: (stock.quantity * currentPrice).toFixed(2),
        };
        output.push(resultStock);
      } else {
        console.log(RESOURCES.API_ERROR_TEXT);
      }
    }
    output.push(calculateTotal(output));
    if (await generateCSVOutput(output)) {
      console.log(RESOURCES.CSV_SUCCESS_TEXT);
    } else {
      console.log(RESOURCES.CSV_GENERATION_ERROR_TEXT);
    }
  } catch (error) {
    console.log(error);
  }
};

/*
  This method fetches all the historical data of the given company/stock from 2019-01-01 till now
  @ticker - the stock
  @return Result with Highest and Lowest Price of the stock in the given period : List
*/
const getCompanyHighLowPrices = async (ticker) => {
  let result;
  try {
    let today = new Date();
    let endDate = `${today.getFullYear()}-${today.getDate()}-${
      today.getMonth() + 1
    }`;
    let startDate = "2019-01-01";
    const response = await axios.get(
      `${BASE_URL}/historical-price-full/${ticker}?from=${startDate}&to=${endDate}&apikey=${process.env.API_KEY}`
    );
    if (response.status == 200) {
      let high = 0;
      let low = Number.MAX_VALUE;
      response.data.historical.forEach((item) => {
        high = Math.max(item.high, high);
        low = Math.min(item.low, low);
      });
      result = { high: high.toFixed(2), low: low.toFixed(2) };
    }
  } catch (error) {
    //Throw an error that will be caught by its caller try-catch block.
    //Error will occur if there is a network failure, or api failure
    throw new Error(`${RESOURCES.API_ERROR_TEXT} --- ${JSON.stringify(error)}`);
  }
  return result;
};

/*
  This method fetches the current price of the selected company
  @ticker - the stock
  @return current price of the stock : Number
*/
const getCompanyCurrentPrice = async (ticker) => {
  let result;
  try {
    const response = await axios.get(
      `${BASE_URL}/quote/${ticker}?apikey=${process.env.API_KEY}`
    );
    if (response.status == 200) {
      result = response.data[0].price;
    }
  } catch (error) {
    //Throw an error that will be caught by its caller try-catch block.
    //Error will occur if there is a network failure, or api failure
    throw new Error(`${RESOURCES.API_ERROR_TEXT} --- ${JSON.stringify(error)}`);
  }
  return result;
};

/*
  This method calculates the total current value of the stocks purchased
  @data - List of stocks purchased
  @returns total : Number
*/
const calculateTotal = (data) => {
  let total = { ticker: RESOURCES.TOTAL_PRICE_HEADER, currentValue: 0 };
  data.forEach((item) => {
    total.currentValue += Number(item.currentValue);
    item.currentValue = `$${item.currentValue}`;
  });
  total.currentValue = `$${total.currentValue.toFixed(2)}`;
  return total;
};

module.exports = getStockMarketPortfolio;
