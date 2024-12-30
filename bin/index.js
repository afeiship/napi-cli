#!/usr/bin/env node

import { Command, Option } from 'commander';
import { createRequire } from 'module';
import fs from 'node:fs';
import { Transformer, compressJpeg } from '@napi-rs/image';

const __dirname = new URL('../', import.meta.url).pathname;
const require = createRequire(__dirname);
const pkg = require('./package.json');
const program = new Command();
const FORMAT_HOOKS = {
  jpeg: 'jpg',
  jpg: 'jpg',
};

program.version(pkg.version);
program
  .addOption(new Option('-v, --verbose', 'show verbose log'))
  .addOption(new Option('-r, --replace', 'Replace existing file'))
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

  async run() {
    const source = this.args[0];
    if (!source) throw new Error('Source file is required');
    const { target, format } = this.opts;
    const fileBuffer = fs.readFileSync(source);
    const suffix = source.split('.').pop();
    const distBuffer = await this.compress(fileBuffer, suffix, { quality: 10 });
    console.log('dist buffer: ', distBuffer);
    fs.writeFileSync(target, distBuffer);
  }

  /* compress format */
  compress(buffer, opts) {
    const { format } = this.opts;
    if (format === 'jpg' || format === 'jpeg') {
      return compressJpeg(buffer, opts);
    }
    return new Transformer(buffer)[format](opts);
  }
}

new CliApp().run();
