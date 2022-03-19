import 'dotenv/config';
import { table } from 'table';
import finnhub from 'finnhub';
import { success, error } from '../../utils/colors.js';
import { getWatchlist } from './watchlist.js';

// Local constants
const defaultSymbols = ['AAPL', 'MSFT'];
const headers = [
  'Stock',
  'Price',
  'Price (High)',
  'Price (Low)',
  'Change',
  'Change %',
];

// Finnhub API client setup
const api_key = finnhub.ApiClient.instance.authentications['api_key'];
api_key.apiKey = process.env.FINNHUB_API_KEY;
const finnhubClient = new finnhub.DefaultApi();

// Table logging configuration
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

  fetchQuote(symbol)
    .then((quote) => {
      logTable([prepareData(quote)]);
    })
    .catch(() => {
      console.error(error('Something went wrong, please try again.'));
    });
}

export function stonks() {
  const promises = [];
  const watchlist = getWatchlist();
  let symbols;

  if (!Array.isArray(watchlist) || !watchlist.length) {
    symbols = defaultSymbols;
  } else {
    symbols = watchlist;
  }

  for (const symbol of symbols) {
    promises.push(fetchQuote(symbol));
  }

  Promise.all(promises)
    .then((quotes) => {
      const data = quotes.map((quote) => prepareData(quote));

      logTable(data);
    })
    .catch(() => {
      console.error(error('Something went wrong, please try again.'));
    });
}

function fetchQuote(symbol) {
  return new Promise((resolve, reject) => {
    finnhubClient.quote(symbol, (error, data) => {
      if (error || data.c === 0) {
        reject(error);
      }

      if (data !== null) data.symbol = symbol;

      resolve(data);
    });
  });
}

function prepareData(quote) {
  return [
    quote.symbol,
    `$${quote.c}`,
    `$${quote.h}`,
    `$${quote.l}`,
    colorNumberMessage(quote.d.toFixed(2), { prefix: '$' }),
    colorNumberMessage(quote.dp.toFixed(2), { suffix: '%' }),
  ];
}

function colorNumberMessage(number, { prefix = '', suffix = '' }) {
  if (number > 0) {
    return success(`${prefix}${number}${suffix}`);
  } else if (number < 0) {
    return error(`${prefix}${number}${suffix}`);
  } else {
    return `${prefix}${number}${suffix}`;
  }
}

function logTable(data) {
  data.unshift(headers);

  console.log(table(data, tableConfig));
}
