-- ========================================
-- 志信纸业 B2B - 插入网站占位符数据
-- 总共95个占位符需要替换
-- ========================================

-- 首页 (Home - /) - 15个占位符
INSERT INTO placeholders (placeholder_key, page_path, section_name, element_description, placeholder_type, required_dimensions, priority) VALUES
('home_hero_banner', '/', 'Hero Banner', '首页主横幅大图', 'hero', '1920x800', 'high'),
('home_about_factory', '/', 'About Section', '关于我们-工厂图片', 'factory', '600x400', 'high'),
('home_product_1', '/', 'Products Grid', '产品展示图1', 'product', '400x300', 'medium'),
('home_product_2', '/', 'Products Grid', '产品展示图2', 'product', '400x300', 'medium'),
('home_product_3', '/', 'Products Grid', '产品展示图3', 'product', '400x300', 'medium'),
('home_product_4', '/', 'Products Grid', '产品展示图4', 'product', '400x300', 'medium'),
('home_product_5', '/', 'Products Grid', '产品展示图5', 'product', '400x300', 'medium'),
('home_product_6', '/', 'Products Grid', '产品展示图6', 'product', '400x300', 'medium'),
('home_cert_1', '/', 'Certifications', '认证图标1', 'icon', '150x150', 'low'),
('home_cert_2', '/', 'Certifications', '认证图标2', 'icon', '150x150', 'low'),
('home_cert_3', '/', 'Certifications', '认证图标3', 'icon', '150x150', 'low'),
('home_cert_4', '/', 'Certifications', '认证图标4', 'icon', '150x150', 'low'),
('home_warehouse', '/', 'Logistics', '仓储物流图', 'factory', '800x500', 'medium'),
('home_cta_bg', '/', 'CTA Section', 'CTA背景图', 'banner', '1920x400', 'low'),
('home_partner_logos', '/', 'Partners', '合作伙伴logo组合', 'banner', '1200x200', 'low');

-- 关于我们 (About - /about) - 10个占位符
INSERT INTO placeholders (placeholder_key, page_path, section_name, element_description, placeholder_type, required_dimensions, priority) VALUES
('about_hero_banner', '/about', 'Hero Banner', '关于页主横幅', 'banner', '1920x500', 'high'),
('about_factory_exterior', '/about', 'Company Intro', '工厂外观', 'factory', '800x600', 'high'),
('about_workshop_1', '/about', 'Production', '车间生产线1', 'factory', '600x400', 'high'),
('about_workshop_2', '/about', 'Production', '车间生产线2', 'factory', '600x400', 'high'),
('about_warehouse', '/about', 'Facilities', '仓库设施', 'factory', '600x400', 'medium'),
('about_team_photo', '/about', 'Team', '团队合影', 'other', '800x500', 'medium'),
('about_timeline_bg', '/about', 'History', '发展历程背景图', 'banner', '1920x600', 'low'),
('about_mission_icon', '/about', 'Mission', '使命图标', 'icon', '120x120', 'low'),
('about_vision_icon', '/about', 'Vision', '愿景图标', 'icon', '120x120', 'low'),
('about_values_icon', '/about', 'Values', '价值观图标', 'icon', '120x120', 'low');

