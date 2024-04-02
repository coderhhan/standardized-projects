/*
 * @Author: coderhhan 906271803@qq.com
 * @Date: 2024-01-25 22:27:34
 * @LastEditors: coderhhan 906271803@qq.com
 * @LastEditTime: 2024-03-23 22:53:07
 * @FilePath: \standardized-projects\packages\encode-standard-cli\src\cli.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import path from 'path';
import glob from 'glob';
import fse from 'fs-extra' // 替代 Node.js 内置 fs 模块创建的
import { program } from 'commander';
import { execSync } from 'child_process';

import init from './actions/init';

import { PKG_NAME, PKG_VERSION } from './utils/constants';
import generateTemplate from './utils/generate-template';
import npmType from './utils/npm-type';
import log from './utils/log';
import ora from 'ora';
import scan from './actions/scan';


const cwd = process.cwd();

program
  .version(PKG_VERSION)
  .description(
    `${PKG_NAME} 是 印客学院前端编码规范工程化 的配套 Lint 工具，提供简单的 CLI 和 Node.js API，让项目能够一键接入、一键扫描、一键修复、一键升级，并为项目配置 git commit 卡点，降低项目实施规范的成本`,
  );

program
  .command('init')
  .option('--vscode', '写入.vscode/setting.json配置')
  .action(async (cmd) => {
    console.log(cmd)
    if (cmd.vscode) {
      const configPath = path.resolve(cwd, `${PKG_NAME}.config.js`);
      generateTemplate(cwd, require(configPath), true);
    } else {
      await init({
        cwd,
        checkVersionUpdate: true,
      });
    }
  });

/**
 * 若无 node_modules，则帮用户 install（否则会找不到 config）
 */
const installDepsIfThereNo = async () => {
  const lintConfigFiles = [].concat(
    glob.sync('.eslintrc?(.@(js|yaml|yml|json))', { cwd }),
    glob.sync('.stylelintrc?(.@(js|yaml|yml|json))', { cwd }),
    glob.sync('.markdownlint(.@(yaml|yml|json))', { cwd }),
  );
  const nodeModulesPath = path.resolve(cwd, 'node_modules');

  if (!fse.existsSync(nodeModulesPath) && lintConfigFiles.length > 0) {
    const npm = await npmType;
    log.info(`使用项目 Lint 配置，检测到项目未安装依赖，将进行安装（执行 ${npm} install）`);
    execSync(`cd ${cwd} && ${npm} i`);
  }
};

program
  .command('scan')
  .description('一键扫描：对项目进行代码规范问题扫描')
  .option('-q, --quiet', '仅报告错误信息 -默认: false')
  .option('-o, --output-report', '输出扫描出的规范问题日志')
  .option('-i, --include <dirpath>', '指定要进行规范扫描的目录')
  .option('--no-ignore', '忽略 eslint 的 ignore 配置文件和 ignore 规则 -默认：true')
  .action(async (cmd) => {
    console.log(cmd)
    await installDepsIfThereNo();
    // const checking = ora()
    // checking.start(`执行 ${PKG_NAME} 代码检查`)

    const result = await scan({
      cwd,
      fix: false,
      include: cmd.include || cwd,
      quiet: Boolean(cmd.quiet),
      outputReport: Boolean(cmd.outputReport),
      ignore: cmd.ignore, // 对应 --no-ignore
    })
  })

program.parse(process.argv);