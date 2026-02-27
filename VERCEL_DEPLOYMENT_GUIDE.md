# 🚀 Vercel部署详细指南

**项目：** 志信纸业 B2B 独立站  
**域名：** xadyz.com  
**预计时间：** 10分钟

---

## ✅ 准备工作已完成

我已经为您创建了以下配置文件：

1. ✅ `.gitignore` - Git忽略文件配置
2. ✅ `vercel.json` - Vercel部署配置
3. ✅ `package.json` - 已包含正确的build命令

---

## 📋 方案选择

### 🎯 方案A：使用Vercel CLI（命令行，最快）

**优势：**
- ⚡ 最快（5分钟完成）
- 🔧 无需手动配置GitHub
- 🎛️ 完全控制部署过程

**适合：** 熟悉命令行的开发者

### 🎯 方案B：使用Vercel网页界面（图形化，推荐）

**优势：**
- 👁️ 可视化操作
- 🔄 自动Git集成
- 📊 部署历史管理

**适合：** 所有用户（推荐）

---

## 🚀 方案A：Vercel CLI部署（最快）

### 步骤1：安装Vercel CLI

打开终端，执行：

```bash
npm install -g vercel
```

### 步骤2：登录Vercel

```bash
vercel login
```

选择登录方式：
- GitHub（推荐）
- GitLab
- Bitbucket
- Email

### 步骤3：部署项目

在项目根目录执行：

```bash
vercel
```

CLI会提示以下问题，按提示回答：

```
? Set up and deploy "~/zhixin-paper"? [Y/n] 
→ 输入：Y

? Which scope do you want to deploy to?
→ 选择你的账号

? Link to existing project? [y/N]
→ 输入：N（第一次部署）

? What's your project's name?
→ 输入：zhixin-paper 或 xadyz

? In which directory is your code located?
→ 按回车（默认 ./）

? Want to override the settings? [y/N]
→ 输入：N（使用vercel.json配置）
```

### 步骤4：等待部署完成

```
🔍 Inspect: https://vercel.com/your-name/zhixin-paper/xxxxx
✅ Production: https://zhixin-paper.vercel.app
```

**✅ 部署完成！**

### 步骤5：添加自定义域名

```bash
vercel domains add xadyz.com
vercel domains add www.xadyz.com
```

按提示配置DNS（参考腾讯云DNSPod配置指南）

---

## 🌐 方案B：Vercel网页界面部署（推荐）

### 步骤1：推送代码到GitHub

#### 1.1 初始化Git（如果还没有）

```bash
git init
git add .
git commit -m "Initial commit - Zhixin Paper B2B Website"
```

#### 1.2 创建GitHub仓库

1. 访问：https://github.com/new
2. **Repository name：** `zhixin-paper`
3. **Description：** Zhixin Paper B2B Website for Russian & CIS Markets
4. **Visibility：** Private（推荐）或 Public
5. **不要**勾选 "Add a README file"
6. 点击 "Create repository"

#### 1.3 关联并推送代码

GitHub会显示命令，复制执行：

```bash
# 添加远程仓库（替换YOUR_USERNAME为你的GitHub用户名）
git remote add origin https://github.com/YOUR_USERNAME/zhixin-paper.git

# 推送代码
git branch -M main
git push -u origin main
```

**✅ 检查点：** 在GitHub仓库页面能看到所有文件

---

### 步骤2：注册/登录Vercel

1. 访问：https://vercel.com
2. 点击右上角 "Sign Up"（如果已有账号点击 "Log In"）
3. **选择 "Continue with GitHub"**
4. 授权Vercel访问GitHub

**✅ 成功登录后进入Vercel Dashboard**

---

### 步骤3：导入GitHub项目

#### 3.1 创建新项目

1. 点击 "Add New..." 按钮
2. 选择 "Project"

#### 3.2 导入仓库

1. 在 "Import Git Repository" 页面
2. 找到 `zhixin-paper` 仓库
3. 点击 "Import"

**如果看不到仓库：**
- 点击 "Adjust GitHub App Permissions"
- 授权Vercel访问该仓库

---

### 步骤4：配置项目设置

Vercel会自动检测到这是Vite项目，显示配置：