-- 产品中心 (Products - /products) - 20个占位符
INSERT INTO placeholders (placeholder_key, page_path, section_name, element_description, placeholder_type, required_dimensions, priority) VALUES
('products_hero_banner', '/products', 'Hero Banner', '产品页主横幅', 'banner', '1920x500', 'high'),
('products_tissue_box_1', '/products', 'Tissue Boxes', '盒装纸巾产品图1', 'product', '500x500', 'high'),
('products_tissue_box_2', '/products', 'Tissue Boxes', '盒装纸巾产品图2', 'product', '500x500', 'high'),
('products_tissue_box_3', '/products', 'Tissue Boxes', '盒装纸巾产品图3', 'product', '500x500', 'high'),
('products_facial_tissue_1', '/products', 'Facial Tissues', '抽纸产品图1', 'product', '500x500', 'high'),
('products_facial_tissue_2', '/products', 'Facial Tissues', '抽纸产品图2', 'product', '500x500', 'high'),
('products_facial_tissue_3', '/products', 'Facial Tissues', '抽纸产品图3', 'product', '500x500', 'high'),
('products_toilet_roll_1', '/products', 'Toilet Rolls', '卷纸产品图1', 'product', '500x500', 'high'),
('products_toilet_roll_2', '/products', 'Toilet Rolls', '卷纸产品图2', 'product', '500x500', 'high'),
('products_toilet_roll_3', '/products', 'Toilet Rolls', '卷纸产品图3', 'product', '500x500', 'high'),
('products_napkins_1', '/products', 'Napkins', '餐巾纸产品图1', 'product', '500x500', 'medium'),
('products_napkins_2', '/products', 'Napkins', '餐巾纸产品图2', 'product', '500x500', 'medium'),
('products_handkerchief_1', '/products', 'Handkerchiefs', '手帕纸产品图1', 'product', '500x500', 'medium'),
('products_handkerchief_2', '/products', 'Handkerchiefs', '手帕纸产品图2', 'product', '500x500', 'medium'),
('products_material_pulp', '/products', 'Materials', '原材料-纸浆', 'other', '400x300', 'low'),
('products_material_bamboo', '/products', 'Materials', '原材料-竹纤维', 'other', '400x300', 'low'),
('products_packaging_box', '/products', 'Packaging', '包装展示1', 'product', '400x300', 'low'),
('products_packaging_wrapper', '/products', 'Packaging', '包装展示2', 'product', '400x300', 'low'),
('products_quality_test', '/products', 'Quality', '质量检测图', 'factory', '600x400', 'medium'),
('products_certificate_bg', '/products', 'Certifications', '认证背景图', 'banner', '1920x400', 'low');

-- 生产能力 (Manufacturing - /manufacturing) - 12个占位符
INSERT INTO placeholders (placeholder_key, page_path, section_name, element_description, placeholder_type, required_dimensions, priority) VALUES
('mfg_hero_banner', '/manufacturing', 'Hero Banner', '生产页主横幅', 'banner', '1920x500', 'high'),
('mfg_production_line_1', '/manufacturing', 'Production Lines', '生产线全景1', 'factory', '800x500', 'high'),
('mfg_production_line_2', '/manufacturing', 'Production Lines', '生产线全景2', 'factory', '800x500', 'high'),
('mfg_production_line_3', '/manufacturing', 'Production Lines', '生产线全景3', 'factory', '800x500', 'high'),
('mfg_automation', '/manufacturing', 'Technology', '自动化设备', 'factory', '600x400', 'high'),
('mfg_quality_control', '/manufacturing', 'Quality Control', '质检实验室', 'factory', '600x400', 'high'),
('mfg_packaging_line', '/manufacturing', 'Packaging', '包装生产线', 'factory', '600x400', 'medium'),
('mfg_warehouse_storage', '/manufacturing', 'Warehouse', '仓储区域', 'factory', '600x400', 'medium'),
('mfg_loading_dock', '/manufacturing', 'Logistics', '装卸码头', 'factory', '600x400', 'medium'),
('mfg_capacity_chart', '/manufacturing', 'Capacity', '产能数据图表', 'other', '800x400', 'low'),
('mfg_process_diagram', '/manufacturing', 'Process', '工艺流程图', 'other', '1200x600', 'medium'),
('mfg_equipment_detail', '/manufacturing', 'Equipment', '设备细节图', 'factory', '500x500', 'low');

-- 服务与支持 (Services - /services) - 8个占位符
INSERT INTO placeholders (placeholder_key, page_path, section_name, element_description, placeholder_type, required_dimensions, priority) VALUES
('services_hero_banner', '/services', 'Hero Banner', '服务页主横幅', 'banner', '1920x500', 'high'),
('services_oem_samples', '/services', 'OEM Service', 'OEM定制样品', 'product', '600x400', 'high'),
('services_design_mockup', '/services', 'Design Service', '设计稿效果图', 'other', '600x400', 'medium'),
('services_sample_showcase', '/services', 'Samples', '样品展示', 'product', '800x500', 'medium'),
('services_shipping_container', '/services', 'Shipping', '货运集装箱', 'other', '600x400', 'medium'),
('services_warehouse_int', '/services', 'Logistics', '物流仓储内景', 'factory', '600x400', 'low'),
('services_support_icon', '/services', 'Customer Support', '客服支持图标', 'icon', '150x150', 'low'),
('services_warranty_icon', '/services', 'Warranty', '质保图标', 'icon', '150x150', 'low');

