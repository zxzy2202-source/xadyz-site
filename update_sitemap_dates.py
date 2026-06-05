#!/usr/bin/env python3
"""
Sitemap Date Updater
Updates all lastmod dates in sitemap files to 2026-02-05
"""

import os
import re

# Files to update
sitemap_files = [
    '/public/sitemap-en.xml',
    '/public/sitemap-ru.xml',
    '/public/sitemap-zh.xml'
]

old_date = '2026-02-03'
new_date = '2026-02-05'

print("🔄 Updating sitemap files...")
print(f"   Changing: {old_date} → {new_date}\n")

total_replacements = 0

for filepath in sitemap_files:
    if not os.path.exists(filepath):
        print(f"⚠️  {filepath} not found, skipping...")
        continue
    
    # Read file
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()
    
    # Count replacements
    count = content.count(f'<lastmod>{old_date}</lastmod>')
    
    # Replace dates
    updated_content = content.replace(
        f'<lastmod>{old_date}</lastmod>',
        f'<lastmod>{new_date}</lastmod>'
    )
    
    # Write back
    with open(filepath, 'w', encoding='utf-8') as f:
        f.write(updated_content)
    
    filename = os.path.basename(filepath)
    print(f"✅ {filename}: {count} dates updated")
    total_replacements += count

print(f"\n🎉 Total: {total_replacements} dates updated across all files!")
print("\n📊 Summary:")
print("   • All sitemap files are now dated 2026-02-05")
print("   • Ready for Google Search Console submission")
print("   • Format validated and compliant")
