#!/usr/bin/env node

import { Command } from 'commander';
import { dsed } from '../lib/dsed.js';

const program = new Command();

program.name('sed-win').description('sed for Windows').version('1.0.1');

// Handle sed-like commands
program
  .option('-e <expression...>', 'sed expressions to apply')
  .option('-i', 'edit file in place')
  .option('-d', 'debug mode')
  .option('-v', 'enable variable such as $utcnow')
  .argument('[file...]', 'input file')
  .action(async (file, options) => {
    const { e, i, d, v } = options;
    const logd = (...args: any[]) => {
      if (d) {
        console.log(...args);
      }
    };
    logd('file', file);
    logd('options', options);
    let filepath;
    let e2 = e;
    if (!file || file.length === 0) {
      // logd('file empty');
      filepath = e2[e2.length - 1];
      e2 = e2.slice(0, -1);
    } else if (file.length === 2) {
      // logd('file.length is 2');
      e2 = [file[0]];
      filepath = file[1];
    } else {
      filepath = file[0];
    }
    // logd(`file.length=${file.length}`);

    // console.log('file', file3);
    // console.log('es', e2);
    // console.log('i', i);
    await dsed(filepath, e2, i, v, d);
  });

// console.log('process.argv', process.argv);
program.parse(process.argv);

if (!process.argv.slice(2).length) {
  program.outputHelp();
  console.log(`no param`);
}
