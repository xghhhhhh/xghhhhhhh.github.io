# 🌾 星露谷风格个人主页

> **Stop guessing your portfolio. Start farming your career.**
> 一个基于星露谷物语视觉风格的互动式个人主页，支持自主编辑、本地存储、零部署成本。

[![GitHub Pages](https://img.shields.io/badge/GitHub-Pages-blue?style=flat-square&logo=github)](https://pages.github.com/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow?style=flat-square)](https://opensource.org/licenses/MIT)
[![Made with 💚](https://img.shields.io/badge/Made%20with-💚-brightgreen?style=flat-square)]()
[![Stardew Style](https://img.shields.io/badge/Style-Stardew%20Valley-orange?style=flat-square)]()

---

## ✨ 功能特性

| 功能 | 说明 |
|------|------|
| 🎨 **星露谷像素风 UI** | 暖色调木质边框、像素云朵、漂浮装饰、草地渐变背景 |
| ✏️ **编辑模式** | 点击右上角"编辑模式"按钮，所有文字可点击直接编辑，卡片可增删改 |
| 💾 **本地自动保存** | 所有修改实时存入 `localStorage`，刷新不丢失 |
| 👁️ **访客计数器** | 每次打开页面自动 +1，数字滚动动画 |
| 💬 **留言板** | 支持访客留言，可删除管理 |
| 🏷️ **工具分类筛选** | AI编程 / 设计素材 / 学习效率 / 创客硬件 四大分类 |
| 🎮 **Konami Code 彩蛋** | 按 `↑↑↓↓←→←→BA` 触发彩虹模式 |
| 📱 **响应式设计** | 完美适配桌面 / 平板 / 手机 |
| ⚡ **零依赖部署** | 纯 HTML/CSS/JS，无需服务器，打开即跑 |

---

## 🚀 快速开始

### 方式一：直接打开（最快）

1. 下载本项目并解压
2. 双击打开 `index.html`
3. 浏览器自动加载，完事！

### 方式二：部署到 GitHub Pages（推荐）

#### Step 1：创建仓库

1. 登录 [GitHub](https://github.com/)，点击右上角 **+** → **New repository**
2. Repository name 填：`你的用户名.github.io`（推荐）或任意名称
3. 选择 **Public**，点击 **Create repository**

#### Step 2：上传文件

**方式 A：网页拖拽（推荐新手）**
1. 进入仓库页面，点击 **Add file** → **Upload files**
2. 把解压后的所有文件（`index.html`、`styles.css`、`script.js`）全选拖入
3. Commit message 填：`feat: 初始化星露谷个人主页`
4. 点击 **Commit changes**

**方式 B：Git 命令行**
```bash
# 克隆仓库
git clone https://github.com/你的用户名/你的仓库名.git
cd 你的仓库名

# 把项目文件复制进来
cp -r /path/to/stardew-profile/* .

# 提交推送
git add .
git commit -m "feat: 初始化星露谷个人主页"
git push origin main
```

#### Step 3：开启 GitHub Pages

1. 进入仓库 **Settings** → 左侧菜单 **Pages**
2. **Source** 选择 `Deploy from a branch`
3. **Branch** 选择 `main`，文件夹选 `/ (root)`
4. 点击 **Save**
5. 等待 1-2 分钟，访问 `https://你的用户名.github.io/你的仓库名/` 即可

---

## 📝 使用指南

### 编辑个人信息

1. 点击右上角 **✏️ 编辑模式** 按钮
2. 页面中所有**橙色虚线框**的文字都可以点击编辑：
   - 姓名、院校、求职意向
   - 欢迎语
   - 邮箱、GitHub、HuggingFace、微信
3. 点击文字 → 输入新内容 → 按 **Enter** 或点击其他地方保存
4. 按 **Esc** 可取消编辑
5. 再次点击 **✏️ 编辑模式** 退出编辑

### 管理项目卡片

- **编辑**：点击卡片右上角的 ✏️ 按钮，弹出编辑窗口
- **删除**：编辑窗口左下角有删除按钮
- **新增**：编辑模式下，卡片网格末尾会出现 `+ 添加项目` 按钮

### 管理随笔卡片

操作同上，编辑模式下卡片右上角出现编辑按钮。

### 管理工具资源

1. 点击分类标签（AI编程 / 设计素材 / 学习效率 / 创客硬件）筛选
2. 编辑模式下可新增、编辑、删除工具卡片

### 查看访客数

右上角导航栏实时显示当前访客计数（基于 `localStorage`）。

---

## 🎨 设计灵感

本项目视觉风格参考星露谷物语（Stardew Valley）的核心设计语言：

| 设计元素 | 星露谷原型 | 网页实现 |
|---------|------------|---------|
| 草地绿渐变背景 | 游戏开场草地场景 | CSS `linear-gradient` 天空→草地过渡 |
| 木质棕色边框 | 菜单面板木质纹理 | CSS `border` + `box-shadow` 立体效果 |
| 像素风格按钮 | 游戏内交互按钮 | CSS `box-shadow` 模拟像素边框 |
| 漂浮装饰物 | 蝴蝶、向日葵、四叶草 | CSS `@keyframes float` 循环动画 |
| 云朵飘动 | 天空云层 | CSS `@keyframes drift` 横移动画 |
| 温暖配色 | 金色 + 绿色 + 木头棕 | CSS 变量统一定义色板 |
| 数字滚动 | 技能升级数字动画 | `requestAnimationFrame` 缓动 |

---

## 📁 项目结构

```
stardew-profile/
├── index.html      ← 主页面结构（导航 + 5个区块）
├── styles.css      ← 全部样式（星露谷色板 + 动画 + 响应式）
├── script.js       ← 全部交互逻辑（编辑 + 存储 + 计数器 + 彩蛋）
└── README.md       ← 本文件
```

---

## 🛠️ 技术栈

- **HTML5** — 语义化结构
- **CSS3** — Grid 布局 + Flexbox + CSS 变量 + Keyframe 动画
- **Vanilla JavaScript** — 零框架依赖，原生 DOM 操作
- **LocalStorage API** — 本地数据持久化
- **Font Awesome 6.4** — 图标（CDN 引入）
- **Google Fonts** — Noto Sans SC + Press Start 2P（CDN 引入）

---

## 🎮 快捷键 & 彩蛋

| 操作 | 效果 |
|------|------|
| `↑↑↓↓←→←→BA` | 🌈 激活彩虹模式 5 秒 |
| 编辑模式下点击文字 | ✏️ 进入编辑状态 |
| `Enter` | 保存编辑 |
| `Esc` | 取消编辑 |
| 点击卡片 ✏️ | 打开编辑/新增模态框 |

---

## 📋 自定义清单

打开 `script.js`，修改 `defaultData` 对象即可自定义初始内容：

```javascript
const defaultData = {
    profile: {
        name: '你的名字',           // ← 改这里
        subtitle: '🎓 院校 · 年级',  // ← 改这里
        intent: '🎯 求职意向',       // ← 改这里
        welcome: '欢迎语...'          // ← 改这里
    },
    contact: {
        email: 'xxx@xxx.com',       // ← 改这里
        github: '@username',         // ← 改这里
        huggingface: '@username',    // ← 改这里
        wechat: 'wechat_id'          // ← 改这里
    },
    // projects, thoughts, tools 数组也可直接修改
};
```

> 💡 **建议**：先在浏览器里用编辑模式改好内容，数据会自动存入 `localStorage`。之后用开发者工具导出 `localStorage` 数据，替换 `script.js` 中的 `defaultData`，这样新访客也能看到你的内容。

---

## 🔒 隐私说明

- 所有数据存储在浏览器本地（`localStorage`），**不会上传到任何服务器**
- 访客计数器仅统计本地访问次数，不涉及 IP 或其他个人信息
- 留言板数据仅保存在当前浏览器的 `localStorage` 中

---

## 📄 License

MIT License — 自由使用、修改、分发。详见 [LICENSE](LICENSE)。

---

## 🙏 致谢

- **ConcernedApe** — 创造了星露谷物语这个温暖的世界
- **Font Awesome** — 提供丰富的开源图标
- **Google Fonts** — 提供 Noto Sans SC 和 Press Start 2P 字体

---

<p align="center">
  🌱 用心耕耘，静待花开 🌱<br>
  <sub>灵感来自星露谷物语 · 用 💚 和 AI 构建</sub>
</p>
