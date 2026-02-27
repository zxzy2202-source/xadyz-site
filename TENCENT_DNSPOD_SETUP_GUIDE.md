# 🌐 腾讯云DNSPod域名配置指南

**域名：** xadyz.com  
**DNS服务：** 腾讯云DNSPod  
**部署平台：** Vercel（推荐）  
**预计时间：** 30分钟

---

## 📋 完整部署流程（3大步骤）

### 🎯 步骤概览
1. **GitHub代码准备**（5分钟）
2. **Vercel部署项目**（5分钟）
3. **腾讯云DNS配置**（5分钟）
4. **等待生效+验证**（15-20分钟）

---

## 第一步：GitHub代码准备

### 1.1 初始化Git仓库

在项目根目录打开终端，执行：

```bash
# 初始化Git仓库
git init

# 添加所有文件
git add .

# 提交
git commit -m "Initial commit - Zhixin Paper B2B Website"
```

### 1.2 创建GitHub仓库

1. 访问：https://github.com/new
2. 仓库名称：`zhixin-paper` 或 `xadyz`
3. 设置为：**Private**（私有）或 **Public**（公开）
4. **不要**勾选 "Initialize this repository with a README"
5. 点击 "Create repository"

### 1.3 推送代码到GitHub

GitHub会显示命令，复制执行：

```bash
# 添加远程仓库（替换YOUR_USERNAME为你的GitHub用户名）
git remote add origin https://github.com/YOUR_USERNAME/zhixin-paper.git

# 重命名分支为main（如果默认是master）
git branch -M main

# 推送代码
git push -u origin main
```

**✅ 完成标志：** 在GitHub仓库页面能看到所有项目文件

---

## 第二步：Vercel部署项目

### 2.1 注册/登录Vercel

1. 访问：https://vercel.com
2. 点击右上角 "Sign Up"
3. **选择 "Continue with GitHub"**（使用GitHub账号登录）
4. 授权Vercel访问你的GitHub账号

### 2.2 导入项目

1. 登录后，点击 "Add New Project" 或 "Import Project"
2. 在列表中找到 `zhixin-paper` 仓库
3. 点击 "Import"

### 2.3 配置项目设置

Vercel会自动检测到这是Vite项目，默认配置如下：

```
Framework Preset: Vite
Root Directory: ./
Build Command: npm run build
Output Directory: dist
Install Command: npm install
Node.js Version: 18.x
```

**✅ 保持默认配置即可，直接点击 "Deploy"**

### 2.4 等待部署完成

- 构建时间：约2-3分钟
- 完成后会显示：🎉 Congratulations!
- 临时域名：`https://zhixin-paper-xxx.vercel.app`

**✅ 测试临时域名，确保网站正常显示**

---

## 第三步：腾讯云DNSPod配置

### 3.1 在Vercel添加自定义域名

#### 3.1.1 进入项目设置
1. 在Vercel项目页面，点击顶部 "Settings"
2. 左侧菜单点击 "Domains"

#### 3.1.2 添加主域名
1. 在输入框输入：`xadyz.com`
2. 点击 "Add"
3. Vercel会显示DNS配置信息

#### 3.1.3 添加www子域名
1. 再次在输入框输入：`www.xadyz.com`
2. 点击 "Add"
3. Vercel会提示需要配置DNS

### 3.2 查看Vercel提供的DNS记录

Vercel会显示需要添加的DNS记录：

```
For xadyz.com:
Type: A
Name: @
Value: 76.76.21.21

For www.xadyz.com:
Type: CNAME
Name: www
Value: cname.vercel-dns.com
```

**📋 记下这些信息，下一步要在腾讯云DNSPod配置**

---

### 3.3 腾讯云DNSPod DNS配置（详细步骤）

#### 3.3.1 登录腾讯云DNS控制台

1. 访问：https://console.cloud.tencent.com/cns
2. 使用腾讯云账号登录
3. 在域名列表中找到 `xadyz.com`

#### 3.3.2 进入域名解析设置

1. 点击域名 `xadyz.com` 右侧的 "解析"
2. 进入DNS记录管理页面

#### 3.3.3 删除现有冲突记录（重要！）

**⚠️ 在添加新记录前，必须先删除冲突的旧记录：**

查找并删除以下记录（如果存在）：
- 主机记录为 `@` 的 A记录
- 主机记录为 `www` 的 A记录或CNAME记录

**删除方法：**
- 找到对应记录，点击右侧 "删除" 按钮
- 确认删除

#### 3.3.4 添加主域名A记录

点击 "添加记录"，填写以下信息：

```
记录类型：A
主机记录：@
线路类型：默认
记录值：76.76.21.21
TTL：600（10分钟）
```

**字段说明：**
- **记录类型：** 选择 "A"
- **主机记录：** 填写 `@` （代表主域名 xadyz.com）
- **线路类型：** 选择 "默认" 或 "境外"（全球生效）
- **记录值：** 填写 `76.76.21.21` （Vercel的IP地址）
- **TTL：** 选择 600 或 10分钟（DNS缓存时间）
- **MX优先级：** 留空（A记录不需要）

