/*
 * @Author: coderhhan 906271803@qq.com
 * @Date: 2024-01-25 22:27:44
 * @LastEditors: coderhhan 906271803@qq.com
 * @LastEditTime: 2024-03-26 23:42:08
 * @FilePath: \standardized-projects\packages\encode-standard-cli\src\types.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import { ESLint } from 'eslint';
import stylelint from 'stylelint';
import markdownlint from 'markdownlint';

export interface PKG {
  eslintConfig?: any;
  eslintIgnore?: string[];
  stylelint?: any;
  peerDependencies?: Record<string, string>;
  devDependencies?: Record<string, string>;
  dependencies?: Record<string, string>;

  [key: string]: any;
}

export interface Config {
  // 是否启用 ESLint
  enableESLint?: boolean;
  // 是否启用 stylelint
  enableStylelint?: boolean;
  // 是否启用 markdown lint
  enableMarkdownlint?: boolean;
  // 是否启用 prettier
  enablePrettier?: boolean;
  // ESLint 配置项
  eslintOptions?: ESLint.Options;
  // stylelint 配置项
  stylelintOptions?: stylelint.LinterOptions;
  // markdownlint 配置项
  markdownlintOptions?: markdownlint.Options;
}


export interface InitOptions {
  cwd: string;
  // 是否检查并升级 encode-fe-lint 的版本
  checkVersionUpdate: boolean;
  // 是否需要自动重写 lint 配置
  rewriteConfig?: boolean;
  // eslint 类型
  eslintType?: string;
  // 是否启用 ESLint
  enableESLint?: boolean;
  // 是否启用 stylelint
  enableStylelint?: boolean;
  // 是否启用 markdownlint
  enableMarkdownlint?: boolean;
  // 是否启用 prettier
  enablePrettier?: boolean;
  // 是否启用 commitlint
  enableCommit?: boolean;
  // 是否禁用自动在初始化完成后安装依赖
  disableNpmInstall?: boolean;
}

export interface ScanOptions {
  //lint 运行的工作目录
  cwd: string;
  //进行扫描的目录
  include: string;
  //进行规范扫描的文件列表
  files?: string[];
  //仅报告错误信息
  quiet?: boolean;
  //忽略eslint ignore 配置文件和ignore 规则
  ignore?: boolean;
  //自动修复
  fix?: boolean;
  //生成报告文件
  outputReport?: boolean;
  //scan 时指定encode-standardized-cli config，优先级高于 encode-standardized-lint.config.js
  config?: Config
}

export interface ScanResult {
  filePath: string;
  errorCount: number;
  warningCount: number;
  fixableErrorCount: number;
  fixableWarningCount: number;
  message: Array<{
    line: number;
    column: number;
    rule: string;
    url: string;
    message: string;
    errored: boolean
  }>
}

export interface ScanReport {
  results?: ScanResult[];
  errorCount: number;
  warningCount: number;
  runErrors?: Error[]
}


