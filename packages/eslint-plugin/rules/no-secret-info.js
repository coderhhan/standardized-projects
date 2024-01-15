/*
 * @Author: coderhhan 906271803@qq.com
 * @Date: 2024-01-15 21:04:59
 * @LastEditors: coderhhan 906271803@qq.com
 * @LastEditTime: 2024-01-15 21:40:40
 * @FilePath: \standardized-projects\packages\eslint-plugin\rules\no-secret-info.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
const RULE_NAME = 'no-secret-info';
const DEFAULT_DANGEROUS_KEYS = ['secret', 'token', 'password'];
module.exports = {
  name: RULE_NAME,
  meta: {
    type: 'suggestion',
    fixable: null,
    messages: {
      noSecretInfo: 'Detect that the "{{secret}}" might be a secret token, Please check!'
    }
  },
  create(context) {
    const ruleOptions = context.options[0] || {};
    let { dangerousKeys = [], autoMerge = true } = ruleOptions;
    if (dangerousKeys.length === 0) {
      dangerousKeys = DEFAULT_DANGEROUS_KEYS;
    } else if (autoMerge) {
      dangerousKeys = [...new Set(...DEFAULT_DANGEROUS_KEYS, ...dangerousKeys)]; //去重
    }
    const reg = new RegExp(dangerousKeys.join('|'));


    return {
      //这里是NodeListener，根据对应的监听器能获取节点的数据
      Literal: function handleRequires(node) {
        console.log(node, '1')
        console.log(node.parent, '2')
        if (
          node.value &&
          node.parent &&
          ((node.parent.type === 'VariableDeclarator' &&
            node.parent.id &&
            node.parent.id.name &&
            reg.test(node.parent.id.name.toLocaleLowerCase())) ||
            (node.parent.type === 'Property' &&
              node.parent.key &&
              node.parent.key.name &&
              reg.test(node.parent.key.name.toLocaleLowerCase())))
        ) {
          context.report({
            node,
            messageId: 'noSecretInfo',
            data: {
              secret: node.value,
            },
          });
        }
      },
    }
  }
}