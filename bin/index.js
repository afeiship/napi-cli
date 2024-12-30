#!/usr/bin/env node

import { Command, Option } from 'commander';
import { createRequire } from 'node:module';
import fs from 'node:fs';
import { Transformer, compressJpeg, pngQuantize } from '@napi-rs/image';

const __dirname = new URL('../', import.meta.url).pathname;
const require = createRequire(__dirname);
const pkg = require('./package.json');
const program = new Command();
const SUPPORT_FORMAT = ['jpg', 'jpeg', 'png', 'gif', 'svg', 'webp', 'avif'];

program.version(pkg.version);
program
  .addOption(new Option('-v, --verbose', 'show verbose log'))
  .addOption(new Option('-q, --quality <number>', 'Quality of image').default(70))
  .addOption(new Option('-o, --output <string>', 'Target file'))
  .addOption(new Option('-f, --format <string>', 'Target file format').choices(SUPPORT_FORMAT))
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

  get output() {
    const { output, format } = this.opts;
    if (this.args.length < 1) throw new Error('Target file is required');
    const _output = output || this.args[0];
    const suffix = _output.split('.').pop();
    const _format = format || suffix;
    return _output.replace(/\.[^.]+$/, `.${_format}`);
  }

  get format() {
    const { format } = this.opts;
    if (format) return format;
    const suffix = this.output.split('.').pop();
    if (SUPPORT_FORMAT.includes(suffix)) return suffix;
    return 'jpg';
  }

  log(...args) {
    const { verbose } = this.opts;
    if (verbose) console.log('📗', ...args);
  }

  async run() {
    const source = this.args[0];
    if (!source) throw new Error('Source file is required');
    const { quality } = this.opts;
    this.log('compressing options: ', this.opts);
    const fileBuffer = fs.readFileSync(source);
    const distBuffer = await this.compress(fileBuffer, { quality });
    fs.writeFileSync(this.output, distBuffer);
    this.log(`✅ ${this.output} created`);
  }

  /* compress format */
  compress(buffer, opts) {
    const format = this.format;

    opts.quality = parseFloat(opts.quality);

    if (opts.quality < 0 || opts.quality > 100) {
      throw new Error('Quality should be between 0 and 100');
    }

    if (format === 'jpg' || format === 'jpeg') {
      return compressJpeg(buffer, opts);
    }

    if (format === 'png') {
      return pngQuantize(buffer, opts);
    }

    if (format === 'webp') {
      return new Transformer(buffer).webp(opts.quality);
    }

    return new Transformer(buffer)[format](opts);
  }
}

new CliApp().run();
