#!/usr/bin/env node

import { Command } from 'commander';
import fs from 'fs';

const program = new Command();

program.name('sed-win').description('sed for Windows').version('1.0.1');

// Handle sed-like commands
program
  .option('-e <expression...>', 'sed expressions to apply')
  .option('-i', 'edit file in place')
  .argument('<file>', 'input file')
  .action((file, options) => {
    console.log('file', file);
    console.log('options', options);
    // const { e: expressions, i: inPlace } = options;
  });

// program
//   .command('now')
//   .description('Show current date and time')
//   .action(() => {
//     console.log('now ' + new Date());
//   });

// console.log('process.argv', process.argv);
program.parse(process.argv);

if (!process.argv.slice(2).length) {
  program.outputHelp();
  console.log(`no param`);
}
