# Project
### nwm-sw-assignment

This is a Node JS script to fetch stock data and generate a personal stock portfolio.
Output is generated in the form of a CSV file

# Installation

## Clone the project

    git clone https://github.com/adwaitmore700/nwm-sw-assignment.git

## Install node dependencies

    Open Terminal / PowerShell and navigate to the project folder

### Using Yarn

    $ yarn

### Using NPM

    $ npm install
    
# Running the project

## Getting the API key
### The script fetches the required data from an open API (with some API calls limit). The API key is not included and you need to get one from the API provider. 

### Steps to get an API key
    1. Register at https://financialmodelingprep.com/register
    2. Complete the email verification
    3. Login with your credentials
    4. Go to https://financialmodelingprep.com/developer/docs/api-keys
    5. Copy the API key and Paste it in the .env file of the project

### Using Yarn

    $ yarn start

### Using NPM

    $ npm start

# Testing

The test framework used here is Jest (For more info : https://jestjs.io/docs/getting-started)

### Using Yarn

    $ yarn test

### Using NPM

    $ npm test

# Project Structure
 
- Root
  - __tests__                                                   ( All test cases are written here )
    - src
      - stockApiService.test.js
      - utilFunctions.test.js
    - index.test.js
  - output                                                      ( Output generated in this folder. Folder will be created locally )
    - portfolio.csv
  - src                                                         ( Main functionality driven files in this folder )
    - constant.js
    - stockApiService.js
    - utilFunctions.js
  - .env.example                                                ( Example to consume environment variables )
  - index.js                                                    ( Starting point of the script )

# Additional Information

### The script runs on three stocks at the moment. These stocks are hardcoded values. You can change these hardcoded values as per your requirements. They are located in the constants.js file. You can add as many stocks as you want and get the stock portfolio generated. Also, the high and low prices of the stocks are calculated wthin a certain period of time which is hardcoded in the stockApiService.js file in the api function call. You can also change that value. Make sure that the time period doesn't exceed 10 years as the API only provides data for the past 10 years.
