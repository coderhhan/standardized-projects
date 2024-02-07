/*
 * @Author: coderhhan 906271803@qq.com
 * @Date: 2024-02-04 22:12:06
 * @LastEditors: coderhhan 906271803@qq.com
 * @LastEditTime: 2024-02-04 23:35:13
 * @FilePath: \standardized-projects\packages\encode-standard-cli\src\actions\init.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import path from 'path'
import fse from 'fs-extra' // 替代 Node.js 内置 fs 模块创建的
import inquirer from 'inquirer' //用于创建交互式的命令行界面
import spawn from 'cross-spawn'
import { PROJECT_TYPES } from '../utils/constanst'


let step = 0

// 选择语言跟框架
const chooesEslintType = async (): Promise<string> => {
  const { type } = await inquirer.prompt({
    type: 'list',
    name: 'type',
    message: `Step ${++step}. 请选择项目的语言（JS/TS）和框架（React/Vue）类型：`,
    choices: PROJECT_TYPES
  })
  return type
}


/**
 * 选择是否启用 stylelint
 * @param defaultValue
 */


const chooseEnableStylelint = async (defaultValue: boolean): Promise<boolean> => {
  const { enable } = await inquirer.prompt({
    type: 'confirm',
    name: 'enable',
    message: `Step ${++step}. 是否需要使用 stylelint（若没有样式文件则不需要）：`,
    default: defaultValue,
  });

  return enable;
};