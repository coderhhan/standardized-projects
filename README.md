# fe-spec

前端编码规范工程化

## :mountain: 能力支持

### 1. 全面的前端生态

支持前端全部生态，无需关注环境，支持直接使用

### 2. 完善的规范配件

支持对全部前端配置实现一键接入、一键扫描、一键修复、一键升级

### 3. 完整的测试用例

配套完整的测试用例，提升项目健壮性

## :star: 设计目的

制定前端团队的代码规范，提高了前端开发效率,一致性的代码规范可以增强团队开发协作效率、提高代码质量、减少遗留系统维护的负担.以最小成本的推广，产出一套完整化的前端编码规范工具，不仅能够解决存量项目的编码异味，还能够保证后续所有项目的编码质量。

## :couch_and_lamp: 配套工具

我们引入了多个业界流行的 `Linter` 作为规范文档的配套工具，并根据规范内容定制了对应的规则包，它们包括：

| 规范                                                              | Lint 工具                                                      | npm 包                                                                                 |
| ----------------------------------------------------------------- | -------------------------------------------------------------- | -------------------------------------------------------------------------------------- |
| JavaScript 编码规范 <br/> TypeScript 编码规范 <br/> Node 编码规范 | [ESLint](https://eslint.org/)                                  | [eslint-config-hh](https://www.npmjs.com/package/eslint-config-hh)             |
| CSS 编码规范                                                      | [stylelint](https://stylelint.io/)                             | [stylelint-config-hh](https://www.npmjs.com/package/stylelint-config-hh)       |
| Git 规范                                                          | [commitlint](https://commitlint.js.org/#/)                     | [commitlint-config-hh](https://www.npmjs.com/package/commitlint-config-hh)     |
| 文档规范                                                          | [markdownlint](https://github.com/DavidAnson/markdownlint)     | [markdownlint-config-hh](https://www.npmjs.com/package/markdownlint-config-hh) |
| Eslint 插件                                                       | [ESlint Plugin](https://eslint.org/docs/latest/extend/plugins) | [eslint-plugin-hh](https://www.npmjs.com/package/eslint-plugin-hh)             |

[hh-fe-lint](https://www.npmjs.com/package/hh-fe-lint) 收敛屏蔽了上述依赖和配置细节，提供简单的 `CLI` 和 `Node.js API`，让项目能够一键接入、一键扫描、一键修复、一键升级，并为项目配置 git commit 卡口，降低项目接入规范的成本。

您可以使用[hh-fe-lint](https://www.npmjs.com/package/hh-fe-lint) 方便地为项目接入全部规范。

## 其他

## 测试`markdown config`

全局安装`markdownlint-cli`

```bash
npm i -g markdownlint-cli
pnpm run lint
```

### 生成`CHANGELOG`

参考[conventional-changelog-cli](https://www.npmjs.com/package/conventional-changelog-cli)，全局安装`conventional-changelog-cli`：

```bash
npm install -g conventional-changelog-cli
pnpm run changelog
```

## :email: 联系

- **前端编码规范工程化** <https://hh-studio-fe.github.io/standardized-projects/>
- **GitHub**: <https://github.com/coderhhan/standardized-projects>

</br>
