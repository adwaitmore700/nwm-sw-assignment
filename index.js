/*
    This file is the start of the application
*/

const dotenv = require("dotenv");
const { getStockMarketPortfolio } = require("./src/stockApiService");
const { STOCKS } = require("./src/constants");

//loading the .env file and setting the config
dotenv.config();

//This is the main method. Ideally, a user input would be read and stored in an array which will then be passed to the below method. Currently hardcoded data being passed
getStockMarketPortfolio(STOCKS);
