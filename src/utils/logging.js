import chalk from 'chalk';

export function logError(message) {
  console.error(chalk.red(message));
}

export function logWarning(message) {
  console.warn(chalk.yellow(message));
}

export function logSuccess(message) {
  console.log(chalk.green(message));
}
