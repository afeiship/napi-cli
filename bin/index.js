#!/usr/bin/env node

import { Command, Option } from 'commander';
import { createRequire } from 'module';

const __dirname = new URL('../', import.meta.url).pathname;
const require = createRequire(__dirname);
const pkg = require('./package.json');
const program = new Command();

program.version(pkg.version);
program
  .addOption(new Option('-v, --verbose', 'show verbose log'))
  .addOption(new Option('-r, --replace', 'Replace existing file'))
  .addOption(new Option('-s, --source <string>', 'Source file'))
  .addOption(new Option('-t, --target <string>', 'Target file'))
  .addOption(
    new Option('-f, --format <string>', 'Target file format').choices([
      'jpg',
      'jpeg',
      'png',
      'gif',
      'svg',
    ])
  )
  .addOption(new Option('-c, --city <string>', 'weather of city').choices(['wuhan', 'shanghai']))
  .parse(process.argv);

/**
 * @help: nci -h
 * @description: nci -f
 */

class CliApp {
  constructor() {
    this.args = program.args;
    this.opts = program.opts();
  }

  log(...args) {
    const { verbose } = this.opts;
    if (verbose) console.log('📗', ...args);
  }

  run() {
    this.log('run cli: ', __dirname, this.args, this.opts, pkg.version);
  }
}

new CliApp().run();
