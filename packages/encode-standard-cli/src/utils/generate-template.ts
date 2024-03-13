/*
 * @Author: coderhhan 906271803@qq.com
 * @Date: 2024-03-10 23:33:48
 * @LastEditors: coderhhan 906271803@qq.com
 * @LastEditTime: 2024-03-11 23:03:26
 * @FilePath: \standardized-projects\packages\encode-standard-cli\src\utils\generate-template.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */

import path from 'path';
import glob from 'glob';
import fse from 'fs-extra'
import _ from 'lodash'
import ejs from 'ejs'; //是一个简单的模板语言，可用于在 Node.js 环境和浏览器中生成 HTML 标记

import {
  ESLINT_IGNORE_PATTERN,
  STYLELINT_FILE_EXT,
  STYLELINT_IGNORE_PATTERN,
  MARKDOWN_LINT_IGNORE_PATTERN,
} from './constants';
/**
 * vscode 配置合并
 * @param filepath
 * @param content
 */


const mergeVScodeConfig = (filepath: string, content: string) => {
  //文件不存在，不需要merge
  if (!fse.existsSync(filepath)) return content

  try {
    const targetData = fse.readJSONSync(filepath);
    const sourceData = JSON.parse(content)
    return JSON.stringify(
      _.mergeWith(targetData, sourceData, (target, source) => {
        if (Array.isArray(target) && Array.isArray(source)) {
          return [...new Set(source.concat(target))];
        }
      }),
      null,
      2)
  } catch (e) {
    return ''
  }
}

/**
 * 实例化模板
 * @param cwd
 * @param data
 * @param vscode
 */

export default (cwd: string, data: Record<string, any>, vscode?: boolean) => {
  const templatePath = path.resolve(__dirname, '../config');
  const templates = glob.sync(`${vscode ? '_vscode' : '**'}/*.ejs`, { cwd: templatePath });

  for (const name of templates) {
    const filepath = path.resolve(cwd, name.replace(/\.ejs$/, '').replace(/^_/, '.'));
    //ejs.render(模板,数据)
    //如：const template = '<h1><%= title %></h1>';
    // const data = { title: 'Hello, EJS!' };
    let content = ejs.render(fse.readFileSync(path.resolve(templatePath, name), 'utf8'), {
      eslintIgnores: ESLINT_IGNORE_PATTERN,
      stylelintExt: STYLELINT_FILE_EXT,
      stylelintIgnores: STYLELINT_IGNORE_PATTERN,
      markdownLintIgnores: MARKDOWN_LINT_IGNORE_PATTERN,
      ...data,
    });


    // 合并 vscode config
    if (/^_vscode/.test(name)) {
      content = mergeVScodeConfig(filepath, content);
    }

    // 跳过空文件
    if (!content.trim()) continue;

    fse.outputFileSync(filepath, content, 'utf8'); //outputFilesSync 如果没有文件夹会给其创建文件夹

  }
}