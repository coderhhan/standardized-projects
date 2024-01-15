/*
 * @Author: coderhhan 906271803@qq.com
 * @Date: 2024-01-15 20:23:59
 * @LastEditors: coderhhan 906271803@qq.com
 * @LastEditTime: 2024-01-15 21:03:08
 * @FilePath: \standardized-projects\packages\eslint-plugin\__tests__\no-js-in-ts-project.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
const { RuleTester } = require('eslint')
const rule = require('../rules/no-js-in-ts-project')

const ruleTester = new RuleTester()

ruleTester.run('no-js-in-ts-project', rule, {
  valid: [
    {
      filename: 'index.ts',
      code: '111',
    },
    {
      filename: '.stylelintrc.js',
      code: '222',
    },
    {
      filename: 'home.ts',
      code: '333',
    },
  ],
  invalid: [
    {
      filename: 'home.jsx',
      code: '',
      errors: [
        {
          message: 'home.jsx is not recommended in ts project',
        },
      ],
    },
  ]
})