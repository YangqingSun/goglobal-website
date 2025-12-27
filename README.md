# Go Global Patent - CES 2026 展会宣传网站

专业的"中美专利服务"响应式单页应用网站，专为 CES 2026 展会宣传设计。

## 项目概述

这是一个纯静态网站，使用 HTML5 + Tailwind CSS + 原生 JavaScript 构建，完全兼容 Cloudflare Pages 免费版部署。

## 技术栈

- **HTML5**: 语义化标记
- **Tailwind CSS**: 通过 CDN 引入，响应式设计
- **原生 JavaScript**: 无依赖，纯静态交互
- **部署平台**: Cloudflare Pages

## 项目结构

```
GoGlobalPatent/
├── index.html          # 主页面文件
├── script.js           # JavaScript 交互逻辑
├── assets/             # 资源文件夹（图片等）
└── README.md           # 项目说明文档
```

## 功能特性

### 1. 双语支持
- 默认英文（En）
- 支持中文（中）切换
- 所有内容均支持双语显示

### 2. 响应式设计
- 移动端友好
- 平板和桌面端优化
- 使用 Tailwind CSS 实现自适应布局

### 3. 页面板块
- **Hero Section**: 首屏展示，包含主要 CTA
- **Trust Bar**: 信任背书信息
- **Target Audience**: 三栏卡片展示目标客户
- **Services**: 服务列表（发明专利、实用新型、外观设计）
- **About Us**: 公司使命
- **Contact Form**: 联系表单
- **Footer**: 页脚信息和社交媒体链接

### 4. SEO 优化
- 完整的 meta 标签
- Open Graph 标签
- 语义化 HTML 结构
- Canonical URL 设置

## 部署到 Cloudflare Pages

### 方法一：通过 Git 仓库

1. 将代码推送到 GitHub/GitLab/Bitbucket
2. 登录 Cloudflare Dashboard
3. 进入 Pages 部分
4. 点击 "Create a project"
5. 连接你的 Git 仓库
6. 构建设置：
   - **Build command**: 留空（纯静态网站）
   - **Build output directory**: `/` (根目录)
7. 点击 "Save and Deploy"

### 方法二：直接上传

1. 登录 Cloudflare Dashboard
2. 进入 Pages 部分
3. 点击 "Create a project" > "Upload assets"
4. 上传整个项目文件夹
5. 点击 "Deploy site"

## 本地开发

### 使用本地服务器

由于使用了相对路径，建议使用本地服务器运行：

**Python 3:**
```bash
python -m http.server 8000
```

**Node.js (http-server):**
```bash
npx http-server
```

**PHP:**
```bash
php -S localhost:8000
```

然后在浏览器中访问 `http://localhost:8000`

### 直接打开

也可以直接双击 `index.html` 文件在浏览器中打开，但某些功能可能受限。

## 自定义配置

### 更换 Logo

1. 将 Logo 图片放入 `assets/` 文件夹
2. 在 `index.html` 中找到导航栏的 Logo 部分（约第 67 行）
3. 替换 Logo placeholder：
```html
<img src="./assets/logo.png" alt="Go Global Patent Logo" class="w-10 h-10">
```

### 修改品牌颜色

在 `index.html` 的 `<script>` 标签中（Tailwind 配置部分）修改颜色值：
```javascript
colors: {
    'brand-blue': '#1e40af',      // 主蓝色
    'brand-light-blue': '#3b82f6', // 浅蓝色
    'brand-dark': '#0f172a',      // 深色背景
}
```

### 连接表单后端

当前表单为纯前端实现。要连接后端服务，可以：

1. **使用 Formspree**:
   - 注册 Formspree 账号
   - 获取表单 ID
   - 在 `script.js` 的 `handleFormSubmit` 函数中取消注释相关代码
   - 替换 `YOUR_FORM_ID` 为实际 ID

2. **使用其他服务**:
   - 修改 `script.js` 中的 fetch 请求
   - 指向你的后端 API 端点

## 浏览器支持

- Chrome (最新版)
- Firefox (最新版)
- Safari (最新版)
- Edge (最新版)
- 移动端浏览器

## 注意事项

1. **图片资源**: Hero 背景图使用 Unsplash CDN，如需替换请使用相对路径指向 `assets/` 文件夹
2. **表单提交**: 当前为演示模式，实际部署需要配置后端服务
3. **社交媒体**: Footer 中的社交媒体区域为占位符，可替换为实际二维码图片
4. **路径**: 所有资源路径使用相对路径，确保部署后正常工作

## 许可证

© 2025 Go Global Patent. All Rights Reserved.

## 联系方式

- **Email**: info@goglobalpatent.com
- **Website**: https://goglobalpatent.com

