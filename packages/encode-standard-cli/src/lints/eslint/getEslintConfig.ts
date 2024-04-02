/*
 * @Author: coderhhan 906271803@qq.com
 * @Date: 2024-03-28 12:59:00
 * @LastEditors: coderhhan 906271803@qq.com
 * @LastEditTime: 2024-04-02 23:13:10
 * @FilePath: \standardized-projects\packages\encode-standard-cli\src\lints\eslint\getEslintConfig.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import { ESLint } from "eslint";
import { glob } from "glob";
import path from "path";
import type { Config, PKG, ScanOptions } from "../../types";
import { ESLINT_FILE_EXT } from "../../utils/constants";


export default function getESLintConfig(opts: ScanOptions, pkg: PKG, config: Config) {
  const { cwd, fix, ignore } = opts
  const lintConfig: ESLint.Options = {
    cwd,
    fix, //自动修复
    ignore,
    extensions: ESLINT_FILE_EXT,
    errorOnUnmatchedPattern: false
  }

  if (config.eslintOptions) {
    //合并用户传入的配置
    Object.assign(lintConfig, config.eslintOptions)
  } else {
    const lintConfigFile = glob.sync('.eslintrc?(.@(js|yaml|yml|json))', { cwd })
    lintConfig.resolvePluginsRelativeTo = path.resolve(__dirname, '../../')

    console.log(lintConfig.resolvePluginsRelativeTo, '222')
    if (lintConfigFile.length === 0 && !pkg.eslintConfig) {

      //默认为 null。应该从中解析插件的目录的路径。
      lintConfig.resolvePluginsRelativeTo = path.resolve(__dirname, '../../')
      lintConfig.useEslintrc = false //不使用eslintrc文件配置。
      lintConfig.baseConfig = {
        extends: [
        ]
      }
    }
  }


  return lintConfig
}