点击 "保存" 完成添加

#### 3.3.5 添加www子域名CNAME记录

再次点击 "添加记录"，填写以下信息：

```
记录类型：CNAME
主机记录：www
线路类型：默认
记录值：cname.vercel-dns.com
TTL：600（10分钟）
```

**字段说明：**
- **记录类型：** 选择 "CNAME"
- **主机记录：** 填写 `www`
- **线路类型：** 选择 "默认" 或 "境外"
- **记录值：** 填写 `cname.vercel-dns.com` （注意：**不要**在末尾加点号）
- **TTL：** 选择 600

点击 "保存" 完成添加

#### 3.3.6 验证DNS记录配置

配置完成后，你应该看到：

```
记录类型  主机记录  线路类型  记录值                    TTL    状态
A         @        默认     76.76.21.21              600    正常
CNAME     www      默认     cname.vercel-dns.com     600    正常
```

**✅ DNS配置完成！**

---

### 3.4 可选：添加其他线路优化（高级）

#### 针对不同地区用户优化（可选）

如果你想针对不同地区用户优化访问速度：

**国内用户线路：**
```
记录类型：A
主机记录：@
线路类型：境内
记录值：76.76.21.21
TTL：600
```

**海外用户线路：**
```
记录类型：A
主机记录：@
线路类型：境外
记录值：76.76.21.21
TTL：600
```

**说明：** Vercel的全球CDN会自动优化，通常使用"默认"线路即可。

---

## 第四步：等待DNS生效并验证

### 4.1 DNS传播时间

- **腾讯云DNSPod：** 通常5-10分钟生效
- **全球传播：** 最多24小时（通常30分钟内）

### 4.2 检查DNS是否生效

#### 方法1：在线工具检查（推荐）

访问：https://dnschecker.org

输入 `xadyz.com`，查看全球DNS传播情况

**✅ 成功标志：**
- 全球多个节点显示绿色✓
- 记录值显示：76.76.21.21

#### 方法2：命令行检查

**Windows：**
```cmd
nslookup xadyz.com
```

**Mac/Linux：**
```bash
dig xadyz.com
```

**✅ 成功标志：** 显示IP地址 76.76.21.21

#### 方法3：直接访问网站

在浏览器打开：
- http://xadyz.com
- http://www.xadyz.com

**✅ 成功标志：** 网站正常显示（可能还是HTTP，HTTPS需要额外等待）

---

### 4.3 等待SSL证书生效

#### 4.3.1 Vercel自动申请SSL证书

DNS生效后，Vercel会自动为你的域名申请Let's Encrypt SSL证书。

**时间：** 5-30分钟

#### 4.3.2 检查SSL证书状态

1. 回到Vercel项目设置
2. 点击 "Domains"
3. 查看域名状态：

```
✓ xadyz.com - Valid Configuration
✓ www.xadyz.com - Valid Configuration
```

#### 4.3.3 验证HTTPS访问

在浏览器打开：
- https://xadyz.com ✓
- https://www.xadyz.com ✓

**✅ 成功标志：**
- 浏览器地址栏显示🔒锁图标
- URL显示 https://
- 没有证书错误警告

---

## 第五步：最终验证和优化

### 5.1 完整功能测试

#### 测试清单：
- [ ] https://xadyz.com 正常访问
- [ ] https://www.xadyz.com 正常访问
- [ ] http://xadyz.com 自动跳转到 https://xadyz.com
- [ ] 三语言切换正常（EN/RU/ZH）
- [ ] 所有页面都能访问（18个页面）
- [ ] WhatsApp链接正常
- [ ] Telegram链接正常
- [ ] 邮件链接正常
- [ ] 移动端显示正常

### 5.2 性能测试

#### Google PageSpeed Insights
访问：https://pagespeed.web.dev

输入：`https://xadyz.com`

**目标：**
- 移动端评分 > 85
- 桌面端评分 > 90

#### Lighthouse测试（Chrome浏览器）
1. 打开Chrome浏览器
2. 按F12打开开发者工具
3. 点击 "Lighthouse" 标签
4. 点击 "Generate report"

**目标：**
- Performance > 90
- Accessibility > 90
- Best Practices > 90
- SEO > 90

### 5.3 SSL安全检测

访问：https://www.ssllabs.com/ssltest/

输入：`xadyz.com`

**目标：** 评级 A 或 A+

---

## 🎯 配置完成后的效果

### ✅ 域名访问
- https://xadyz.com ✓ （主域名，推荐）
- https://www.xadyz.com ✓ （www子域名）
- http://xadyz.com → 自动跳转到 https://xadyz.com
- http://www.xadyz.com → 自动跳转到 https://www.xadyz.com

### ✅ SSL证书
- 证书提供商：Let's Encrypt
- 证书有效期：90天（自动续期）
- 加密等级：TLS 1.3
- 浏览器兼容：所有现代浏览器

### ✅ 全球CDN加速
- 中国大陆：✓（访问速度优化）
- 俄罗斯/独联体：✓（目标市场）
- 欧洲：✓
- 美洲：✓
- 其他地区：✓

