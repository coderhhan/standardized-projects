'use strict';

const encodeStandardCli = require('..');
const assert = require('assert').strict;

assert.strictEqual(encodeStandardCli(), 'Hello from encodeStandardCli');
console.info('encodeStandardCli tests passed');
