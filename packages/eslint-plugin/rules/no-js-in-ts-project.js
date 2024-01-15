const path = require('path')
const No_JS_IN_TS_PROJECT = 'no-js-in-ts-project'
const JS_REG = /\.jsx?$/; //匹配js、jsx
const DEFAULT_WHITE_LIST = [
  'commitlint.config.js',
  'eslintrc.js',
  'prettierrc.js',
  'stylelintrc.js',
];

module.exports = {
  name: No_JS_IN_TS_PROJECT,
  meta: {
    type: 'suggestion',
    fixable: null,
    messages: {
      noJsInTsProject: '{{fileName}} is not recommended in ts project'
    }
  },
  create(context) {
    const fileName = context.getFilename();
    const extName = path.extname(fileName);
    const ruleOptions = context.options[0] || {}; //rule的选项
    let { whiteList = [], autoMerge = true } = ruleOptions;
    if (whiteList.length === 0) {
      whiteList = DEFAULT_WHITE_LIST;
    } else if (autoMerge) {
      whiteList = [...new Set([...DEFAULT_WHITE_LIST, ...whiteList])]; //合并白名单文件
    }

    const whiteListReg = new RegExp(`(${whiteList.join('|')})$`); //生成正则 不是这些文件

    if (!whiteListReg.test(fileName) && JS_REG.test(extName)) {
      context.report({
        loc: {
          start: {
            line: 0,
            column: 0,
          },
          end: {
            line: 0,
            column: 0,
          },
        },
        messageId: 'noJsInTsProject',
        data: {
          fileName,
        },
      });
    }

    return {

    }
  }
}