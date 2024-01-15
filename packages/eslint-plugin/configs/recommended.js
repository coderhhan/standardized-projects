/*
 * @Author: coderhhan 906271803@qq.com
 * @Date: 2024-01-15 16:56:40
 * @LastEditors: coderhhan 906271803@qq.com
 * @LastEditTime: 2024-01-15 21:41:34
 * @FilePath: \standardized-projects\packages\eslint-plugin\configs\recommended.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
module.exports = {
  plugins: ['eslint-plugin-hh'],
  rules: {
    'eslint-plugin-hh/no-http-url': 'warn',
    'eslint-plugin-hh/no-secret-info': 'error',
  },
};
