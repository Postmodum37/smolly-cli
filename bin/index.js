#!/usr/bin/env node

import 'dotenv/config';
import { Command } from 'commander';
import { curry } from '../src/commands/curry/general.js';
import { stonks, fetch } from '../src/commands/stonks/general.js';
import { add, remove, logWatchlist } from '../src/commands/stonks/watchlist.js';

const program = new Command();

const stonksCommand = program
  .command('stonks')
  .description('Lists popular or watched stocks')
  .action(() => stonks());

stonksCommand
  .command('add')
  .argument('<symbol>', 'Symbol of the stock')
  .description('Adds a stock to the watchlist')
  .action((symbol) => add(symbol));
stonksCommand
  .command('remove')
  .argument('<symbol>', 'Symbol of the stock')
  .description('Removes a stock from the watchlist')
  .action((symbol) => remove(symbol));
stonksCommand
  .command('list')
  .description('Lists the watchlist')
  .action(() => logWatchlist());
stonksCommand
  .command('fetch')
  .argument('<symbol>', 'Symbol of the stock')
  .description('Fetches current data about the stock')
  .action((symbol) => fetch(symbol));

program
  .command('curry')
  .description('Get currency information')
  .action(() => curry());

program.parse();
