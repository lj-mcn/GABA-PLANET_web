# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## 项目概述

这是一个名为"嘎巴星球"(Gaba Planet) 的中英双语静态网站，使用纯 HTML、CSS 和 JavaScript 构建。该网站具有复杂的国际化系统、分散式媒体布局和交互式组件。

## 开发命令

这是一个静态网站，没有构建系统或 package.json。开发和测试方法：

- **本地开发**：直接在浏览器中打开 HTML 文件或使用简单的 HTTP 服务器
- **文件服务**：使用 `python -m http.server` 或 `live-server` 在本地提供文件服务
- **无构建过程**：直接编辑文件 - 更改立即可见

## 核心架构

### 国际化系统 (i18n-simple.js)
该网站使用自定义国际化系统，支持中英文切换：
- **语言数据**：`window.i18nData` 包含中文(zh)和英文(en)翻译
- **自动更新**：所有带 `data-i18n` 属性的元素会自动更新
- **品牌图片切换**：语言切换时自动在 `GABA CHINESE.png` 和 `GABA PLANET.png` 之间切换
- **本地存储**：用户语言偏好保存在 localStorage 中
- **页面标题管理**：通过 `data-title-key` 动态设置页面标题

关键方法：
- `updateBrandImage()`: 处理品牌图片的语言切换
- `updateRotatingText()`: 更新头部轮换文本
- `t(key)`: 翻译键值查找

### 分散媒体系统
首页使用独特的绝对定位媒体布局：
- **7个视频元素** (`.video-item-1` 到 `.video-item-7`)：每个都有特定的位置、旋转角度和z-index
- **5个图片元素** (`.image-item-1` 到 `.image-item-5`)：分散放置在页面各处
- **背景图片**：`images/background.png` 作为固定背景
- **坐标系统**：使用百分比定位 + `transform` 实现精确布局
- **响应式调整**：移动端 (max-width: 768px) 自动缩小尺寸

重要提示：修改媒体元素位置时需考虑整体视觉平衡和重叠关系。

### CSS架构模式
- **CSS自定义属性**：大量使用CSS变量定义字体、尺寸等
- **固定定位系统**：头部、页脚、媒体元素使用固定定位
- **Z-index层级**：系统化的z-index管理 (头部:100, 媒体:变化, 社交图标:100)
- **响应式设计**：基于断点的媒体查询调整

### 页面结构模式
所有页面遵循一致结构：
- **固定头部**：汉堡菜单、轮换文本、语言切换器
- **装饰元素**：星星、涂鸦、云朵等CSS动画元素
- **侧边菜单**：覆盖式导航菜单
- **内容包装器**：底部内边距防止与页脚重叠
- **AI聊天机器人**：所有页面都包含的交互组件

### JavaScript模块组织
- **main.js**：核心交互功能（菜单、轮换文本、FAQ手风琴、视频模态框）
- **i18n-simple.js**：完整的国际化系统
- **chatbot.js**：AI助手组件，包含Coze API集成

### 社交媒体图标系统
- **双侧布局**：`.social-left` 和 `.social-right` 容器
- **固定底部定位**：space-between布局
- **自定义SVG图标**：小红书、微信、Twitter、Instagram
- **指针事件管理**：容器禁用交互，单个图标重新启用

## 关键特性

### 品牌切换机制
品牌图片 (`#brandImage`) 根据语言自动切换：
- 中文：显示 `images/GABA CHINESE.png`
- 英文：显示 `images/GABA PLANET.png`

### 媒体定位系统
使用坐标式布局，每个媒体元素有：
- 具体像素位置 (如 `top: 70%; left: 50%`)
- Transform组合 (如 `translateX(-50%) rotate(-5deg)`)
- 精确的尺寸规格 (如 `width: 400px; height: 300px`)

### 交互功能
- **轮换文本动画**：2秒间隔，淡入淡出过渡
- **FAQ手风琴**：单项展开，平滑过渡
- **视频模态框**：ESC键支持、自动播放控制、滚动锁定
- **装饰动画**：CSS关键帧动画用于星星、涂鸦、云朵

## 重要注意事项
- 修改媒体元素位置时需考虑视觉平衡和设备适配
- 国际化文本更改需同时更新中英文版本
- 所有新的可翻译内容都需要添加 `data-i18n` 属性
- 品牌图片切换是自动的，无需手动处理
- 社交媒体图标使用SVG，支持颜色继承 (`stroke="currentColor"`)

## 内容语言
网站支持简体中文和英文双语，所有界面元素都支持动态语言切换。品牌名称为"嘎巴星球"(Gaba Planet)。
