#!/usr/bin/env node

import chalk from 'chalk';
import { Command } from 'commander';
import stonks from '../src/commands/stonks.js';

const log = console.log;
const program = new Command();

console.log(chalk.blue("Smolly starting up!"));

program.command('stonks').description('Just a test command').action(stonks)

program.parse();