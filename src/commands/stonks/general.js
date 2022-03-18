import { table } from 'table';
import chalk from 'chalk';
import finnhub from 'finnhub';
import { getWatchlist } from './watchlist.js';

const DEFAULT_SYMBOLS = ['AAPL', 'MSFT'];
const HEADERS = [
  'Stock',
  'Price',
  'Price (High)',
  'Price (Low)',
  'Change',
  'Change %',
];
const api_key = finnhub.ApiClient.instance.authentications['api_key'];
api_key.apiKey = 'test-api-key';
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

export function fetch(symbol) {
  symbol = symbol.toUpperCase();

  fetchQuote(symbol).then((quote) => {
    logTable([prepareData(quote)]);
  });
}

export function stonks() {
  const promises = [];
  const watchlist = getWatchlist();
  let symbols;

  if (!Array.isArray(watchlist) || !watchlist.length) {
    symbols = DEFAULT_SYMBOLS;
  } else {
    symbols = watchlist;
  }

  for (const symbol of symbols) {
    promises.push(fetchQuote(symbol));
  }

  Promise.all(promises).then((quotes) => {
    const data = quotes.map((quote) => prepareData(quote));

    logTable(data);
  });
}

// TODO: Fix colors of prefixes and suffixes
function prepareData(quote) {
  return [
    quote.symbol,
    `$${quote.c}`,
    `$${quote.h}`,
    `$${quote.l}`,
    `$${colorNumberMessage(quote.d.toFixed(2))}`,
    `${colorNumberMessage(quote.dp.toFixed(2))}%`,
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

function fetchQuote(symbol) {
  return new Promise((resolve, reject) => {
    finnhubClient.quote(symbol, (error, data) => {
      if (error || data.c === 0) {
        reject(error);
      }

      data.symbol = symbol;

      resolve(data);
    });
  });
}

function logTable(data) {
  data.unshift(HEADERS);

  console.log(table(data, tableConfig));
}
