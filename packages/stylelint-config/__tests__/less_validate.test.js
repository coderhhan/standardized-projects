const path = require('path')
const assert = require('assert')
const stylelint = require('stylelint')

describe('less rules', () => {
  it('Validate less', async () => {
    const filePaths = [path.join(__dirname, './feature/less.less')];

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