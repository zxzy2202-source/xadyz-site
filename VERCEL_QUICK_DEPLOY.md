# ⚡ Vercel快速部署（5分钟）

**最快的部署方式 - 使用Vercel CLI**

---

## 📋 准备工作

✅ 已创建配置文件：
- `.gitignore` ✓
- `vercel.json` ✓

---

## 🚀 3步完成部署

### 步骤1：安装Vercel CLI

```bash
npm install -g vercel
```

---

### 步骤2：登录Vercel

```bash
vercel login
```

选择 **GitHub** 登录（推荐）

---

### 步骤3：部署项目

```bash
vercel
```

**按提示回答：**

```
? Set up and deploy? 
→ Y

? Which scope? 
→ 选择你的账号

? Link to existing project? 
→ N

? What's your project's name? 
→ zhixin-paper

? In which directory is your code located? 
→ 直接回车（./）

? Want to override the settings? 
→ N
```

---

## ✅ 部署完成！

```
✅ Production: https://zhixin-paper.vercel.app
```

---

## 🌐 添加自定义域名

### 方法1：使用CLI

```bash
vercel domains add xadyz.com
vercel domains add www.xadyz.com
```

### 方法2：使用网页

1. 访问：https://vercel.com/dashboard
2. 找到项目 → Settings → Domains
3. 添加：`xadyz.com` 和 `www.xadyz.com`

---

## 🔧 配置DNS（腾讯云DNSPod）

访问：https://console.cloud.tencent.com/cns

### 添加2条记录：

**记录1：主域名**
```
类型：A
主机记录：@
记录值：76.76.21.21
TTL：600
```

**记录2：www子域名**
```
类型：CNAME
主机记录：www
记录值：cname.vercel-dns.com
TTL：600
```

---

## ⏰ 等待生效（15-20分钟）

### 验证DNS

```bash
# Windows
nslookup xadyz.com

# Mac/Linux
dig xadyz.com
```

或访问：https://dnschecker.org

---

## 🎉 完成！

访问您的网站：
- https://xadyz.com ✓
- https://www.xadyz.com ✓

---

## 🔄 更新网站

修改代码后：

```bash
vercel --prod
```

或推送到GitHub自动部署（需要关联Git）

---

**总用时：5分钟部署 + 15分钟等待DNS生效 = 20分钟**
