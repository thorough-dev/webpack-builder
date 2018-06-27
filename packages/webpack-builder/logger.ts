import chalk from 'chalk';

export function log(...pieces) {
  console.log(chalk`{yellow.bold [webpack-builder]}`, ...pieces);
}
