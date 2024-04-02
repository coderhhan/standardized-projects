/*
 * @Author: coderhhan 906271803@qq.com
 * @Date: 2024-03-21 23:37:44
 * @LastEditors: coderhhan 906271803@qq.com
 * @LastEditTime: 2024-03-23 23:21:05
 * @FilePath: \standardized-projects\packages\encode-standard-cli\src\lints\prettier\doPrettier.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import fg from 'fast-glob' //文件系统遍历工具
import { readFile, writeFile } from 'fs-extra';
import prettier from 'prettier';
import { extname, join } from "path";
import { ScanOptions } from "../../types";
import { PRETTIER_FILE_EXT, PRETTIER_IGNORE_PATTERN } from "../../utils/constants";

interface doPrettierOptions extends ScanOptions { }
export async function doPrettier(options: doPrettierOptions) {

  let files: string[] = []
  if (options.files) {
    files = options.files.filter(name => PRETTIER_FILE_EXT.includes(extname(name))) //extename获取路径扩展名如xxx.html =>.html
    console.log(files, 'files')
  } else {
    //standardized-projects\packages\encode-standard-cli\**\*.{css,scss,less,acss,js,jsx,ts,tsx,vue,md}
    const pattern = join(
      options.include, //standardized-projects\packages\encode-standard-cli
      `**/*.{${PRETTIER_FILE_EXT.map((t) => t.replace(/^\./, '')).join(',')}}`,
    )
    // "src/*.js"    // 匹配 src 目录下的所有后缀名为 js 的文件
    // "src/**"      // 匹配 src 目录下的所有文件
    // "src/**/*.ts" // 匹配 src 目录下任意子目录下的后缀名为 ts 的文件
    files = await fg(pattern, {
      cwd: options.cwd,
      ignore: PRETTIER_IGNORE_PATTERN
    })
  }

  await Promise.all(files.map(formatFile))

}

async function formatFile(filepath: string) {
  const text = await readFile(filepath, 'utf8'); //读取文件文本
  const options = await prettier.resolveConfig(filepath); //根据将要解析的文件路径获取相关配置
  const formatted = prettier.format(text, { ...options, filepath });//根据filepath推断需使用的解析器，对text进行解析
  await writeFile(filepath, formatted, 'utf8'); //解析完文件重新写入文件
}
