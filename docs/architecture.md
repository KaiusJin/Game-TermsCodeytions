# Terms & Codeytions：架构设计

## 1. 项目概述

为滑铁卢大学 CS Club 制作的轻量浏览器解谜游戏，玩法灵感来自 Agreee。玩家面对一系列协议条款，通过探索界面，找到点击 Agree 的方法。

关卡可以围绕按钮逃跑、消失、被遮挡或界面变化展开，难度逐步提升，结合校园与编程幽默。具体关卡数量、解法和交互细节在开发时确定。

## 2. 技术栈

| 技术 | 用途 |
| --- | --- |
| React + TypeScript | 页面组件、游戏逻辑与类型约束 |
| HTML / CSS | 页面布局、样式与响应式适配 |
| Framer Motion | 按钮移动、元素显隐和过渡动画 |
| Vite | 本地开发与静态构建 |

采用纯前端单页应用，使用 React 自带能力管理状态，localStorage 保存简单进度，无需后端或数据库。

## 3. 项目结构

```text
src/
├── App.tsx              # 页面切换、计时与流程编排
├── assets.ts            # public/assets 路径工具
├── components/          # 页面级与公共组件（协议框、工具栏、完成页、对话框内容）
│   └── answerKey/       # 隐藏答案面板及其触发 hook（测试用）
├── content/
│   ├── en.ts            # 界面文案
│   └── levels.ts        # 50 关的条款、提示、答案、难度与时限（纯数据）
├── game/
│   ├── types.ts         # 关卡类型
│   ├── state.ts         # 流程 reducer 与存档（只依赖关卡元数据）
│   ├── run.ts           # 随机抽关
│   └── levels.ts        # 关卡注册表：元数据 + 组件
├── levels/
│   ├── shared/          # 关卡共用的按钮、舞台、插画与代码编辑器样式
│   └── tier1/ … tier5/  # 每关一个组件 + 同名样式文件
└── styles/global.css    # 主题变量与全局样式

public/assets/           # Codey 插画与 CSC 标志
```

新增关卡：在 `content/levels.ts` 添加元数据，在对应 `levels/tierN/` 新建组件与样式，再在 `game/levels.ts` 注册。

## 4. 模块职责

- **页面与流程**：组织首页、游戏页和完成页，管理当前关卡、重试与进度。
- **关卡**：每关独立负责自己的谜题与动画，完成后通知游戏流程。新增关卡时添加组件并更新关卡配置。
- **公共组件**：复用协议卡片、提示区域和 Codey 展示等基础界面。
- **文案与素材**：集中维护内容，避免分散在各处重复定义。

整体流程为：首页 → 逐关解谜 → Agree 印章 → 自动进入下一关 → 全部结束后显示完成页。每次开始从 50 关中按难度档随机抽取 15 关；每关限时默认 20 秒（个别关卡更长），操作失败或超时显示红色 Disagree 印章，短暂停留后重置本关并重新计时。关卡内部交互与整体游戏流程分开管理。

## 5. 视觉与素材

界面参考简洁的在线协议表单，采用蓝白配色、浅蓝点缀和清晰留白，融入 CSC 标识和 Codey。动画服务于谜题和幽默反馈，同时兼顾手机布局与基本键盘操作。

可使用的本地素材（路径相对于项目根目录）：

- `../CSC/www-new/images/home/codey_sitting.svg`
- `../CSC/www-new/images/codey-404.svg`
- `../CSC/www-new/images/events/codey-events.svg`
- `../CSC/www-new/images/get-involved/codey.svg`
- `../CSC/www-new/images/logo-icon.svg`

将实际使用的素材复制到 `public/assets/` 并记录来源，保留原有造型与比例。

## 6. 实现原则

先用一个关卡打通完整流程，再逐步增加玩法。保持组件职责清楚、代码简洁，有实际复用需求时再抽象；以关卡可完成、操作流畅、构建正常作为基本交付要求。
