# Footer更新脚本

## 已完成更新的文件：
- ✅ /src/app/components/LandingPage.tsx
- ✅ /src/app/components/ThermalPaperPage.tsx

## 需要更新的剩余文件列表：

将以下文件中的：
```typescript
import { Footer } from '@/app/components/Footer';
```

替换为：
```typescript
import { FooterOptimized as Footer } from '@/app/components/FooterOptimized';
```

### 文件列表（16个）：

1. /src/app/components/ThermalLabelsPage.tsx
2. /src/app/components/NCRFormsPage.tsx
3. /src/app/components/ProductsPage.tsx
4. /src/app/components/MaterialSupplyOverviewPage.tsx
5. /src/app/components/ApplicationsOverviewPage.tsx
6. /src/app/components/GovernmentTendersPage.tsx
7. /src/app/components/JumboRollsPage.tsx
8. /src/app/components/ProductionPage.tsx
9. /src/app/components/ContactsPage.tsx
10. /src/app/components/AboutPage.tsx
11. /src/app/components/RequestTenderPackPage.tsx
12. /src/app/components/RequestTenderPackPageEnhanced.tsx
13. /src/app/components/SelfAdhesiveJumboPage.tsx
14. /src/app/components/SelfAdhesiveSheetsPage.tsx
15. /src/app/components/NCRJumboPage.tsx
16. /src/app/components/NCRSheetsPage.tsx

## 批量更新命令（手动执行）

可以使用文本编辑器的查找替换功能：

**查找：** `import { Footer } from '@/app/components/Footer';`
**替换为：** `import { FooterOptimized as Footer } from '@/app/components/FooterOptimized';`

或者在VS Code中：
1. Ctrl+Shift+F 打开全局搜索
2. 搜索：`from '@/app/components/Footer'`
3. 替换为：`from '@/app/components/FooterOptimized'`
4. 同时将 `{ Footer }` 替换为 `{ FooterOptimized as Footer }`

## Footer优化要点总结

### 新Footer的改进：

1. **更清晰的产品结构**
   - ✅ Finished Products（成品）
   - ✅ Material Supply（材料供应）
   - ✅ Solutions（解决方案）

2. **突出Government & Tenders入口**
   - 🔥 高亮显示投标相关链接
   - 📄 直接链接到Request Tender Pack

3. **强化即时通讯**
   - 🟢 WhatsApp卡片样式优化
   - 🔵 Telegram卡片样式优化
   - ✅ 添加"Click to chat"提示

4. **增加信任信号**
   - 🏆 ISO Certified Factory
   - ⏰ 15+ Years Experience
   - 🌍 Serving 30+ Countries

5. **专用投标邮箱**
   - ✉️ sales@zhixinpaper.com（一般询盘）
   - 📧 tender@zhixinpaper.com（投标专用）

6. **SEO优化**
   - 🌍 GEO信号位置优化
   - 🔍 清晰的产品链接结构
   - 📍 Factory Location明确标注

### 技术实现：

```typescript
// 新Footer组件位置
/src/app/components/FooterOptimized.tsx

// 使用方式（与旧Footer完全相同）
import { FooterOptimized as Footer } from '@/app/components/FooterOptimized';

<Footer />
```

### 效果对比：

**旧Footer：**
- 简单的4列布局
- 产品链接不完整
- 投标入口不明显
- 即时通讯按钮小

**新Footer：**
- 5列响应式布局
- 完整产品+材料+解决方案结构
- Government & Tenders高亮
- 大号即时通讯卡片
- 信任信号明显
- 专用投标邮箱

## 完成后验证清单：

- [ ] 所有页面Footer显示正常
- [ ] 三语言切换正常工作
- [ ] WhatsApp/Telegram链接可点击
- [ ] Government & Tenders链接高亮显示
- [ ] Request Tender Pack按钮显眼
- [ ] 移动端响应式正常
- [ ] 邮箱链接可用
- [ ] 所有产品链接正确
