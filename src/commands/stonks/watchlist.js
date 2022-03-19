import chalk from 'chalk';
import { storageConfig } from '../../utils/storage.js';

export function add(symbol) {
  symbol = symbol.toUpperCase();
  console.log(`Adding ${symbol} to the watchlist`);

  storageConfig.set('watchlist', [...new Set([...getWatchlist(), symbol])]);

  logWatchlist();
}

export function remove(symbol) {
  symbol = symbol.toUpperCase();
  console.log(`Removing ${symbol} from the watchlist`);

  storageConfig.set(
    'watchlist',
    getWatchlist().filter((item) => item !== symbol)
  );

  logWatchlist();
}

export function logWatchlist() {
  console.log(chalk.bold('Your current watchlist:'));

  for (const [index, value] of getWatchlist().entries()) {
    console.log(`${index + 1}: ${value}`);
  }
}

export function getWatchlist() {
  return storageConfig.get('watchlist') || [];
}
