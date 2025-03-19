#!/usr/bin/env node

import { Command, CommanderError } from 'commander';
import { dsed } from '../lib/dsed.js';

const program = new Command();
import fs from 'fs';

program.name('sed-win').description('sed for Windows.').version('1.0.1');

program
  .command('tt')
  .argument('[p1]', 'p1')
  .action(async (p1: string = '') => {
    console.log(`test p1=${p1}`);
    // await updateVersion('ngt.json');
    // LogAnalysis3.test();
    // console.log(`tt; envFile=${envFile}`);
    // const config = readEnvFileToJson(envFile);
    // console.log(`config`, config);
  });

program
  .command('now')
  .description('Show current date and time')
  .action(() => {
    console.log('now ' + new Date());
  });

program.parse(process.argv);

if (!process.argv.slice(2).length) {
  program.outputHelp();
  console.log(`no param`);
}
