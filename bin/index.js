#!/usr/bin/env node

import chalk from 'chalk';
import { Command } from 'commander';
import { stonks } from '../src/commands/stonks.js';
import { welcome } from '../src/commands/welcome.js';

const program = new Command();

console.log(chalk.blue('Smolly starting up!'));

// program.command('stonks').description('Just a test command').action(stonks);
program.command('welcome').description('Just a test command').action(welcome);

const stonksCommand = program.command('stonks');
stonksCommand
  .command('fetch')
  .argument('<symbol>', 'Symbol of the stock')
  .description('Fetches current data about the stock')
  .action((str) => {
    stonks(str);
  });

program.parse();
