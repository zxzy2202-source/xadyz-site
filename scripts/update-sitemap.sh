#!/bin/bash

# ========================================
# Sitemap快速更新脚本
# ========================================
# 用途：批量更新sitemap的lastmod日期
# 使用：npm run update-sitemap
# ========================================

echo "🌐 正在更新sitemap文件..."

TODAY=$(date +%Y-%m-%d)
echo "📅 更新日期：$TODAY"

# 更新所有sitemap文件中的lastmod
for file in public/sitemap*.xml; do
  if [ -f "$file" ]; then
    # 使用sed替换所有的lastmod日期
    sed -i.bak "s/<lastmod>[0-9]\{4\}-[0-9]\{2\}-[0-9]\{2\}<\/lastmod>/<lastmod>$TODAY<\/lastmod>/g" "$file"
    rm "${file}.bak" 2>/dev/null
    echo "✅ 更新：$(basename $file)"
  fi
done

echo ""
echo "✨ Sitemap更新完成！"
echo "📍 文件位置：/public/sitemap*.xml"
echo "🔗 访问地址：https://xadyz.com/sitemap.xml"
echo ""
echo "📊 验证链接："
echo "   - Google: https://search.google.com/search-console"
echo "   - Yandex: https://webmaster.yandex.com/"
echo ""