```
PROJECT NAME
zhixin-paper

FRAMEWORK PRESET
Vite

ROOT DIRECTORY
./

BUILD COMMAND
npm run build

OUTPUT DIRECTORY
dist

INSTALL COMMAND
npm install
```

#### ✅ 保持默认配置，直接进行下一步

**可选：环境变量**

如果将来需要配置API密钥等：
1. 展开 "Environment Variables"
2. 添加变量（现在不需要）

---

### 步骤5：部署项目

1. 检查配置无误后，点击 **"Deploy"** 按钮
2. Vercel开始构建和部署

#### 部署过程（约2-3分钟）：

```
🔄 Queued...
📦 Installing dependencies...
🔨 Building...
✅ Deploying...
🎉 Success!
```

#### 部署成功界面：

```
🎉 Congratulations!

Your project has been successfully deployed.

🔗 https://zhixin-paper.vercel.app
   ↳ Visit your project
```

**✅ 检查点：** 点击链接，验证网站正常显示

---

### 步骤6：添加自定义域名

#### 6.1 进入项目设置

1. 在项目页面，点击顶部 "Settings"
2. 左侧菜单点击 "Domains"

#### 6.2 添加主域名

1. 在 "Add Domain" 输入框输入：`xadyz.com`
2. 点击 "Add"
3. Vercel显示DNS配置提示

#### 6.3 添加www子域名

1. 再次输入：`www.xadyz.com`
2. 点击 "Add"

---

### 步骤7：配置DNS（参考腾讯云指南）

Vercel会显示需要配置的DNS记录：

```
For xadyz.com:
┌─────────────────────────────────────┐
│ Type: A                             │
│ Name: @                             │
│ Value: 76.76.21.21                  │
└─────────────────────────────────────┘

For www.xadyz.com:
┌─────────────────────────────────────┐
│ Type: CNAME                         │
│ Name: www                           │
│ Value: cname.vercel-dns.com         │
└─────────────────────────────────────┘
```

#### 在腾讯云DNSPod配置：

1. 访问：https://console.cloud.tencent.com/cns
2. 找到 `xadyz.com`，点击 "解析"
3. 添加上述2条DNS记录

**详细步骤请参考：** `/TENCENT_DNSPOD_SETUP_GUIDE.md`

---

### 步骤8：等待DNS生效

#### 验证DNS（5-30分钟）

**在线检查：**
https://dnschecker.org
输入：`xadyz.com`

**命令行检查：**
```bash
# Windows
nslookup xadyz.com

# Mac/Linux
dig xadyz.com
```

#### 验证Vercel域名状态

1. 回到Vercel → Settings → Domains
2. 查看域名状态：

```
✓ xadyz.com - Valid Configuration
✓ www.xadyz.com - Valid Configuration
```

**如果显示 "Invalid Configuration"：**
- 点击域名旁的刷新按钮
- 等待5-10分钟后重试

---

### 步骤9：等待SSL证书生效（自动）

DNS生效后，Vercel会自动申请Let's Encrypt SSL证书

**时间：** 5-30分钟

#### 验证HTTPS

访问以下链接，确保正常显示：
- https://xadyz.com ✓
- https://www.xadyz.com ✓

**✅ 成功标志：**
- 浏览器地址栏显示 🔒 锁图标
- URL以 `https://` 开头
- 没有证书错误警告

---

## 🎯 部署完成检查清单

### ✅ GitHub配置
- [ ] 代码已推送到GitHub
- [ ] 仓库包含所有文件
- [ ] .gitignore文件存在

### ✅ Vercel配置
- [ ] 项目已成功导入
- [ ] 临时域名可访问（xxx.vercel.app）
- [ ] 构建命令：`npm run build`
- [ ] 输出目录：`dist`

### ✅ 域名配置
- [ ] xadyz.com已添加
- [ ] www.xadyz.com已添加
- [ ] DNS记录已在腾讯云配置
- [ ] DNS已生效（dnschecker.org验证）

### ✅ SSL证书
- [ ] https://xadyz.com 可访问
- [ ] https://www.xadyz.com 可访问
- [ ] 浏览器显示🔒安全锁
- [ ] 证书有效期正常

