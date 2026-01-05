# Reading Card Generator (阅读卡片生成器)

一个优雅的在线文字排版与卡片生成工具，帮助你将文字转化为精美的图片。

## ✨ 核心特性

- **所见即所得编辑器**：左侧编辑，右侧实时预览
- **多样式支持**：
  - 支持 **Sticky Note (便利贴)** 风格（亮色/暗色模式，折角效果）
  - 支持多种经典纸张纹理（纯色、线条、网格、点阵）
  - 内置多种精选配色方案
- **丰富的排版控制**：
  - 自由调整字体、字号、行高、字间距
  - 支持段间距调节
  - 首行缩进与对齐方式设置
- **字体库**：
  - 集成 Google Fonts 14+ 款精选中文字体（宋体、黑体、楷体、手写体等）
  - 自动拼音转换：支持将作者名中的中文自动转换为拼音（用于版权显示）
- **高清导出**：
  - 支持导出 4倍超高清 PNG 图片
  - 智能处理长图排版

## 🛠 技术栈

- **前端框架**：[React](https://react.dev/) + [TypeScript](https://www.typescriptlang.org/)
- **构建工具**：[Vite](https://vitejs.dev/)
- **样式方案**：[Tailwind CSS](https://tailwindcss.com/)
- **状态管理**：[Zustand](https://github.com/pmndrs/zustand)
- **图片生成**：[html2canvas](https://html2canvas.hertzen.com/)
- **工具库**：[pinyin-pro](https://github.com/zh-lx/pinyin-pro) (中文转拼音), [clsx](https://github.com/lukeed/clsx)

## 🚀 快速开始

### 1. 克隆项目

```bash
git clone https://github.com/your-username/reading-card.git
cd reading-card
```

### 2. 安装依赖

```bash
npm install
```

### 3. 启动开发服务器

```bash
npm run dev
```

访问 `http://localhost:5173` 即可开始使用。

### 4. 构建生产版本

```bash
npm run build
```

## 📦 部署

本项目支持一键部署到 Vercel。

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2Fyour-username%2Freading-card)

## 📄 开源协议

本项目采用 [MIT License](LICENSE) 开源协议。

---

Copyright © 2024 Zerox. All Rights Reserved.
