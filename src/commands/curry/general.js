import axios from 'axios';
import chalk from 'chalk';
import { table } from 'table';
import { fullDate } from '../../utils/formatting.js';

const baseUrl = `https://v6.exchangerate-api.com/v6/${process.env.EXCHANGERATE_API_KEY}`;
const defaultCurrencies = ['EUR', 'PLN'];
const defaultBaseCurrency = 'USD';

export function curry() {
  axios
    .get(baseUrl + `/latest/${defaultBaseCurrency}`, {
      validateStatus: (status) => status === 200,
    })
    .then(({ data }) => {
      logCurrentData(data);
    })
    .catch((error) => {
      console.error(error);
    });
}

function logCurrentData(data) {
  console.log(
    `Last updated: ${chalk.bold(fullDate(data.time_last_update_utc))}`
  );
  console.log(
    `Next update: ${chalk.bold(fullDate(data.time_next_update_utc))}`
  );
  console.log(`Base currency: ${chalk.bold(data.base_code)}`);

  const tableData = defaultCurrencies.map((symbol) => {
    return [symbol, chalk.bold(data.conversion_rates[symbol])];
  });

  console.log(table(tableData));
}
