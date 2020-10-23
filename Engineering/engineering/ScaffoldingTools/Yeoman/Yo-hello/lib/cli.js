#!/usr/bin/env node
'use strict';
const meow = require('meow');
const hello = require('.');

const cli = meow(`
Usage
  $ hello [input]

Options
  --foo  Lorem ipsum. [Default: false]

Examples
  $ hello
  unicorns
  $ hello rainbows
  unicorns & rainbows
`);
