/*
 * @Author: coderhhan 906271803@qq.com
 * @Date: 2024-01-14 19:05:57
 * @LastEditors: coderhhan 906271803@qq.com
 * @LastEditTime: 2024-01-14 21:14:52
 * @FilePath: \standardized-projects\packages\stylelint-config\index.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
module.exports = {
  defaultSeverity: 'warning',
  overrides: [
    {
      files: ["**/*.less"],//针对less解析
      customSyntax: "postcss-less"
    },
    {
      files: ["**/*.scss"],//针对scss解析
      customSyntax: "postcss-scss"
    },
  ],
  plugins: ['stylelint-scss'],
  rules: {
    /**
     * Possible errors
     * @link https://stylelint.io/user-guide/rules/#possible-errors
     */
    'at-rule-no-unknown': null,
    'scss/at-rule-no-unknown': true,
    'block-no-empty': null,
    'color-no-invalid-hex': true, //颜色设置16进制的六位或八位。简写形式3个或4个字符
    'comment-no-empty': true,//注释不能和为空
    'declaration-block-no-duplicate-properties': [ //属性不能重复定义
      true,
      {
        ignore: ['consecutive-duplicates-with-different-values'], //不同单位则可以重复
      },
    ],
    'declaration-block-no-shorthand-property-overrides': true,
    'font-family-no-duplicate-names': true,
    'function-calc-no-unspaced-operator': true,
    'function-linear-gradient-no-nonstandard-direction': true,
    'keyframe-declaration-no-important': true,
    'media-feature-name-no-unknown': true,
    'no-descending-specificity': null, // @reason 实际有很多这样用的，且多数人熟悉 css 优先级
    'no-duplicate-at-import-rules': true,
    'no-duplicate-selectors': true,
    'no-empty-source': null,
    'no-extra-semicolons': true,
    'no-invalid-double-slash-comments': true,
    'property-no-unknown': true,
    'selector-pseudo-class-no-unknown': [
      true,
      {
        ignorePseudoClasses: ['global', 'local', 'export'],
      },
    ],
    'selector-pseudo-element-no-unknown': true,
    'string-no-newline': true,
    'unit-no-unknown': [
      true,
      {
        ignoreUnits: ['rpx'],
      },
    ],

    /**
     * Stylistic issues
     * @link https://stylelint.io/user-guide/rules/list#stylistic-issues
     */
    indentation: 2,
    'block-closing-brace-newline-before': 'always-multi-line',
    'block-closing-brace-space-before': 'always-single-line',
    'block-opening-brace-newline-after': 'always-multi-line',
    'block-opening-brace-space-before': 'always',
    'block-opening-brace-space-after': 'always-single-line',
    'color-hex-case': 'lower',
    'color-hex-length': 'short',
    'comment-whitespace-inside': 'always',
    'declaration-colon-space-before': 'never',
    'declaration-colon-space-after': 'always',
    'declaration-block-single-line-max-declarations': 1,
    'declaration-block-trailing-semicolon': [
      'always',
      {
        severity: 'error',
      },
    ],
    'length-zero-no-unit': [
      true,
      {
        ignore: ['custom-properties'],
      },
    ],
    'max-line-length': 100,
    'selector-max-id': 0,
    'value-list-comma-space-after': 'always-single-line',

    /**
     * stylelint-scss rules
     * @link https://www.npmjs.com/package/stylelint-scss
     */
    'scss/double-slash-comment-whitespace-inside': 'always',
  },
  ignoreFiles: ['**/*.js', '**/*.jsx', '**/*.ts', '**/*.tsx'],
};
