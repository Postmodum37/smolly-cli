// import axios from 'axios';

// const params = {
//   access_key: 'e50259a899f458307d580c2b1bab0159',
//   symbols: 'GME,AMC,AAPL,TSLA,NFLX,MSFT',
// };

import { table } from 'table';
import chalk from 'chalk';
import finnhub from 'finnhub';
import { logError } from '../utils/logging.js';

const api_key = finnhub.ApiClient.instance.authentications['api_key'];
api_key.apiKey = 'api-key-here';
const finnhubClient = new finnhub.DefaultApi();
const tableConfig = {
  columns: [
    { alignment: 'right' },
    { alignment: 'right' },
    { alignment: 'right' },
    { alignment: 'right' },
    { alignment: 'right' },
    { alignment: 'right' },
  ],
};

export function stonks(symbol) {
  const upperCasedSymbol = symbol.toUpperCase();

  finnhubClient.quote(upperCasedSymbol, (error, data) => {
    console.log(data);
    console.log(error);

    if (error || data.c === 0) {
      logError('Something went wrong, please try again later.');
      return;
    }

    console.log(table(prepareData(data, upperCasedSymbol), tableConfig));
  });
}

function prepareData(data, symbol) {
  return [
    ['Stock', 'Price', 'Price (High)', 'Price (Low)', 'Change', 'Change %'],
    [
      symbol,
      `$${data.c}`,
      `$${data.h}`,
      `$${data.l}`,
      `$${colorNumberMessage(data.d.toFixed(2))}`,
      `${colorNumberMessage(data.dp.toFixed(2))}%`,
    ],
  ];
}

function colorNumberMessage(number) {
  if (number > 0) {
    return chalk.green(number);
  } else if (number < 0) {
    return chalk.red(number);
  } else {
    return chalk.white(number);
  }
}