### ✅ 网站功能
- [ ] 首页正常显示
- [ ] 三语言切换正常（EN/RU/ZH）
- [ ] 所有18个页面可访问
- [ ] WhatsApp链接正常
- [ ] Telegram链接正常
- [ ] 移动端响应式正常

---

## 🔄 自动部署配置

### Git自动部署（已自动启用）

Vercel已自动配置Git集成：

**当你推送代码到GitHub时，Vercel会自动：**
1. 🔍 检测到代码更新
2. 📦 自动构建项目
3. 🚀 自动部署到生产环境
4. ✅ 更新 https://xadyz.com

#### 测试自动部署：

```bash
# 修改任意文件
git add .
git commit -m "Test auto deployment"
git push

# Vercel会自动开始部署
```

在Vercel Dashboard可以看到部署进度。

---

## 📊 Vercel Dashboard功能

### 1. 部署历史

**路径：** 项目首页

查看所有部署记录：
- 部署时间
- Git commit信息
- 构建日志
- 部署状态

**功能：**
- 回滚到任意历史版本
- 查看部署日志
- 查看构建时间

### 2. 分析（Analytics）

**路径：** Analytics标签

查看网站访问数据：
- 页面浏览量
- 访客来源
- 设备类型
- 地理位置

**免费额度：** 每月10万次请求

### 3. 日志（Logs）

**路径：** Logs标签

实时查看：
- 访问日志
- 错误日志
- 函数日志

### 4. 环境变量

**路径：** Settings → Environment Variables

配置敏感信息：
- API密钥
- 数据库连接
- 第三方服务凭证

**环境类型：**
- Production（生产环境）
- Preview（预览环境）
- Development（开发环境）

---

## ⚡ 性能优化

### 已自动启用的优化

Vercel默认提供：

1. ✅ **全球CDN** - 150+节点
2. ✅ **自动压缩** - Gzip/Brotli
3. ✅ **图片优化** - 自动WebP转换
4. ✅ **边缘缓存** - 静态资源缓存
5. ✅ **HTTP/2** - 多路复用
6. ✅ **Smart CDN** - 智能路由

### 进一步优化（可选）

#### 1. 图片优化

使用Vercel Image Optimization：

```jsx
import Image from 'next/image'; // 如果使用Next.js

// 或使用原生优化
<img 
  src="/images/photo.jpg" 
  loading="lazy" 
  decoding="async"
/>
```

#### 2. 代码分割

Vite已自动配置代码分割，无需额外配置。

#### 3. 预加载关键资源

在 `index.html` 添加：

```html
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="dns-prefetch" href="https://api.example.com">
```

---

## 🔧 常见问题解决

### ❌ 问题1：构建失败（Build Failed）

**错误信息：**
```
Error: Build failed with exit code 1
```

**可能原因：**
1. package.json依赖版本冲突
2. 构建命令错误
3. 内存不足

**解决方案：**

1. 检查构建日志：
   - 在Vercel Dashboard点击失败的部署
   - 查看完整日志

2. 本地测试构建：
```bash
npm run build
```

3. 如果本地构建成功但Vercel失败：
   - Settings → General → Node.js Version
   - 改为 18.x 或 20.x

---

### ❌ 问题2：404 Not Found

**访问子页面时显示404**

**原因：** SPA路由配置问题

**解决方案：**

vercel.json已包含重写规则：
```json
{
  "rewrites": [
    {
      "source": "/(.*)",
      "destination": "/index.html"
    }
  ]
}
```

如果仍有问题，检查：
1. vercel.json文件是否存在
2. 重新部署项目

---

### ❌ 问题3：环境变量不生效

**代码中无法读取环境变量**

**解决方案：**

1. 在Vercel添加环境变量：
   - Settings → Environment Variables
   - 添加变量（如：`VITE_API_KEY`）
   - **重要：** Vite环境变量必须以 `VITE_` 开头

2. 重新部署项目：
   - Deployments → 最新部署 → 右侧菜单 → Redeploy

---

### ❌ 问题4：自定义域名无法访问

**DNS配置后仍无法访问**

**检查清单：**

1. DNS记录是否正确：
   - A记录：@ → 76.76.21.21
   - CNAME：www → cname.vercel-dns.com

