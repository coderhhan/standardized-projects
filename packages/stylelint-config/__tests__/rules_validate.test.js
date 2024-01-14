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


    if (result && !result.errored) {
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