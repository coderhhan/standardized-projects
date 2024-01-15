/*
 * @Author: coderhhan 906271803@qq.com
 * @Date: 2024-01-15 21:09:03
 * @LastEditors: coderhhan 906271803@qq.com
 * @LastEditTime: 2024-01-15 21:37:05
 * @FilePath: \standardized-projects\packages\eslint-plugin\__tests__\not-secret-info.test.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
'use strict';

const rule = require('../rules/no-secret-info');
const { RuleTester } = require('eslint');

const ruleTester = new RuleTester()

ruleTester.run('no-secret-info', rule, {
  valid: [
    {
      code: 'var accessKeySecret = process.env.ACCESS_KEY_SECRET;',
    },
    {
      code: 'var password = "";',
    },
    {
      code: `
    var client ={
      accessKeyToken: process.env.ACCESS_KEY_SECRET
    };
    `,
    },
  ],
  invalid: [
    {
      code: "var accessKeySecret = 'xxxx';",
      errors: [
        {
          message: 'Detect that the "xxxx" might be a secret token, Please check!',
        },
      ],
    },
    {
      code: "var password = 'xxxx';",
      errors: [
        {
          message: 'Detect that the "xxxx" might be a secret token, Please check!',
        },
      ],
    },
    {
      code: `
    var client ={
      accessKeyToken: 'xxxx'
    };
    `,
      errors: [
        {
          message: 'Detect that the "xxxx" might be a secret token, Please check!',
        },
      ],
    },
  ]
})