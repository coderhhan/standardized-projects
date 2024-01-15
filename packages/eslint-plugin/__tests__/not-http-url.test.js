'use strict';

const rule = require('../rules/no-http-url');
const { RuleTester } = require('eslint');

const ruleTester = new RuleTester()

ruleTester.run('no-http-url', rule, {
  valid: [
    {
      code: "var test = 'https://coderhhan.com';"
    }
  ],
  invalid: [
    {
      code: "var test = 'http://coderhhan.com';",
      output: "var test = 'http://coderhhan.com';",
      errors: [
        {
          message: 'Recommended "http://coderhhan.com" switch to HTTPS',
        },
      ],
    },
    {
      code: "<img src='http://coderhhan.com' />",
      output: "<img src='http://coderhhan.com' />",
      parserOptions: {
        ecmaFeatures: {
          jsx: true,
        },
      },
      errors: [
        {
          message: 'Recommended "http://coderhhan.com" switch to HTTPS',
        },
      ],
    }
  ]
})