-- 联系我们 (Contact - /contact) - 6个占位符
INSERT INTO placeholders (placeholder_key, page_path, section_name, element_description, placeholder_type, required_dimensions, priority) VALUES
('contact_hero_banner', '/contact', 'Hero Banner', '联系页主横幅', 'banner', '1920x400', 'high'),
('contact_office_exterior', '/contact', 'Location', '办公楼外观', 'other', '600x400', 'medium'),
('contact_office_lobby', '/contact', 'Office', '接待大厅', 'other', '600x400', 'low'),
('contact_meeting_room', '/contact', 'Office', '会议室', 'other', '600x400', 'low'),
('contact_map_marker', '/contact', 'Map', '地图标记图标', 'icon', '100x100', 'low'),
('contact_qr_wechat', '/contact', 'Social', '微信二维码', 'other', '200x200', 'low');

-- 新闻资讯 (News - /news) - 8个占位符
INSERT INTO placeholders (placeholder_key, page_path, section_name, element_description, placeholder_type, required_dimensions, priority) VALUES
('news_hero_banner', '/news', 'Hero Banner', '新闻页主横幅', 'banner', '1920x400', 'medium'),
('news_featured_1', '/news', 'Featured News', '特色新闻图1', 'other', '800x500', 'medium'),
('news_featured_2', '/news', 'Featured News', '特色新闻图2', 'other', '800x500', 'medium'),
('news_featured_3', '/news', 'Featured News', '特色新闻图3', 'other', '800x500', 'medium'),
('news_event_1', '/news', 'Events', '展会活动图1', 'other', '600x400', 'low'),
('news_event_2', '/news', 'Events', '展会活动图2', 'other', '600x400', 'low'),
('news_award_1', '/news', 'Awards', '获奖证书1', 'other', '400x500', 'low'),
('news_award_2', '/news', 'Awards', '获奖证书2', 'other', '400x500', 'low');

-- 常见问题 (FAQ - /faq) - 4个占位符
INSERT INTO placeholders (placeholder_key, page_path, section_name, element_description, placeholder_type, required_dimensions, priority) VALUES
('faq_hero_banner', '/faq', 'Hero Banner', 'FAQ页主横幅', 'banner', '1920x400', 'low'),
('faq_support_icon', '/faq', 'Support', '帮助中心图标', 'icon', '150x150', 'low'),
('faq_guide_icon', '/faq', 'Guides', '操作指南图标', 'icon', '150x150', 'low'),
('faq_contact_cta', '/faq', 'CTA', '联系我们引导图', 'other', '600x300', 'low');

-- 下载中心 (Downloads - /downloads) - 6个占位符
INSERT INTO placeholders (placeholder_key, page_path, section_name, element_description, placeholder_type, required_dimensions, priority) VALUES
('downloads_hero_banner', '/downloads', 'Hero Banner', '下载页主横幅', 'banner', '1920x400', 'low'),
('downloads_catalog_cover', '/downloads', 'Catalog', '产品目录封面', 'other', '400x550', 'medium'),
('downloads_brochure_cover', '/downloads', 'Brochure', '宣传册封面', 'other', '400x550', 'medium'),
('downloads_cert_sample', '/downloads', 'Certificates', '证书样本', 'other', '600x800', 'low'),
('downloads_spec_sheet', '/downloads', 'Specifications', '技术规格表', 'other', '800x600', 'low'),
('downloads_pdf_icon', '/downloads', 'Icons', 'PDF文档图标', 'icon', '100x100', 'low');

-- 通用组件 (Global Components) - 6个占位符
INSERT INTO placeholders (placeholder_key, page_path, section_name, element_description, placeholder_type, required_dimensions, priority) VALUES
('global_logo', '/', 'Header', '公司Logo', 'icon', '200x60', 'high'),
('global_footer_bg', '/', 'Footer', '页脚背景图', 'banner', '1920x400', 'low'),
('global_loading_icon', '/', 'UI Elements', '加载动画', 'icon', '80x80', 'low'),
('global_404_image', '/404', 'Error Page', '404页面插图', 'other', '600x400', 'low'),
('global_default_avatar', '/', 'User', '默认头像', 'icon', '100x100', 'low'),
('global_no_image', '/', 'Fallback', '无图片占位符', 'other', '400x300', 'low');

-- 显示插入成功消息
SELECT 'Successfully inserted 95 placeholder records! ✅' AS status;