---

## 🔧 常见问题排查

### ❌ 问题1：DNS配置后访问不了域名

**可能原因：**
1. DNS还未传播完成
2. 浏览器缓存了旧的DNS记录

**解决方案：**
```bash
# 清除本地DNS缓存

# Windows:
ipconfig /flushdns

# Mac:
sudo dscacheutil -flushcache; sudo killall -HUP mDNSResponder

# Linux:
sudo systemd-resolve --flush-caches
```

**等待10-30分钟后再试**

---

### ❌ 问题2：HTTPS访问显示证书错误

**可能原因：**
1. SSL证书还在申请中
2. DNS记录配置不正确

**解决方案：**
1. 回到Vercel → Settings → Domains
2. 检查域名状态，如果显示 "Invalid Configuration"：
   - 点击域名旁的刷新按钮
   - 重新验证DNS配置
3. 等待10-30分钟后再试

---

### ❌ 问题3：Vercel显示"域名已被使用"

**可能原因：**
域名之前在其他Vercel项目中使用过

**解决方案：**
1. 登录之前使用该域名的Vercel账号
2. 删除旧项目中的域名绑定
3. 回到新项目重新添加域名

---

### ❌ 问题4：www子域名无法访问

**可能原因：**
CNAME记录配置错误

**解决方案：**
1. 检查腾讯云DNSPod中的CNAME记录
2. 确保记录值是：`cname.vercel-dns.com`（**不要**加末尾的点）
3. 确保主机记录是：`www`（不是 `@`）
4. 等待DNS传播

---

### ❌ 问题5：部分地区无法访问

**可能原因：**
DNS线路设置问题

**解决方案：**
1. 登录腾讯云DNSPod
2. 检查记录的"线路类型"
3. 改为"默认"（而不是"境内"或"境外"）
4. 或分别添加"境内"和"境外"两条记录

---

## 📊 腾讯云DNSPod高级功能（可选）

### 1. 负载均衡

如果将来需要多服务器负载均衡：

```
记录类型：A
主机记录：@
线路类型：默认
记录值：76.76.21.21
权重：10

记录类型：A
主机记录：@
线路类型：默认
记录值：第二个服务器IP
权重：10
```

### 2. 监控告警

腾讯云DNSPod提供监控功能：
1. 进入域名解析页面
2. 点击"监控"标签
3. 设置网站可用性监控
4. 配置告警通知（短信/邮件）

### 3. DNSSEC（高级安全）

启用DNSSEC防止DNS劫持：
1. 进入域名管理
2. 找到"DNSSEC"设置
3. 点击"启用"
4. 复制DS记录到域名注册商

---

## 📧 SEO配置（下一步）

### Google Search Console验证

1. 访问：https://search.google.com/search-console
2. 添加资源：`xadyz.com`
3. 选择验证方式：HTML标签
4. 在网站添加meta标签
5. 提交sitemap：`https://xadyz.com/sitemap.xml`

### Yandex Webmaster验证（俄罗斯市场重要！）

1. 访问：https://webmaster.yandex.com
2. 添加网站：`https://xadyz.com`
3. 选择验证方式：Meta标签
4. 在网站添加验证代码
5. 提交sitemap

---

## 🎉 恭喜！配置完成检查清单

- [ ] ✅ GitHub代码已推送
- [ ] ✅ Vercel项目已部署
- [ ] ✅ 临时域名可访问
- [ ] ✅ 腾讯云DNS已配置（A记录 + CNAME）
- [ ] ✅ DNS已生效（dnschecker.org验证）
- [ ] ✅ https://xadyz.com 可访问
- [ ] ✅ https://www.xadyz.com 可访问
- [ ] ✅ SSL证书显示正常（🔒锁图标）
- [ ] ✅ HTTP自动跳转HTTPS
- [ ] ✅ 移动端测试正常
- [ ] ✅ 三语言切换正常
- [ ] ✅ 所有链接正常

---

## 📞 技术支持

### Vercel支持
- 文档：https://vercel.com/docs
- 社区：https://github.com/vercel/vercel/discussions

### 腾讯云DNSPod支持
- 文档：https://cloud.tencent.com/document/product/302
- 工单：https://console.cloud.tencent.com/workorder

### DNS工具
- DNS检查：https://dnschecker.org
- SSL检查：https://www.ssllabs.com/ssltest/
- 网站测速：https://pagespeed.web.dev

---

## 🚀 下一步优化建议

配置完成后，建议继续完成：

1. **表单后端配置**（任务#2）
   - 集成Web3Forms或EmailJS
   - 启用在线表单提交功能

2. **Analytics集成**（任务#4）
   - Google Analytics 4
   - Yandex Metrica（俄罗斯市场）

3. **SEO优化**
   - Google Search Console验证
   - Yandex Webmaster验证
   - 提交sitemap.xml

4. **性能优化**
   - 图片压缩和懒加载
   - 代码分割
   - CDN优化

---

**祝您部署顺利！🎉**

如有任何问题，请随时询问！
