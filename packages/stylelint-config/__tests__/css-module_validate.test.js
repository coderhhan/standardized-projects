/*
 * @Author: coderhhan 906271803@qq.com
 * @Date: 2024-01-14 22:09:17
 * @LastEditors: coderhhan 906271803@qq.com
 * @LastEditTime: 2024-01-14 22:11:14
 * @FilePath: \standardized-projects\packages\stylelint-config\__tests__\sass_validate.test.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
const path = require('path')
const assert = require('assert')
const stylelint = require('stylelint')

describe('module-css rules', () => {
  it('Validate sass', async () => {
    const filePaths = [path.join(__dirname, './feature/css-module.scss')];

    const result = await stylelint.lint({
      configFile: path.join(__dirname, '../index.js'),
      files: filePaths,
      fix: false,
    });

    if (result && result.errored) {
      const filesResult = JSON.parse(result.output || '[]') || [];
      filesResult.forEach((fileResult) => {
        console.log(`========= ${filePaths} ==========`);
        console.log(fileResult.warnings);
      });

      assert.ok(filesResult.length !== 0);
    }
  });
})