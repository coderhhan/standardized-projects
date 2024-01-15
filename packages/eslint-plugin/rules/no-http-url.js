/*
 * @Author: coderhhan 906271803@qq.com
 * @Date: 2024-01-15 16:18:32
 * @LastEditors: coderhhan 906271803@qq.com
 * @LastEditTime: 2024-01-15 17:38:32
 * @FilePath: \standardized-projects\packages\eslint-plugin\rules\no-http-url.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
const RULE_NAME = 'no-http-url'
module.exports = {
  name: RULE_NAME,
  meta: {
    type: 'suggestion', //建议  problem有问题 layout 外观逗号空格之类的
    fixable: null,
    messages: {
      noHttpUrl: 'Recommended "{{url}}" switch to HTTPS',
    },
  },
  create(context) {
    return {
      Literal: function (node) {
        if (node.value && typeof node.value === 'string' && node.value.indexOf('http:') === 0) {
          context.report({
            node,
            messageId: 'noHttpUrl', //与上面message中的key要对应
            data: {
              url: node.value, //取到的值赋值给url传回上面
            },
          });
        }
      }
    }
  }
}