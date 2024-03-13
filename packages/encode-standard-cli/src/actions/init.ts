/*
 * @Author: coderhhan 906271803@qq.com
 * @Date: 2024-02-04 22:12:06
 * @LastEditors: coderhhan 906271803@qq.com
 * @LastEditTime: 2024-03-12 23:18:57
 * @FilePath: \standardized-projects\packages\encode-standard-cli\src\actions\init.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import path from 'path'
import fse from 'fs-extra' // 替代 Node.js 内置 fs 模块创建的
import inquirer from 'inquirer' //用于创建交互式的命令行界面
import spawn from 'cross-spawn' //处理子进程的东西

import update from './update';
import npmType from '../utils/npm-type';
import log from '../utils/log';
import { PROJECT_TYPES, PKG_NAME } from '../utils/constants'
import type { InitOptions, PKG } from '../types';
import conflictResolve from '../utils/conflict-resolve';
import generateTemplate from '../utils/generate-template';

let step = 0

// 选择语言跟框架
const chooseEslintType = async (): Promise<string> => {
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


/**
 * 选择是否启用 markdownlint
 */
const chooseEnableMarkdownLint = async (): Promise<boolean> => {
  const { enable } = await inquirer.prompt({
    type: 'confirm',
    name: 'enable',
    message: `Step ${++step}. 是否需要使用 markdownlint（若没有 Markdown 文件则不需要）：`,
    default: true,
  });

  return enable;
};

/**
 * 选择是否启用 prettier
 */
const chooseEnablePrettier = async (): Promise<boolean> => {
  const { enable } = await inquirer.prompt({
    type: 'confirm',
    name: 'enable',
    message: `Step ${++step}. 是否需要使用 Prettier 格式化代码：`,
    default: true,
  });

  return enable;
};


/**
 * 选择是否启用 commit
 */
const chooseEnableCommit = async (): Promise<boolean> => {
  const { enable } = await inquirer.prompt({
    type: 'confirm',
    name: 'enable',
    message: `Step ${++step}. 是否需要使用 commit 规范代码提交：`,
    default: true,
  });

  return enable;
};


export default async (options: InitOptions) => {
  //current work directory 当前工作文件夹
  const cwd = options.cwd || process.cwd()
  const isTest = process.env.NODE_ENV === 'test'
  //检查版本是否要更新
  const checkVersionUpdate = options.checkVersionUpdate || false
  // 是否禁用自动在初始化完成后安装依赖
  const disableNpmInstall = options.disableNpmInstall || false
  const config: Record<string, any> = {}
  const pkgPath = path.resolve(cwd, 'package.json')
  let pkg: PKG = fse.readJSONSync(pkgPath)
  console.log(pkg)

  console.log(cwd)
  console.log(pkgPath)
  console.log('进来了')


  //版本检查
  if (!isTest && checkVersionUpdate) {
    await update(false);
  }


  // 初始化 `enableESLint`，默认为 true，无需让用户选择
  if (typeof options.enableESLint === 'boolean') {
    config.enableESLint = options.enableESLint;
  } else {
    config.enableESLint = true;
  }

  // 初始化 `eslintType`
  if (options.eslintType && PROJECT_TYPES.find((choice) => choice.value === options.eslintType)) {
    config.eslintType = options.eslintType;
  } else {
    config.eslintType = await chooseEslintType();
  }


  // 初始化 `enableStylelint`
  if (typeof options.enableStylelint === 'boolean') {
    config.enableStylelint = options.enableStylelint;
  } else {
    //如果是node项目不需要开启stylelint
    config.enableStylelint = await chooseEnableStylelint(!/node/.test(config.eslintType)); // index  || typescript/vue || vue
  }


  // 初始化 `enableMarkdownlint`
  if (typeof options.enableMarkdownlint === 'boolean') {
    config.enableMarkdownlint = options.enableMarkdownlint;
  } else {
    config.enableMarkdownlint = await chooseEnableMarkdownLint();
  }

  // 初始化 `enablePrettier`
  if (typeof options.enablePrettier === 'boolean') {
    config.enablePrettier = options.enablePrettier;
  } else {
    config.enablePrettier = await chooseEnablePrettier();
  }


  // 初始化 `enableCommit`
  if (typeof options.enablePrettier === 'boolean') {
    config.enableCommit = options.enableCommit;
  } else {
    config.enableCommit = await chooseEnableCommit();
  }

  if (!isTest) {
    log.info(`Step ${++step}. 检查并处理项目中可能存在的依赖和配置冲突`);
    await conflictResolve(cwd, options.rewriteConfig);
    log.success(`Step ${step}. 已完成项目依赖和配置冲突检查处理 :D`);

    if (!disableNpmInstall) {
      log.info(`Step ${++step}. 安装依赖`);
      const npm = await npmType;
      spawn.sync(npm, ['i', '-D', PKG_NAME], { stdio: 'inherit', cwd });
      log.success(`Step ${step}. 安装依赖成功 :D`);
    }
  }



  // 配置 commit 卡点
  log.info(`Step ${++step}. 配置 git commit 卡点`);
  spawn.sync('pnpm', ['i', '-D', 'husky@8.0.3'])
  spawn.sync('git', ['init'])
  spawn.sync('pnpm', ['husky', 'install'])
  const huskyDir = path.join(cwd, '.husky');
  const commitMsgFile = path.join(huskyDir, 'commit-msg');
  const content =
    `#!/usr/bin/env sh
  . "$(dirname -- "$0")/_/husky.sh"

  npx commitlint --edit $1
  `
  fse.writeFileSync(commitMsgFile, content, 'utf8');
  log.success(`Step ${step}. 配置 git commit 卡点成功 :D`);

  // 更新 pkg.json
  pkg = fse.readJSONSync(pkgPath);
  // 在 `package.json` 中写入 `scripts`
  if (!pkg.scripts) {
    pkg.scripts = {};
  }
  if (!pkg.scripts[`${PKG_NAME}-scan`]) {
    pkg.scripts[`${PKG_NAME}-scan`] = `${PKG_NAME} scan`;
  }
  if (!pkg.scripts[`${PKG_NAME}-fix`]) {
    pkg.scripts[`${PKG_NAME}-fix`] = `${PKG_NAME} fix`;
  }
  fse.writeFileSync(pkgPath, JSON.stringify(pkg, null, 2));


  log.info(`Step ${++step}. 写入配置文件`);
  generateTemplate(cwd, config);
  log.success(`Step ${step}. 写入配置文件成功 :D`);
  // 完成信息
  const logs = [`${PKG_NAME} 初始化完成 :D`].join('\r\n');
  log.success(logs);

} 