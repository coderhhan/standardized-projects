import path from 'path';
import fse from 'fs-extra';
import glob from 'glob'; //是一个 Node.js 中常用的模式匹配库，用于查找文件路径
import inquirer from 'inquirer'
import { PKG_NAME } from './constants';
import type { PKG } from '../types';
import log from '../utils/log';

// 精确移除依赖
const packageNamesToRemove = [
  '@babel/eslint-parser', //eslint解析器，转ast抽象语法树 基于 Babel 7 的解析器
  '@commitlint/cli', //是一个用于校验 Git 提交消息规范的工具包
  '@iceworks/spec',//库是阿里巴巴的 Iceworks 团队开发的一个工具，用于帮助开发者在使用 Iceworks 构建项目时规范项目的目录结构和文件命名
  'babel-eslint',//是一个 Babel 6解析器，它允许 ESLint 使用 Babel 解析 JavaScript 代码
  'eslint',//是一个用于 JavaScript 和 TypeScript 代码的静态代码分析工具
  'husky',//是一个让 Git hooks 更容易使用的工具，它允许开发者在执行 Git 操作时自动运行预定义的脚本
  'markdownlint',
  'prettier',
  'stylelint',
  'tslint',// 是一个用于 TypeScript 代码的静态代码分析工具
];

// 按前缀移除依赖
const packagePrefixesToRemove = [
  '@commitlint/',
  '@typescript-eslint/',
  'eslint-',
  'stylelint-',
  'markdownlint-',
  'commitlint-',
];

/**
 * 待删除的无用配置
 * @param cwd
 */
const checkUselessConfig = (cwd: string): string[] => {
  return []
    .concat(glob.sync('.eslintrc?(.@(yaml|yml|json))', { cwd })) //e.g [ '.eslintrc.json' ]
    .concat(glob.sync('.stylelintrc?(.@(yaml|yml|json))', { cwd }))
    .concat(glob.sync('.markdownlint@(rc|.@(yaml|yml|jsonc))', { cwd }))
    .concat(
      glob.sync('.prettierrc?(.@(cjs|config.js|config.cjs|yaml|yml|json|json5|toml))', { cwd }),
    )
    .concat(glob.sync('tslint.@(yaml|yml|json)', { cwd }))
    .concat(glob.sync('.kylerc?(.@(yaml|yml|json))', { cwd }));
};

/**
 * 待重写的配置
 * @param cwd
 */
const checkReWriteConfig = (cwd: string) => {
  return glob
    .sync('**/*.ejs', { cwd: path.resolve(__dirname, '../config') })
    .map((name) => name.replace(/^_/, '.').replace(/\.ejs$/, ''))
    .filter((filename) => fse.existsSync(path.resolve(cwd, filename))); //检查写入配置的文件是否已经存在，筛选出已存在的文件标记重写
};

export default async (cwd: string, rewriteConfig?: boolean) => {
  const pkgPath = path.resolve(cwd, 'package.json');
  const pkg: PKG = fse.readJSONSync(pkgPath);
  const dependencies = [].concat(
    Object.keys(pkg.dependencies || {}),
    Object.keys(pkg.devDependencies || {}),
  );
  //找出需要删除的依赖包
  const willRemovePackage = dependencies.filter(
    (name) =>
      packageNamesToRemove.includes(name) ||
      packagePrefixesToRemove.some((prefix) => name.startsWith(prefix)),
  );

  //由于本脚手架使用配置是js文件，将相同配置的其他文件标记为无用配置
  // 如果使用eslintrc.js 则将eslintrc.json标记为无用配置
  const uselessConfigs = checkUselessConfig(cwd);
  //如果配置文件已经存在，则将其标记为需要重写的配置文件
  const reWriteConfigs = checkReWriteConfig(cwd);
  const willChangeCount = willRemovePackage.length + uselessConfigs.length + reWriteConfigs.length;

  // 提示是否移除原配置
  if (willChangeCount > 0) {
    log.warn(`检测到项目中存在可能与 ${PKG_NAME} 冲突的依赖和配置，为保证正常运行将`);
    if (willRemovePackage.length > 0) {
      log.warn('删除以下依赖：');
      log.warn(JSON.stringify(willRemovePackage, null, 2)); // 第三个参数是缩进字符数
    }

    if (uselessConfigs.length > 0) {
      log.warn('删除以下配置文件：');
      log.warn(JSON.stringify(uselessConfigs, null, 2));
    }

    if (reWriteConfigs.length > 0) {
      log.warn('覆盖以下配置文件：');
      log.warn(JSON.stringify(reWriteConfigs, null, 2));
    }


    //没有传值，询问是否覆盖
    if (typeof rewriteConfig === 'undefined') {
      const { isOverWrite } = await inquirer.prompt({
        type: 'confirm',
        name: 'isOverWrite',
        message: '请确认是否继续：',
      });

      if (!isOverWrite) process.exit(0); //中止子程序 返回状态码0 表示成功
    } else if (!rewriteConfig) {
      process.exit(0);
    }
  }

  // 删除配置文件
  for (const name of uselessConfigs) {
    fse.removeSync(path.resolve(cwd, name));
  }

  // 修正 package.json
  delete pkg.eslintConfig;
  delete pkg.eslintIgnore;
  delete pkg.stylelint;
  for (const name of willRemovePackage) {
    delete (pkg.dependencies || {})[name];
    delete (pkg.devDependencies || {})[name];
  }
  fse.writeFileSync(path.resolve(cwd, 'package.json'), JSON.stringify(pkg, null, 2), 'utf8');

  return pkg;

}