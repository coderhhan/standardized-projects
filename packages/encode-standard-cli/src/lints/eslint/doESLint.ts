/*
 * @Author: coderhhan 906271803@qq.com
 * @Date: 2024-03-26 23:36:40
 * @LastEditors: coderhhan 906271803@qq.com
 * @LastEditTime: 2024-03-30 22:41:36
 * @FilePath: \standardized-projects\packages\encode-standard-cli\src\lints\eslint\doESLint.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import { ESLint } from "eslint";
import FastGlob from "fast-glob";
import { extname } from "path";
import { PKG, ScanOptions, Config } from "../../types";
import { ESLINT_FILE_EXT, ESLINT_IGNORE_PATTERN } from "../../utils/constants";
import getESLintConfig from "./getEslintConfig";

interface DoESLintOptions extends ScanOptions {
  pkg: PKG,
  config?: Config
}

export async function doESLint(options: DoESLintOptions) {
  let files: string[]
  if (options.files) {
    files = options.files.filter((name) => ESLINT_FILE_EXT.includes(extname(name)))
  } else {
    files = await FastGlob(`**/*.{${ESLINT_FILE_EXT.map((t) => t.replace(/^\./, '')).join(",")}}`, {
      cwd: options.cwd,
      ignore: ESLINT_IGNORE_PATTERN //忽略一些文件夹及配置文件
    })

    console.log(files)
  }


  const eslint = new ESLint(getESLintConfig(options, options.pkg, options.config))
}