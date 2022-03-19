import { storageConfig } from '../../utils/storage.js';

export function setBaseCurrency(currency) {
  storageConfig.set('baseCurrency', currency.toUpperCase());

  console.log(`Base currency set to ${currency.toUpperCase()}`);
}

export function setWatchedCurrencies(currencies) {
  const watchedCurrencies = currencies
    .trim()
    .split(',')
    .map((currency) => currency.toUpperCase());

  storageConfig.set('watchedCurrencies', watchedCurrencies);

  console.log(`Watched currencies set to ${watchedCurrencies}`);
}
