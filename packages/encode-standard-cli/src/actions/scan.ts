/*
 * @Author: coderhhan 906271803@qq.com
 * @Date: 2024-03-20 23:23:07
 * @LastEditors: coderhhan 906271803@qq.com
 * @LastEditTime: 2024-03-28 12:54:35
 * @FilePath: \standardized-projects\packages\encode-standard-cli\src\actions\scan.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import path from "path";
import fse from 'fs-extra' // 替代 Node.js 内置 fs 模块创建的
import { PKG, ScanOptions, ScanReport, ScanResult } from "../types";
import { PKG_NAME } from "../utils/constants";
import { doPrettier } from "../lints";
import { doESLint } from "../lints/eslint";


const readConfigFile = (pth: string, cwd: string): any => {
  const localPath = path.resolve(cwd, pth);
  console.log(cwd, 'cwd') //执行指令的地方
  console.log(localPath, 'localPath')
  return fse.existsSync(localPath) ? require(localPath) : {};
};

export default async (options: ScanOptions): Promise<ScanReport> => {
  const { cwd, fix, outputReport, config: scanConfig } = options
  const pkg: PKG = readConfigFile('package.json', cwd)
  //如果没有传入配置，则读取根目录的脚手架生成的 encode-standardized-lint.config.js配置
  const config = scanConfig || readConfigFile(`${PKG_NAME}.config.js`, cwd)
  const runErrors: Error[] = []
  let results: ScanResult[] = []

  //prettier 
  console.log(fix)
  if (fix && config.enablePrettier !== false) {
    //开启自动修复，并且配置了prettier则开始检测
    await doPrettier(options)
  }

  //eslint
  if (config.enableESLint !== false) {
    try {
      const eslintResult = await doESLint({ ...options, pkg, config })
      // results = results.concat(eslintResult)
    } catch (e) {
      runErrors.push(e)
    }
  }



  return {
    results,
    errorCount: 1,
    warningCount: 1,
    runErrors,
  }
}