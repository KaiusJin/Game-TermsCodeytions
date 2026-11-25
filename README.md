# Terms & Codeytions

为 Waterloo CS Club 制作的轻量浏览器解谜游戏，使用 React、TypeScript、Vite 和 Framer Motion。

## 运行

使用 Node.js 22.12+（或兼容的较新版本）：

```sh
npm install
npm run dev
```

## 当前完成

- 蓝白色首页、游戏界面、成功反馈与完成页。
- 50 关关卡池，每次随机抽取 15 关，难度递增。
- 使用现有 Codey 插画和 CSC 标志。
- 每关有两级提示、重试和本地收集记录。
- 隐藏答案面板（测试用）：在页面空白处键入 `codey`，或快速连点页脚 ✳ 五次。
- 支持窄屏、键盘操作和减少动态效果设置。

## 检查与构建

```sh
npm run typecheck
npm run lint
npm run test
npm run build
npm run preview
```

构建输出在 `dist/`，可部署到静态托管服务。本次未部署。

## 文件

- `src/content/en.ts`：界面文案；`src/content/levels.ts`：50 关的条款、提示与答案。
- `src/levels/tierN/`：每关一个组件与样式；`src/levels/shared/`：关卡共用部件。
- `src/game/`：流程、随机抽关、存档与关卡注册表。
- `src/components/`：公共界面。
- `public/assets/README.md`：素材来源。

项目约定见 [Agent.md](Agent.md)，设计见 [架构文档](docs/architecture.md)。