2. DNS是否生效：
   - https://dnschecker.org
   - 输入：xadyz.com

3. Vercel域名状态：
   - Settings → Domains
   - 确保显示 "Valid Configuration"

4. 清除本地DNS缓存：
```bash
# Windows
ipconfig /flushdns

# Mac
sudo dscacheutil -flushcache; sudo killall -HUP mDNSResponder
```

---

### ❌ 问题5：部署后样式丢失

**网站显示但CSS不生效**

**可能原因：**
1. Tailwind CSS未正确构建
2. 路径配置错误

**解决方案：**

1. 检查 `vite.config.ts`：
```typescript
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(), // ← 确保存在
  ],
})
```

2. 检查构建日志，确保没有CSS相关错误

3. 清除Vercel缓存重新部署：
   - Deployments → Redeploy

---

## 📱 移动端测试

部署完成后，务必在移动设备测试：

### iOS测试
- Safari浏览器
- Chrome浏览器
- 微信内置浏览器

### Android测试
- Chrome浏览器
- 微信内置浏览器
- Yandex浏览器（俄罗斯市场重要！）

### 测试要点
- [ ] 页面正常显示
- [ ] 触摸操作正常
- [ ] WhatsApp链接自动打开App
- [ ] Telegram链接自动打开App
- [ ] 表单可正常填写
- [ ] 图片正常加载

---

## 🌍 国际化测试

### 语言切换测试

测试所有语言版本：

1. **英语（EN）：** https://xadyz.com/en/
2. **俄语（RU）：** https://xadyz.com/ru/
3. **中文（ZH）：** https://xadyz.com/zh/

### 测试清单
- [ ] 语言切换按钮正常
- [ ] URL路径正确
- [ ] 内容完全翻译
- [ ] 日期格式正确
- [ ] 货币符号正确

---

## 🚀 部署后优化建议

### 1. 配置Analytics

#### Google Analytics 4
1. 创建GA4账号：https://analytics.google.com
2. 获取Measurement ID
3. 添加到网站

#### Yandex Metrica（俄罗斯市场必备！）
1. 创建账号：https://metrica.yandex.com
2. 获取Counter ID
3. 添加跟踪代码

### 2. SEO优化

#### Google Search Console
1. 验证网站：https://search.google.com/search-console
2. 提交sitemap：https://xadyz.com/sitemap.xml

#### Yandex Webmaster
1. 验证网站：https://webmaster.yandex.com
2. 提交sitemap

### 3. 性能监控

#### Vercel Analytics（推荐）
- 已自动启用
- 查看：Analytics标签

#### 第三方工具
- Google PageSpeed Insights
- GTmetrix
- WebPageTest

---

## 📊 成本说明

### Vercel免费计划（Hobby）

**包含：**
- ✅ 无限部署
- ✅ 100 GB带宽/月
- ✅ 自动SSL证书
- ✅ 全球CDN
- ✅ Analytics（10万请求/月）
- ✅ 无限自定义域名

**限制：**
- 单个文件最大6MB
- 函数执行时间10秒
- 构建时间45分钟

**升级：**
- Pro计划：$20/月
- 更高带宽和性能

**对于B2B网站，免费计划完全足够！**

---

## 🎉 恭喜！部署成功

您的网站现已成功部署到：

🌐 **临时域名：** https://zhixin-paper.vercel.app  
🌐 **正式域名：** https://xadyz.com

**下一步建议：**

1. ✅ 完成DNS配置（如未完成）
2. ✅ 配置表单后端（任务#2）
3. ✅ 集成Analytics（任务#4）
4. ✅ SEO优化和验证
5. ✅ 准备三语言Tender Pack PDF

---

## 📞 获取帮助

### Vercel官方资源
- 文档：https://vercel.com/docs
- 社区：https://github.com/vercel/vercel/discussions
- Discord：https://vercel.com/discord

### 状态监控
- 服务状态：https://www.vercel-status.com

### 常用链接
- Dashboard：https://vercel.com/dashboard
- 项目设置：https://vercel.com/your-name/zhixin-paper/settings

---

**祝您部署顺利！🚀**

如有任何问题，随时询问！
