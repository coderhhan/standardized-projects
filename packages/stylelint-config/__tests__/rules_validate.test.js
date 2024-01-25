/*
 * @Author: coderhhan 906271803@qq.com
 * @Date: 2024-01-15 10:50:15
 * @LastEditors: coderhhan 906271803@qq.com
 * @LastEditTime: 2024-01-16 22:38:12
 * @FilePath: \standardized-projects\packages\stylelint-config\__tests__\rules_validate.test.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
const path = require('path')
const assert = require('assert')
const stylelint = require('stylelint')

describe('test rules', () => {
  it('validate default', async () => {
    const filePathS = [path.join(__dirname, './feature/index.css')] //读取css文件

    const result = await stylelint.lint({
      configFile: path.join(__dirname, '../index.js'), //读取配置文件
      files: filePathS, //文件路径
      fix: false//自动修复
    })

    if (result && !result.errored) { //因为是warning 所以判断false
      const validateResult = JSON.parse(result.output || '[]') || []
      console.log(validateResult.length)
      const flag = validateResult.every(item => {
        console.log(`========= ${filePathS} ==========`);
        console.log(item.warnings);
        return item.warnings.length === 0
      });

      assert.ok(flag);
    }
  })

  it('declaration-colon-space-after', async () => {
    const filePathS = [path.join(__dirname, './feature/fontsize.css')] //读取css文件

    const result = await stylelint.lint({
      configFile: path.join(__dirname, '../index.js'), //读取配置文件
      files: filePathS, //文件路径
      fix: false//自动修复
    })


    if (result) {
      const validateResult = JSON.parse(result.output || '[]') || []

      const flag = validateResult.every(item => {
        console.log(`========= ${filePathS} ==========`);
        console.log(item.warnings);
        return item.warnings.length === 0
      });
      assert.ok(flag);
    }
  })

  //错误的维度
  it('error type', async () => {
    const filePathS = [path.join(__dirname, './feature/essential.css')] //读取css文件

    const result = await stylelint.lint({
      configFile: path.join(__dirname, '../index.js'), //读取配置文件
      files: filePathS, //文件路径
      fix: false//自动修复
    })
    console.log(result.errored);

    if (result) {
      const validateResult = JSON.parse(result.output || '[]') || []

      const flag = validateResult.every(item => {
        console.log(`========= ${filePathS} ==========`);
        console.log(item.warnings);
        return item.warnings.length === 0
      });
      assert.ok(flag);
    }
  })
})