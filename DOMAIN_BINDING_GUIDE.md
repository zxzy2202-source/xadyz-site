# 🌐 xadyz.com 域名绑定指南

**域名：** xadyz.com  
**项目：** 志信纸业 B2B 独立站  
**技术栈：** React + Vite + Tailwind CSS

---

## 📋 目录

1. [推荐部署平台](#推荐部署平台)
2. [Vercel部署方案（推荐）](#vercel部署方案推荐)
3. [Netlify部署方案](#netlify部署方案)
4. [传统服务器部署方案](#传统服务器部署方案)
5. [DNS配置指南](#dns配置指南)
6. [SSL证书配置](#ssl证书配置)
7. [上线前检查清单](#上线前检查清单)

---

## 🎯 推荐部署平台

### ⭐ 方案1：Vercel（最推荐）
**优势：**
- ✅ 完全免费（个人/商业项目）
- ✅ 自动SSL证书（Let's Encrypt）
- ✅ 全球CDN加速
- ✅ 自动构建部署（Git集成）
- ✅ 优秀的Vite支持
- ✅ 自定义域名绑定简单
- ✅ **支持中国大陆访问**（有备案要求）

**适合：** 快速上线、无需服务器管理

---

### ⭐ 方案2：Netlify
**优势：**
- ✅ 免费方案慷慨
- ✅ 自动SSL证书
- ✅ 全球CDN
- ✅ 表单处理（免费100次提交/月）
- ✅ 自动部署

**适合：** 需要内置表单功能

---

### ⭐ 方案3：传统服务器（阿里云/腾讯云）
**优势：**
- ✅ 完全控制
- ✅ 可备案（中国大陆必需）
- ✅ 可集成后端服务
- ✅ 俄罗斯用户访问速度更好

**适合：** 需要完全控制、已有服务器

---

## 🚀 Vercel部署方案（推荐）

### 步骤1：准备代码仓库

#### 1.1 创建GitHub仓库
```bash
# 在项目根目录初始化Git
git init

# 添加所有文件
git add .

# 提交
git commit -m "Initial commit - Zhixin Paper B2B Website"

# 在GitHub创建新仓库后，关联远程仓库
git remote add origin https://github.com/YOUR_USERNAME/zhixin-paper.git

# 推送代码
git push -u origin main
```

#### 1.2 检查项目配置
确保 `package.json` 包含正确的构建命令：
```json
{
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "preview": "vite preview"
  }
}
```

---

### 步骤2：部署到Vercel

#### 2.1 注册Vercel账号
1. 访问：https://vercel.com
2. 使用GitHub账号登录
3. 授权Vercel访问你的GitHub仓库

#### 2.2 导入项目
1. 点击 "Add New Project"
2. 选择 `zhixin-paper` 仓库
3. Vercel会自动检测到Vite项目

#### 2.3 配置构建设置
```
Framework Preset: Vite
Build Command: npm run build
Output Directory: dist
Install Command: npm install
```

#### 2.4 点击 "Deploy"
等待2-3分钟，Vercel会自动构建并部署项目。

部署完成后，你会得到一个临时域名：
```
https://zhixin-paper.vercel.app
```

---

### 步骤3：绑定自定义域名 xadyz.com

#### 3.1 在Vercel添加域名
1. 进入项目设置
2. 点击 "Domains"
3. 输入：`xadyz.com`
4. 点击 "Add"

#### 3.2 同时添加www子域名
```
www.xadyz.com
```

#### 3.3 Vercel会提供DNS配置信息
```
记录类型: A
主机记录: @
记录值: 76.76.21.21

记录类型: CNAME
主机记录: www
记录值: cname.vercel-dns.com
```

---

### 步骤4：配置DNS（在域名注册商）

#### 4.1 登录域名注册商
- 如果在阿里云：https://dns.console.aliyun.com
- 如果在腾讯云：https://console.cloud.tencent.com/cns
- 如果在GoDaddy/Namecheap等国际注册商

#### 4.2 添加DNS记录

**主域名（xadyz.com）：**
```
类型：A
主机记录：@
记录值：76.76.21.21
TTL：10分钟
```

**www子域名：**
```
类型：CNAME
主机记录：www
记录值：cname.vercel-dns.com
TTL：10分钟
```

#### 4.3 等待DNS传播
- 国内域名：5-30分钟
- 国际域名：最多48小时（通常10分钟内生效）

#### 4.4 验证DNS
访问 https://dnschecker.org 输入 `xadyz.com` 检查全球DNS传播情况

---

### 步骤5：SSL证书配置（自动）

✅ Vercel会自动为你的域名申请Let's Encrypt SSL证书，无需手动配置！

等待5-10分钟后：
- ✅ https://xadyz.com - 自动启用HTTPS
- ✅ https://www.xadyz.com - 自动启用HTTPS
- ✅ HTTP自动重定向到HTTPS

---

## 🌐 Netlify部署方案

### 步骤1：部署到Netlify

#### 1.1 注册并登录Netlify
访问：https://www.netlify.com

#### 1.2 导入项目
1. 点击 "Add new site" → "Import an existing project"
2. 选择GitHub，授权访问
3. 选择 `zhixin-paper` 仓库

#### 1.3 配置构建设置
```
Build command: npm run build
Publish directory: dist
```

#### 1.4 点击 "Deploy site"
部署完成后得到临时域名：
```
https://zhixin-paper-xxxxx.netlify.app
```

---

### 步骤2：绑定域名

#### 2.1 添加自定义域名
1. 进入 Site settings → Domain management
2. 点击 "Add custom domain"
3. 输入：`xadyz.com`

#### 2.2 配置DNS
Netlify会提供DNS配置信息：

**方案A：使用Netlify DNS（推荐）**
```
将域名的Name Servers改为：
dns1.p05.nsone.net
dns2.p05.nsone.net
dns3.p05.nsone.net
dns4.p05.nsone.net
```

**方案B：保留现有DNS，添加A记录**
```
类型：A
主机记录：@
记录值：75.2.60.5
```

#### 2.3 SSL证书
Netlify会自动申请Let's Encrypt证书，等待10-20分钟生效。

---

## 🖥️ 传统服务器部署方案

### 适用场景
- 已有阿里云/腾讯云服务器
- 需要在中国大陆备案
- 需要完全控制服务器
- 需要集成后端API

---

### 步骤1：构建项目

在本地运行：
```bash
npm run build
```

这会在 `dist/` 目录生成静态文件。

---

### 步骤2：上传到服务器

#### 2.1 使用FTP/SFTP工具
- FileZilla
- WinSCP（Windows）
- Transmit（Mac）

#### 2.2 上传dist目录内容到服务器
```
服务器路径：/var/www/xadyz.com/
或：/usr/share/nginx/html/
```

---

### 步骤3：配置Nginx

#### 3.1 创建Nginx配置文件
```bash
sudo nano /etc/nginx/sites-available/xadyz.com
```

#### 3.2 添加配置
```nginx
server {
    listen 80;
    listen [::]:80;
    server_name xadyz.com www.xadyz.com;

    root /var/www/xadyz.com;
    index index.html;

    # Gzip压缩
    gzip on;
    gzip_vary on;
    gzip_min_length 1024;
    gzip_types text/plain text/css text/xml text/javascript 
               application/x-javascript application/xml+rss 
               application/javascript application/json;

    # SPA路由支持
    location / {
        try_files $uri $uri/ /index.html;
    }

    # 缓存静态资源
    location ~* \.(js|css|png|jpg|jpeg|gif|ico|svg|woff|woff2|ttf|eot)$ {
        expires 1y;
        add_header Cache-Control "public, immutable";
    }

    # 安全头部
    add_header X-Frame-Options "SAMEORIGIN" always;
    add_header X-Content-Type-Options "nosniff" always;
    add_header X-XSS-Protection "1; mode=block" always;
}
```

#### 3.3 启用站点
```bash
sudo ln -s /etc/nginx/sites-available/xadyz.com /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl reload nginx
```

---

### 步骤4：配置SSL（Let's Encrypt）

#### 4.1 安装Certbot
```bash
sudo apt update
sudo apt install certbot python3-certbot-nginx
```

#### 4.2 申请SSL证书
```bash
sudo certbot --nginx -d xadyz.com -d www.xadyz.com
```

#### 4.3 自动续期
```bash
sudo certbot renew --dry-run
```

Certbot会自动修改Nginx配置，添加HTTPS支持。

---

### 步骤5：配置DNS（指向服务器IP）

假设你的服务器IP是：`123.45.67.89`

在域名注册商添加DNS记录：
```
类型：A
主机记录：@
记录值：123.45.67.89
TTL：10分钟

类型：A
主机记录：www
记录值：123.45.67.89
TTL：10分钟
```

---

## 🔧 DNS配置指南

### 常见域名注册商DNS配置

#### 阿里云（万网）
1. 登录：https://dns.console.aliyun.com
2. 找到 `xadyz.com`
3. 点击"解析设置"
4. 添加记录

#### 腾讯云（DNSPod）
1. 登录：https://console.cloud.tencent.com/cns
2. 找到 `xadyz.com`
3. 点击"解析"
4. 添加记录

#### GoDaddy
1. 登录：https://dcc.godaddy.com/manage/dns
2. 找到 `xadyz.com`
3. 点击 "Manage DNS"
4. 添加记录

#### Namecheap
1. 登录：https://ap.www.namecheap.com/
2. 找到域名列表
3. 点击 "Manage" → "Advanced DNS"
4. 添加记录

---

### DNS记录类型说明

| 记录类型 | 用途 | 示例 |
|---------|------|------|
| A | 域名指向IPv4地址 | @ → 76.76.21.21 |
| AAAA | 域名指向IPv6地址 | @ → 2606:4700:... |
| CNAME | 域名指向另一个域名 | www → cname.vercel-dns.com |
| MX | 邮件服务器 | @ → mail.xadyz.com |
| TXT | 文本记录（验证/SPF） | @ → "v=spf1..." |

---

### 完整DNS配置示例（Vercel）

```
# 主域名
类型: A
主机记录: @
记录值: 76.76.21.21
TTL: 600

# www子域名
类型: CNAME
主机记录: www
记录值: cname.vercel-dns.com
TTL: 600

# 邮件服务器（如需要）
类型: MX
主机记录: @
记录值: mx.exmail.qq.com
优先级: 5
TTL: 600
```

---

## 🔒 SSL证书配置

### Vercel/Netlify（自动）
✅ 无需配置，平台自动提供免费SSL证书

### 传统服务器（Let's Encrypt）

#### 申请证书
```bash
sudo certbot --nginx -d xadyz.com -d www.xadyz.com
```

#### 证书自动续期
Let's Encrypt证书90天有效期，Certbot会自动续期：
```bash
# 测试自动续期
sudo certbot renew --dry-run

# 查看自动续期任务
sudo systemctl status certbot.timer
```

#### 强制HTTPS
Nginx配置：
```nginx
server {
    listen 80;
    server_name xadyz.com www.xadyz.com;
    return 301 https://$server_name$request_uri;
}
```

---

## ✅ 上线前检查清单

### 📋 部署前检查

- [ ] 所有页面测试完成（18个页面 × 3语言）
- [ ] 联系方式已更新为真实信息
- [ ] 调试代码已清理（console.log等）
- [ ] 图片资源已优化
- [ ] SEO元标签已配置
- [ ] sitemap.xml已生成
- [ ] robots.txt已配置

### 📋 DNS配置检查

- [ ] A记录已添加（@ → 服务器IP/Vercel IP）
- [ ] CNAME记录已添加（www → 主域名/CDN）
- [ ] DNS传播已完成（https://dnschecker.org）
- [ ] 主域名可访问（http://xadyz.com）
- [ ] www子域名可访问（http://www.xadyz.com）

### 📋 SSL证书检查

- [ ] HTTPS可正常访问（https://xadyz.com）
- [ ] 证书有效期正常（至少3个月）
- [ ] HTTP自动重定向到HTTPS
- [ ] 浏览器显示安全锁图标
- [ ] SSL Labs评分A级以上（https://www.ssllabs.com/ssltest/）

### 📋 性能检查

- [ ] 首页加载时间 < 3秒
- [ ] Lighthouse性能评分 > 90
- [ ] 图片懒加载正常
- [ ] CDN加速生效
- [ ] Gzip压缩启用

### 📋 功能检查

- [ ] 三语言切换正常（EN/RU/ZH）
- [ ] 所有链接可点击
- [ ] WhatsApp链接打开正常
- [ ] Telegram链接打开正常
- [ ] 邮箱链接打开正常
- [ ] 表单提交正常（如已配置后端）
- [ ] 移动端响应式正常

### 📋 SEO检查

- [ ] Google Search Console已验证
- [ ] Yandex Webmaster已验证（俄罗斯市场重要！）
- [ ] sitemap已提交
- [ ] robots.txt可访问
- [ ] 结构化数据（Schema.org）已配置
- [ ] Open Graph标签已配置（社交分享）

---

## 🌍 针对俄罗斯市场的特殊配置

### Yandex SEO优化

#### 1. 验证Yandex Webmaster
访问：https://webmaster.yandex.com

#### 2. 添加元标签验证
在 `index.html` 添加：
```html
<meta name="yandex-verification" content="YOUR_VERIFICATION_CODE" />
```

#### 3. 提交sitemap
```
https://xadyz.com/sitemap.xml
```

#### 4. 配置Yandex Metrica（Analytics）
```html
<!-- Yandex.Metrica counter -->
<script type="text/javascript" >
   (function(m,e,t,r,i,k,a){m[i]=m[i]||function(){(m[i].a=m[i].a||[]).push(arguments)};
   m[i].l=1*new Date();
   for (var j = 0; j < document.scripts.length; j++) {if (document.scripts[j].src === r) { return; }}
   k=e.createElement(t),a=e.getElementsByTagName(t)[0],k.async=1,k.src=r,a.parentNode.insertBefore(k,a)})
   (window, document, "script", "https://mc.yandex.ru/metrika/tag.js", "ym");

   ym(YOUR_COUNTER_ID, "init", {
        clickmap:true,
        trackLinks:true,
        accurateTrackBounce:true,
        webvisor:true
   });
</script>
```

---

## 📞 常见问题解答

### Q1: DNS配置后多久生效？
**A:** 
- 国内域名：5-30分钟
- 国际域名：最多48小时（通常10-30分钟）

### Q2: 如何验证DNS是否生效？
**A:** 
```bash
# Windows
nslookup xadyz.com

# Mac/Linux
dig xadyz.com

# 在线工具
https://dnschecker.org
```

### Q3: 为什么访问域名显示502/504错误？
**A:**
1. DNS还未完全传播，等待10-30分钟
2. 服务器未正确配置Nginx
3. SSL证书未正确安装

### Q4: 可以同时绑定多个域名吗？
**A:** 可以！在Vercel/Netlify添加多个域名即可：
- xadyz.com（主域名）
- www.xadyz.com
- zhixinpaper.com（如有其他域名）

### Q5: 中国大陆访问需要备案吗？
**A:**
- 使用Vercel/Netlify：不需要备案（但访问速度可能较慢）
- 使用阿里云/腾讯云服务器：**必须备案**

---

## 🎯 推荐方案总结

### 🏆 快速上线（推荐）
**平台：** Vercel  
**时间：** 30分钟  
**成本：** 免费  
**步骤：**
1. 推送代码到GitHub（5分钟）
2. Vercel导入项目（2分钟）
3. 添加域名xadyz.com（1分钟）
4. 配置DNS（5分钟）
5. 等待DNS传播+SSL生效（10-20分钟）

**总时间：30分钟即可上线！**

---

### 🇨🇳 针对中国大陆用户
**平台：** 阿里云/腾讯云服务器  
**时间：** 1-2天（包括备案）  
**成本：** 服务器费用（约100-300元/月）  
**优势：** 国内访问速度快、符合监管要求

---

### 🇷🇺 针对俄罗斯/独联体用户
**平台：** Vercel + Yandex SEO优化  
**时间：** 30分钟  
**成本：** 免费  
**优势：** 全球CDN、Yandex SEO友好

---

## 📧 需要帮助？

如果在域名绑定过程中遇到问题：

1. **检查DNS配置：** https://dnschecker.org
2. **检查SSL证书：** https://www.ssllabs.com/ssltest/
3. **Vercel文档：** https://vercel.com/docs/concepts/projects/domains
4. **Netlify文档：** https://docs.netlify.com/domains-https/custom-domains/

---

**祝您部署顺利！🚀**
