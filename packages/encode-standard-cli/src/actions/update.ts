/*
 * @Author: coderhhan 906271803@qq.com
 * @Date: 2024-03-11 23:12:39
 * @LastEditors: coderhhan 906271803@qq.com
 * @LastEditTime: 2024-03-19 23:32:31
 * @FilePath: \standardized-projects\packages\encode-standard-cli\src\actions\update.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import org from 'ora' //控制台loading的显示插件
import { execSync } from 'child_process'; //内置，执行简单命令行并返回结果  //中同步执行 shell 命令的方法之一, 需要简单地执行命令并获取输出
import log from '../utils/log';
import npmType from '../utils/npm-type';
import { PKG_NAME, PKG_VERSION } from '../utils/constants';



/**
 * 检查最新版本号
 */
const checkLatestVersion = async (): Promise<string | null> => {
  const npm = await npmType;
  const latestVersion = execSync(`${npm} view ${PKG_NAME} version`).toString('utf-8').trim();

  //版本一致不需要更新
  if (PKG_VERSION === latestVersion) return null;

  const compareArr = PKG_VERSION.split('.').map(Number);
  const beComparedArr = latestVersion.split('.').map(Number);

  // 依次比较版本号每一位大小
  for (let i = 0; i < compareArr.length; i++) {
    if (compareArr[i] > beComparedArr[i]) {
      return null;
    } else if (compareArr[i] < beComparedArr[i]) {
      return latestVersion;
    }
  }
};


/**
 * 检查包的版本
 * @param install - 自动安装最新包
 */
export default async (install = true) => {
  const checking = org(`[${PKG_NAME}] 正在检查最新版本...`)
  checking.start()
  try {
    const npm = await npmType
    //如果不需要更新则返回null 
    const latestVersion = await checkLatestVersion()
    checking.stop()

    if (latestVersion && install) {
      const update = org(`[${PKG_NAME}存在新版本，将升级至${latestVersion}]`)
      update.start()
      execSync(`${npm} i -g ${PKG_NAME}`)
      update.stop()

    } else if (latestVersion) {
      log.warn(
        `最新版本为${latestVersion},本地版本为${PKG_VERSION},请尽快升级到最新版本。\n你可以执行${npm} install -g ${PKG_NAME}@latest 来安装此版本\n`
      )
    } else if (install) {
      log.info('当前没有可用的更新')
    }
  } catch (e) {
    checking.stop()
    log.error(e)
  }

}