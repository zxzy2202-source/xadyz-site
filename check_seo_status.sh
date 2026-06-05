#!/bin/bash

# ========================================
# Google Search Console 索引问题诊断脚本
# 用于检查 xadyz.com 的索引状况
# ========================================

echo "🔍 开始诊断 xadyz.com 的索引问题..."
echo ""

# 颜色定义
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m' # No Color

# 1. 检查网站是否可访问
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "1️⃣  检查网站可访问性"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"

check_url() {
  URL=$1
  STATUS=$(curl -s -o /dev/null -w "%{http_code}" "$URL")
  if [ "$STATUS" -eq 200 ]; then
    echo -e "✅ ${GREEN}$URL${NC} - HTTP $STATUS (正常)"
  elif [ "$STATUS" -eq 301 ] || [ "$STATUS" -eq 302 ]; then
    echo -e "⚠️  ${YELLOW}$URL${NC} - HTTP $STATUS (重定向)"
  elif [ "$STATUS" -eq 404 ]; then
    echo -e "❌ ${RED}$URL${NC} - HTTP $STATUS (页面不存在)"
  else
    echo -e "⚠️  ${YELLOW}$URL${NC} - HTTP $STATUS"
  fi
}

check_url "https://xadyz.com"
check_url "https://xadyz.com/en"
check_url "https://xadyz.com/ru"
check_url "https://xadyz.com/zh"
check_url "https://xadyz.com/en/products"
check_url "https://xadyz.com/ru/products"

echo ""

# 2. 检查 robots.txt
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "2️⃣  检查 robots.txt"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"

ROBOTS=$(curl -s "https://xadyz.com/robots.txt")
if [ -n "$ROBOTS" ]; then
  echo -e "✅ ${GREEN}robots.txt 存在${NC}"
  echo ""
  echo "$ROBOTS"
  echo ""
  
  # 检查是否有阻止爬虫的规则
  if echo "$ROBOTS" | grep -q "Disallow: /"; then
    echo -e "⚠️  ${YELLOW}警告：发现 'Disallow: /' 规则！${NC}"
  fi
else
  echo -e "⚠️  ${YELLOW}robots.txt 不存在或无法访问${NC}"
fi

echo ""

# 3. 检查 sitemap
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "3️⃣  检查 Sitemap"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"

check_sitemap() {
  SITEMAP_URL=$1
  STATUS=$(curl -s -o /dev/null -w "%{http_code}" "$SITEMAP_URL")
  
  if [ "$STATUS" -eq 200 ]; then
    # 获取URL数量
    CONTENT=$(curl -s "$SITEMAP_URL")
    URL_COUNT=$(echo "$CONTENT" | grep -o "<loc>" | wc -l)
    echo -e "✅ ${GREEN}$SITEMAP_URL${NC} - $URL_COUNT 个URL"
  else
    echo -e "❌ ${RED}$SITEMAP_URL${NC} - HTTP $STATUS (无法访问)"
  fi
}

check_sitemap "https://xadyz.com/sitemap.xml"
check_sitemap "https://xadyz.com/sitemap-en.xml"
check_sitemap "https://xadyz.com/sitemap-ru.xml"
check_sitemap "https://xadyz.com/sitemap-zh.xml"

echo ""

# 4. 检查重要页面的元数据
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "4️⃣  检查页面元数据"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"

check_metadata() {
  URL=$1
  HTML=$(curl -s "$URL")
  
  echo "检查: $URL"
  
  # 检查 title
  TITLE=$(echo "$HTML" | grep -o "<title>[^<]*</title>" | sed 's/<[^>]*>//g')
  if [ -n "$TITLE" ]; then
    echo -e "  ✅ Title: ${GREEN}$TITLE${NC}"
  else
    echo -e "  ❌ ${RED}缺少 Title${NC}"
  fi
  
  # 检查 description
  if echo "$HTML" | grep -q "name=\"description\""; then
    DESC=$(echo "$HTML" | grep "name=\"description\"" | sed 's/.*content="\([^"]*\).*/\1/')
    echo -e "  ✅ Description: 存在"
  else
    echo -e "  ⚠️  ${YELLOW}缺少 Description${NC}"
  fi
  
  # 检查 canonical
  if echo "$HTML" | grep -q "rel=\"canonical\""; then
    echo -e "  ✅ Canonical: 存在"
  else
    echo -e "  ⚠️  ${YELLOW}缺少 Canonical${NC}"
  fi
  
  # 检查 hreflang
  if echo "$HTML" | grep -q "hreflang"; then
    echo -e "  ✅ Hreflang: 存在"
  else
    echo -e "  ⚠️  ${YELLOW}缺少 Hreflang${NC}"
  fi
  
  # 检查 noindex
  if echo "$HTML" | grep -q "noindex"; then
    echo -e "  ⚠️  ${YELLOW}发现 NOINDEX 标签！${NC}"
  fi
  
  echo ""
}

check_metadata "https://xadyz.com/en"
check_metadata "https://xadyz.com/ru"
check_metadata "https://xadyz.com/en/products"

echo ""

# 5. 检查页面加载速度
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "5️⃣  检查页面加载速度"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"

check_speed() {
  URL=$1
  TIME=$(curl -s -o /dev/null -w "%{time_total}" "$URL")
  
  if (( $(echo "$TIME < 1.0" | bc -l) )); then
    echo -e "✅ ${GREEN}$URL${NC} - ${TIME}秒 (快)"
  elif (( $(echo "$TIME < 3.0" | bc -l) )); then
    echo -e "⚠️  ${YELLOW}$URL${NC} - ${TIME}秒 (中等)"
  else
    echo -e "❌ ${RED}$URL${NC} - ${TIME}秒 (慢)"
  fi
}

check_speed "https://xadyz.com/en"
check_speed "https://xadyz.com/ru"

echo ""

# 6. 总结和建议
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "📊 诊断总结"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""
echo "✅ 完成基础检查"
echo ""
echo "📋 后续操作建议："
echo ""
echo "1️⃣  在 Google Search Console 中："
echo "   • 提交 sitemap: https://xadyz.com/sitemap.xml"
echo "   • 查看'已发现未索引'的具体URL列表"
echo "   • 对重要页面请求编入索引"
echo ""
echo "2️⃣  在 Yandex Webmaster 中："
echo "   • 添加网站并验证所有权"
echo "   • 提交俄语 sitemap"
echo "   • 使用'重新检查'功能"
echo ""
echo "3️⃣  优化建议："
echo "   • 确保所有页面有高质量内容 (>300字)"
echo "   • 添加内部链接提升页面权重"
echo "   • 优化图片和页面加载速度"
echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "🎯 预计 1-2 周内索引情况会明显改善"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
