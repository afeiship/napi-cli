#!/usr/bin/env node

import { Command, Option } from 'commander';
import { createRequire } from 'node:module';
import fs from 'node:fs';
import { Transformer, compressJpeg, pngQuantize } from '@napi-rs/image';

const __dirname = new URL('../', import.meta.url).pathname;
const require = createRequire(__dirname);
const pkg = require('./package.json');
const program = new Command();
const SUPPORT_FORMAT = ['jpg', 'jpeg', 'png', 'gif', 'svg', 'webp'];

program.version(pkg.version);
program
  .addOption(new Option('-v, --verbose', 'show verbose log'))
  .addOption(new Option('-q, --quality <number>', 'Quality of image').default(70))
  .addOption(new Option('-o, --output <string>', 'Target file').default('dist/output.jpg'))
  .addOption(new Option('-f, --format <string>', 'Target file format').choices(SUPPORT_FORMAT).default('jpg'))
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
    const { output, quality } = this.opts;
    const fileBuffer = fs.readFileSync(source);
    const distBuffer = await this.compress(fileBuffer, { quality });
    fs.writeFileSync(output, distBuffer);
  }

  /* compress format */
  compress(buffer, opts) {
    const { format } = this.opts;
    if (format === 'jpg' || format === 'jpeg') {
      return compressJpeg(buffer, opts);
    }

    if (format === 'png') {
      return pngQuantize(buffer, opts);
    }

    if (format === 'webp') {
      return new Transformer(buffer).webp(parseFloat(opts.quality));
    }

    return new Transformer(buffer)[format](opts);
  }
}

new CliApp().run();
