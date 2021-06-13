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
    
# Project structure
 
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
