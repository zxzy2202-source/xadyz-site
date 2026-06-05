import React, { useEffect, useState } from 'react';
import { supabase } from '@/admin/lib/supabaseClient';
import { generateUUID } from '@/admin/lib/uuid';
import { Upload, Image as ImageIcon, CheckCircle2, X } from 'lucide-react';
import { toast } from 'sonner';

// 图片位置定义：区分「页面头图 / Banner」和「模块内图片」
type ImageSlot = {
  key: string;
  label: string;
  role: 'hero' | 'module' | 'section';
  description?: string;
};

// 每个页面需要哪些图片位置
const PAGE_IMAGE_SLOTS: Record<string, ImageSlot[]> = {
  home: [
    {
      key: 'home_hero_banner',
      label: '首页 - 顶部 Banner',
      role: 'hero',
      description: '首页最上方的大图（Hero Banner），用户打开网站第一眼看到的',
    },
    {
      key: 'home_hero_banner_2',
      label: '首页 - 顶部 Banner（第二张）',
      role: 'hero',
      description: '首页顶部轮播使用的第二张 Banner 图',
    },
    {
      key: 'home_about_factory',
      label: '首页 - 工厂介绍图',
      role: 'module',
      description: '首页中部"关于工厂"模块的图片',
    },
  ],
  products: [
    {
      key: 'products_hero_banner',
      label: '产品页 - 顶部 Banner',
      role: 'hero',
      description: '产品总览页最上方的大图（Hero Banner）',
    },
    {
      key: 'products_category_grid',
      label: '产品页 - 分类模块图',
      role: 'module',
      description: '产品总览页中部产品分类模块的大图',
    },
  ],
  'material-supply': [
    {
      key: 'material_supply_hero',
      label: '原料供应总览 - 顶部 Banner',
      role: 'hero',
      description: '原料供应总览页面最上方的大图',
    },
  ],
  'thermal-paper-rolls': [
    {
      key: 'thermal_paper_hero',
      label: '热敏纸 - 顶部 Banner',
      role: 'hero',
      description: '热敏纸卷产品页顶部主图（生产线或产品堆叠）',
    },
    {
      key: 'thermal_paper_packaging_inner',
      label: '热敏纸卷 - 内包装展示',
      role: 'section',
      description: '单卷或多卷热缩膜/包膜内包装的图片',
    },
    {
      key: 'thermal_paper_packaging_carton',
      label: '热敏纸卷 - 纸箱包装展示',
      role: 'section',
      description: '纸箱包装，带角保护和标签标识的图片',
    },
    {
      key: 'thermal_paper_packaging_pallet',
      label: '热敏纸卷 - 托盘打托展示',
      role: 'section',
      description: '托盘打托，并用缠绕膜固定的图片',
    },
    {
      key: 'thermal_paper_packaging_container',
      label: '热敏纸卷 - 装柜现场',
      role: 'section',
      description: '热敏纸卷托盘装入集装箱的装柜现场图片',
    },
  ],
  'thermal-labels': [
    {
      key: 'thermal_labels_hero',
      label: '热敏标签 - 顶部 Banner',
      role: 'hero',
      description: '热敏标签产品页顶部主图（生产线或标签卷堆叠）',
    },
    {
      key: 'thermal_labels_packaging_inner',
      label: '热敏标签 - 内包装展示',
      role: 'section',
      description: '卷装热敏标签的膜包/收缩膜内包装图片',
    },
    {
      key: 'thermal_labels_packaging_carton',
      label: '热敏标签 - 纸箱包装展示',
      role: 'section',
      description: '带隔板和标签标识的纸箱包装图片',
    },
    {
      key: 'thermal_labels_packaging_pallet',
      label: '热敏标签 - 托盘打托展示',
      role: 'section',
      description: '托盘码放标签卷，并用缠绕膜固定的图片',
    },
    {
      key: 'thermal_labels_packaging_container',
      label: '热敏标签 - 装柜现场',
      role: 'section',
      description: '热敏标签托盘装入集装箱的装柜现场图片',
    },
  ],
  'ncr-forms': [
    {
      key: 'ncr_forms_hero',
      label: '无碳复写纸 - 顶部 Banner',
      role: 'hero',
    },
  ],
  manufacturing: [
    {
      key: 'manufacturing_hero',
      label: '制造页 - 顶部 Banner',
      role: 'hero',
    },
    {
      key: 'mfg_production_line_1',
      label: '生产线图片',
      role: 'module',
      description: '制造页中部"生产线"模块的大图',
    },
    {
      key: 'mfg_quality_lab',
      label: '质量实验室图片',
      role: 'module',
      description: '制造页"质量管控 / 实验室"模块的大图',
    },
  ],
  'factory-journal': [
    {
      key: 'factory_journal_hero',
      label: '工厂日志 - 顶部 Banner',
      role: 'hero',
      description: 'Factory Journal 页面最上方的大图（分切线、Jumbo 仓库、4×6 标签分条、装柜现场等）',
    },
  ],
  'factory-overview': [
    {
      key: 'factory_overview_hero',
      label: '工厂概览 - 顶部 Banner',
      role: 'hero',
      description: '工厂概览页面最上方的大图',
    },
  ],
  'quality-control': [
    {
      key: 'quality_control_hero',
      label: '质量管控 - 顶部 Banner',
      role: 'hero',
      description: '质量管控页面最上方的大图',
    },
  ],
  'packaging-shipping': [
    {
      key: 'packaging_shipping_hero',
      label: '包装物流 - 顶部 Banner',
      role: 'hero',
      description: '包装与物流页面最上方的大图',
    },
    {
      key: 'packaging_inner_packing',
      label: '包装物流 - 内包装图片',
      role: 'section',
      description: '展示单卷/小包等产品的内包装方式，用于前台“内包装”图片位',
    },
    {
      key: 'packaging_carton_packing',
      label: '包装物流 - 纸箱包装图片',
      role: 'section',
      description: '展示纸箱包装、角保护、标签标识等，用于前台“纸箱包装”图片位',
    },
    {
      key: 'packaging_pallet_packing',
      label: '包装物流 - 托盘打包图片',
      role: 'section',
      description: '展示整托打包、缠绕膜固定的托盘堆放，用于前台“托盘打包”图片位',
    },
    {
      key: 'packaging_logistics_shipping',
      label: '包装物流 - 物流发货/装柜图片',
      role: 'section',
      description: '展示装柜、装车及发运现场，用于前台“物流发货”图片位',
    },
  ],
  certifications: [
    {
      key: 'certifications_hero',
      label: '认证资质 - 顶部 Banner',
      role: 'hero',
      description: '认证与资质页面最上方的大图',
    },
  ],
  'oem-customization': [
    {
      key: 'oem_customization_hero',
      label: 'OEM 定制 - 顶部 Banner',
      role: 'hero',
      description: 'OEM 定制页面最上方的大图',
    },
  ],
  'production-lines': [
    {
      key: 'production_lines_hero',
      label: '生产线页 - 顶部 Banner',
      role: 'hero',
      description: '生产线页面最上方的大图',
    },
    {
      key: 'production_lines_printing',
      label: '印刷模块主图',
      role: 'module',
      description: '印刷模块主图',
    },
    {
      key: 'production_lines_printing_1',
      label: '印刷模块 - 设备图1',
      role: 'module',
      description: '印刷模块设备图片1',
    },
    {
      key: 'production_lines_printing_2',
      label: '印刷模块 - 设备图2',
      role: 'module',
      description: '印刷模块设备图片2',
    },
    {
      key: 'production_lines_slitting',
      label: '分切模块主图',
      role: 'module',
      description: '分切模块主图',
    },
    {
      key: 'production_lines_slitting_1',
      label: '分切模块 - 设备图1',
      role: 'module',
      description: '分切模块设备图片1',
    },
    {
      key: 'production_lines_slitting_2',
      label: '分切模块 - 设备图2',
      role: 'module',
      description: '分切模块设备图片2',
    },
    {
      key: 'production_lines_packaging',
      label: '包装模块主图',
      role: 'module',
      description: '包装模块主图',
    },
    {
      key: 'production_lines_packaging_1',
      label: '包装模块 - 设备图1',
      role: 'module',
      description: '包装模块设备图片1',
    },
    {
      key: 'production_lines_packaging_2',
      label: '包装模块 - 设备图2',
      role: 'module',
      description: '包装模块设备图片2',
    },
    {
      key: 'production_lines_machine_packing',
      label: '机器打包模块主图',
      role: 'module',
      description: '机器打包模块主图',
    },
    {
      key: 'production_lines_machine_packing_1',
      label: '机器打包模块 - 设备图1',
      role: 'module',
      description: '机器打包模块设备图片1',
    },
    {
      key: 'production_lines_machine_packing_2',
      label: '机器打包模块 - 设备图2',
      role: 'module',
      description: '机器打包模块设备图片2',
    },
  ],
  'thermal-jumbo-rolls': [
    {
      key: 'thermal_jumbo_rolls',
      label: '热敏大卷 - 顶部 Banner',
      role: 'hero',
      description: '热敏大卷原纸页面最上方的大图',
    },
    {
      key: 'thermal_jumbo_rolls_packaging_1',
      label: '包装展示 - 图1',
      role: 'module',
      description: '热敏大卷页面包装模块第一张图（产品/托盘包装）',
    },
    {
      key: 'thermal_jumbo_rolls_packaging_2',
      label: '包装展示 - 图2',
      role: 'module',
      description: '热敏大卷页面包装模块第二张图（托盘/防潮包装）',
    },
    {
      key: 'thermal_jumbo_rolls_shipping_1',
      label: '发货展示 - 图1',
      role: 'module',
      description: '热敏大卷页面发货模块第一张图（托盘准备/装柜前）',
    },
    {
      key: 'thermal_jumbo_rolls_shipping_2',
      label: '发货展示 - 图2',
      role: 'module',
      description: '热敏大卷页面发货模块第二张图（集装箱装货）',
    },
  ],
  'self-adhesive-jumbo-rolls': [
    {
      key: 'self_adhesive_jumbo_rolls',
      label: '自粘大卷 - 顶部 Banner',
      role: 'hero',
      description: '自粘性Jumbo大卷页面最上方的大图',
    },
  ],
  'self-adhesive-sheets': [
    {
      key: 'self_adhesive_sheets',
      label: '自粘片材 - 顶部 Banner',
      role: 'hero',
      description: '自粘片材（A4及定制尺寸）页面最上方的大图',
    },
  ],
  'ncr-jumbo-rolls': [
    {
      key: 'ncr_jumbo_rolls',
      label: 'NCR大卷 - 顶部 Banner',
      role: 'hero',
      description: 'NCR无碳Jumbo大卷页面最上方的大图',
    },
  ],
  'ncr-sheets': [
    {
      key: 'ncr_sheets',
      label: 'NCR片材 - 顶部 Banner',
      role: 'hero',
      description: 'NCR无碳片材页面最上方的大图',
    },
  ],
  // 应用方案 & 资源中心页面
  applications: [
    {
      key: 'applications_hero',
      label: '应用方案总览 - 顶部 Banner',
      role: 'hero',
      description: '应用方案总览页面最上方的大图',
    },
    {
      key: 'applications_industry_grid',
      label: '应用方案 - 行业模块图',
      role: 'module',
      description: '应用方案总览页"服务行业"模块的大图',
    },
  ],
  resources: [
    {
      key: 'resources_hero',
      label: '资源中心 - 顶部 Banner',
      role: 'hero',
      description: '资源中心总览页最上方的大图',
    },
    {
      key: 'resources_featured_card',
      label: '资源中心 - 精选资源模块图',
      role: 'module',
      description: '资源中心"精选资源"模块的大图',
    },
  ],
  'blog-insights': [
    {
      key: 'blog_hero',
      label: '博客洞察 - 顶部 Banner',
      role: 'hero',
      description: '博客列表页最上方的大图',
    },
  ],
  'tools-calculators': [
    {
      key: 'tools_hero',
      label: '工具计算器 - 顶部 Banner',
      role: 'hero',
      description: '工具与计算器页面最上方的大图',
    },
  ],
  faqs: [
    {
      key: 'faqs_hero',
      label: '常见问题 - 顶部 Banner',
      role: 'hero',
      description: 'FAQ 页面最上方的大图',
    },
  ],
  'packaging-logistics': [
    {
      key: 'packaging_shipping_hero',
      label: '包装物流指南 - 顶部 Banner',
      role: 'hero',
      description: '包装与出口物流页面最上方的大图',
    },
  ],
  contact: [
    {
      key: 'contact_hero',
      label: '联系我们 - 顶部 Banner',
      role: 'hero',
      description: '联系我们页面最上方的大图',
    },
  ],
  about: [
    {
      key: 'about_hero',
      label: '关于我们 - 顶部 Banner',
      role: 'hero',
      description: '关于我们页面最上方的大图',
    },
    {
      key: 'about_factory_gate',
      label: '关于我们 - 工厂入口图',
      role: 'module',
      description: 'Factory Showcase 第一张：工厂入口/厂区外观',
    },
    {
      key: 'about_factory_slitting',
      label: '关于我们 - 热敏纸卷分切生产线',
      role: 'module',
      description: 'Factory Showcase 第二张：热敏纸卷印刷/分切生产线',
    },
    {
      key: 'about_factory_printing',
      label: '关于我们 - 热敏标签印刷生产线',
      role: 'module',
      description: 'Factory Showcase 第三张：热敏标签印刷/分切生产线',
    },
    {
      key: 'about_factory_ncr',
      label: '关于我们 - NCR 复写纸生产线',
      role: 'module',
      description: 'Factory Showcase 第四张：NCR Form 生产线',
    },
  ],
  'retail-pos': [
    {
      key: 'retail_pos_hero',
      label: '零售 POS - 顶部 Banner',
      role: 'hero',
      description: '零售POS应用页面最上方的大图',
    },
  ],
  'logistics-warehousing': [
    {
      key: 'logistics_hero',
      label: '物流仓储 - 顶部 Banner',
      role: 'hero',
      description: '物流仓储应用页面最上方的大图',
    },
  ],
  supermarkets: [
    {
      key: 'supermarkets_hero',
      label: '商超 - 顶部 Banner',
      role: 'hero',
      description: '商超应用页面最上方的大图',
    },
  ],
  'banking-finance': [
    {
      key: 'banking_hero',
      label: '银行金融 - 顶部 Banner',
      role: 'hero',
      description: '银行金融应用页面最上方的大图',
    },
  ],
  'government-tenders': [
    {
      key: 'govt_hero',
      label: '政府招标 - 顶部 Banner',
      role: 'hero',
      description: '政府招标应用页面最上方的大图',
    },
  ],
  healthcare: [
    {
      key: 'healthcare_hero',
      label: '医疗 - 顶部 Banner',
      role: 'hero',
      description: '医疗应用页面最上方的大图',
    },
  ],
  'request-tender-pack': [
    {
      key: 'request_tender_pack_hero',
      label: '申请投标资料包 - 顶部 Banner',
      role: 'hero',
      description: '申请投标资料包页面最上方的大图（证书墙/资料展示）',
    },
  ],
};

// 所有页面列表（更完整，带路径，方便运营识别）
const ALL_PAGES: { key: string; label: string }[] = [
  { key: 'home', label: '首页 /' },
  { key: 'products', label: '产品页 /products' },
  { key: 'thermal-paper-rolls', label: '热敏纸 /thermal-paper-rolls' },
  { key: 'thermal-labels', label: '热敏标签 /thermal-labels' },
  { key: 'ncr-forms', label: '无碳复写纸 /ncr-forms' },
  { key: 'material-supply', label: '原料供应总览 /material-supply' },
  { key: 'thermal-jumbo-rolls', label: '热敏大卷 /material-supply/thermal-jumbo-rolls' },
  { key: 'self-adhesive-jumbo-rolls', label: '自粘大卷 /material-supply/self-adhesive-jumbo-rolls' },
  { key: 'self-adhesive-sheets', label: '自粘卷材 /material-supply/self-adhesive-sheets' },
  { key: 'ncr-jumbo-rolls', label: '无碳大卷 /material-supply/ncr-jumbo-rolls' },
  { key: 'ncr-sheets', label: '无碳卷材 /material-supply/ncr-sheets' },
  { key: 'applications', label: '应用方案总览 /applications' },
  { key: 'retail-pos', label: '零售 POS /applications/retail-pos' },
  { key: 'logistics-warehousing', label: '物流仓储 /applications/logistics-warehousing' },
  { key: 'supermarkets', label: '商超 /applications/supermarkets' },
  { key: 'banking-finance', label: '银行金融 /applications/banking-finance' },
  { key: 'government-tenders', label: '政府招标 /applications/government-tenders' },
  { key: 'healthcare', label: '医疗 /applications/healthcare' },
  { key: 'request-tender-pack', label: '申请投标资料包 /request-tender-pack' },
  { key: 'manufacturing', label: '制造总览 /manufacturing' },
  { key: 'factory-overview', label: '工厂概览 /manufacturing/factory-overview' },
  { key: 'production-lines', label: '生产线 /manufacturing/production-lines' },
  { key: 'quality-control', label: '质量管控 /manufacturing/quality-control' },
  { key: 'packaging-shipping', label: '包装物流 /manufacturing/packaging-shipping' },
  { key: 'certifications', label: '认证资质 /manufacturing/certifications' },
  { key: 'oem-customization', label: 'OEM 定制 /manufacturing/oem-customization' },
  { key: 'factory-journal', label: '工厂日志 /manufacturing/factory-journal' },
  { key: 'resources', label: '资源中心 /resources' },
  { key: 'blog-insights', label: '博客洞察 /resources/blog-insights' },
  { key: 'tools-calculators', label: '工具计算器 /resources/tools-calculators' },
  { key: 'faqs', label: '常见问题 /resources/faqs' },
  { key: 'packaging-logistics', label: '包装物流 /resources/packaging-logistics' },
  { key: 'contact', label: '联系我们 /contact' },
  { key: 'about', label: '关于我们 /about' },
];

export function PlaceholderTrackerPage() {
  const [selectedPage, setSelectedPage] = useState<string>('');
  const [assets, setAssets] = useState<any[]>([]);
  const [placeholders, setPlaceholders] = useState<Record<string, any>>({});
  const [uploading, setUploading] = useState<Record<string, boolean>>({});
  const [showAssetPicker, setShowAssetPicker] = useState<string | null>(null);

  // 加载素材库
  useEffect(() => {
    loadAssets();
  }, []);

  // 加载占位符绑定状态
  useEffect(() => {
    if (selectedPage) {
      loadPlaceholders();
    }
  }, [selectedPage]);

  const loadAssets = async () => {
    try {
      const { data, error } = await supabase
        .from('assets')
        .select('*')
        .order('created_at', { ascending: false });
      
      if (error) throw error;
      setAssets(data || []);
    } catch (err: any) {
      console.error('加载素材失败:', err);
    }
  };

  const loadPlaceholders = async () => {
    if (!selectedPage) return;
    
    try {
      const slots = PAGE_IMAGE_SLOTS[selectedPage] || [];
      const keys = slots.map(s => s.key);
      
      const { data, error } = await supabase
        .from('placeholders')
        .select('*, assets(*)')
        .in('placeholder_key', keys);
      
      if (error) throw error;
      
      const map: Record<string, any> = {};
      (data || []).forEach((p: any) => {
        map[p.placeholder_key] = p;
      });
      
      setPlaceholders(map);
    } catch (err: any) {
      console.error('加载占位符失败:', err);
    }
  };

  // 上传新图片并绑定
  const handleUpload = async (slotKey: string, file: File) => {
    if (!selectedPage) return;
    
    setUploading({ ...uploading, [slotKey]: true });
    
    try {
      // 1. 上传到 Supabase Storage
      const now = new Date();
      const year = now.getFullYear();
      const month = String(now.getMonth() + 1).padStart(2, '0');
      const uuid = generateUUID();
      const ext = file.name.split('.').pop();
      const filePath = `${year}/${month}/${uuid}.${ext}`;
      
      const { error: uploadError } = await supabase.storage
        .from('assets-products')
        .upload(filePath, file, { cacheControl: '3600', upsert: false });
      
      if (uploadError) throw uploadError;
      
      // 2. 获取公开 URL
      const { data: { publicUrl } } = supabase.storage
        .from('assets-products')
        .getPublicUrl(filePath);
      
      // 3. 创建素材记录
      const { data: { user } } = await supabase.auth.getUser();
      const { data: assetData, error: assetError } = await supabase
        .from('assets')
        .insert({
          title: file.name,
          file_name: file.name,
          file_type: 'image',
          file_url: publicUrl,
          file_size: file.size,
          approved: true, // 自动批准
          uploaded_by: user?.id || null,
        })
        .select()
        .single();
      
      if (assetError) throw assetError;
      
      // 4. 绑定到占位符
      await bindToPlaceholder(slotKey, assetData.id);
      
      toast.success('上传成功！');
      await loadAssets();
      await loadPlaceholders();
    } catch (err: any) {
      toast.error(err?.message || '上传失败');
    } finally {
      setUploading({ ...uploading, [slotKey]: false });
    }
  };

  // 从素材库选择并绑定
  const handleSelectFromLibrary = async (slotKey: string, assetId: string) => {
    await bindToPlaceholder(slotKey, assetId);
    setShowAssetPicker(null);
    await loadPlaceholders();
    toast.success('绑定成功！');
  };

  // 绑定到占位符（创建或更新）
  const bindToPlaceholder = async (slotKey: string, assetId: string) => {
    const slot = PAGE_IMAGE_SLOTS[selectedPage]?.find(s => s.key === slotKey);
    if (!slot) return;
    
    // 检查占位符是否存在
    const existing = placeholders[slotKey];
    
    if (existing) {
      // 更新现有占位符
      const { error } = await supabase
        .from('placeholders')
        .update({
          asset_id: assetId,
          status: 'replaced',
          updated_at: new Date().toISOString(),
        })
        .eq('id', existing.id);
      
      if (error) throw error;
    } else {
      // 创建新占位符
      const pagePath = selectedPage === 'home' ? '/' : `/${selectedPage}`;
      const { error } = await supabase
        .from('placeholders')
        .insert({
          placeholder_key: slotKey,
          page_path: pagePath,
          section_name: slot.label,
          placeholder_type: slot.role === 'hero' ? 'hero' : 'product',
          asset_id: assetId,
          status: 'replaced',
          priority: 'high',
        });
      
      if (error) throw error;
    }
  };

  // 对图片位置排序：Banner 在前，模块图在后
  const currentSlots = selectedPage
    ? (PAGE_IMAGE_SLOTS[selectedPage] || []).sort((a, b) => {
        if (a.role === 'hero' && b.role !== 'hero') return -1;
        if (a.role !== 'hero' && b.role === 'hero') return 1;
        return 0;
      })
    : [];

  return (
    <div className="space-y-6 p-6">
      {/* 标题 */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">页面图片管理</h1>
        <p className="text-gray-600 mt-2">选择页面，上传或选择图片即可</p>
      </div>

      {/* 页面选择器 */}
      <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
        <label className="block text-sm font-semibold text-gray-700 mb-3">
          选择页面
        </label>
        <select
          value={selectedPage}
          onChange={(e) => setSelectedPage(e.target.value)}
          className="w-full md:w-80 px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-base"
        >
          <option value="">-- 请选择页面 --</option>
          {ALL_PAGES.map(page => (
            <option key={page.key} value={page.key}>{page.label}</option>
          ))}
        </select>
      </div>

      {/* 图片位置列表 */}
      {selectedPage && currentSlots.length > 0 && (
        <div className="space-y-4">
          {currentSlots.map(slot => {
            const placeholder = placeholders[slot.key];
            const hasImage = placeholder?.assets?.file_url;
            const isUploading = uploading[slot.key];
            
            return (
              <div
                key={slot.key}
                className={`rounded-xl shadow-sm p-6 border-2 ${
                  slot.role === 'hero'
                    ? 'bg-gradient-to-br from-purple-50 to-pink-50 border-purple-300'
                    : 'bg-white border-gray-200'
                }`}
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1 space-y-1">
                    <div className="flex items-center gap-2 flex-wrap">
                      {slot.role === 'hero' && (
                        <span className="inline-flex items-center px-2 py-0.5 bg-purple-600 text-white rounded text-xs font-bold">
                          ⭐ 优先
                        </span>
                      )}
                      <h3 className={`text-lg font-semibold ${slot.role === 'hero' ? 'text-purple-900' : 'text-gray-900'}`}>
                        {slot.label}
                      </h3>
                      {/* 角色标记：一眼看出是 Banner 还是模块图 */}
                      <span
                        className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                          slot.role === 'hero'
                            ? 'bg-purple-200 text-purple-900 border border-purple-300'
                            : 'bg-blue-100 text-blue-800'
                        }`}
                      >
                        {slot.role === 'hero' ? '页面头图 / Banner' : '正文模块图片'}
                      </span>
                      {/* 占位符 Key，方便和前台 / 需求文档对应 */}
                      <code className="px-2 py-0.5 bg-gray-100 text-gray-700 rounded text-xs font-mono">
                        {slot.key}
                      </code>
                    </div>
                    {slot.description && (
                      <p className="text-sm text-gray-500">{slot.description}</p>
                    )}
                  </div>
                  {hasImage && (
                    <span className="inline-flex items-center gap-1 px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm">
                      <CheckCircle2 className="w-4 h-4" />
                      已上传
                    </span>
                  )}
                </div>

                {/* 当前图片预览 */}
                {hasImage && (
                  <div className="mb-4">
                    <img
                      src={placeholder.assets.file_url}
                      alt={slot.label}
                      className="w-full max-w-md h-48 object-cover rounded-lg border border-gray-200"
                    />
                  </div>
                )}

                {/* 操作按钮 */}
                <div className="flex gap-3">
                  {/* 上传新图片 */}
                  <label className="flex-1">
                    <input
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={(e) => {
                        const file = e.target.files?.[0];
                        if (file) handleUpload(slot.key, file);
                      }}
                      disabled={isUploading}
                    />
                    <div className="flex items-center justify-center gap-2 px-4 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg cursor-pointer transition-colors disabled:opacity-50 disabled:cursor-not-allowed">
                      <Upload className="w-5 h-5" />
                      {isUploading ? '上传中...' : hasImage ? '更换图片' : '上传图片'}
                    </div>
                  </label>

                  {/* 从素材库选择 */}
                  <button
                    onClick={() => setShowAssetPicker(showAssetPicker === slot.key ? null : slot.key)}
                    className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg transition-colors"
                  >
                    <ImageIcon className="w-5 h-5" />
                    从素材库选择
                  </button>
                </div>

                {/* 素材库选择弹窗 */}
                {showAssetPicker === slot.key && (
                  <div className="mt-4 p-4 bg-gray-50 rounded-lg border border-gray-200">
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-sm font-semibold text-gray-700">选择图片</span>
                      <button
                        onClick={() => setShowAssetPicker(null)}
                        className="text-gray-400 hover:text-gray-600"
                      >
                        <X className="w-5 h-5" />
                      </button>
                    </div>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-3 max-h-64 overflow-y-auto">
                      {assets.length === 0 ? (
                        <div className="col-span-full text-center text-gray-500 py-8">
                          素材库暂无图片
                        </div>
                      ) : (
                        assets.map(asset => (
                          <div
                            key={asset.id}
                            onClick={() => handleSelectFromLibrary(slot.key, asset.id)}
                            className="cursor-pointer group"
                          >
                            <div className="aspect-video bg-gray-100 rounded-lg overflow-hidden border-2 border-transparent group-hover:border-blue-500 transition-colors">
                              {asset.file_type === 'image' ? (
                                <img
                                  src={asset.file_url}
                                  alt={asset.title || asset.file_name}
                                  className="w-full h-full object-cover"
                                />
                              ) : (
                                <div className="w-full h-full flex items-center justify-center">
                                  <ImageIcon className="w-8 h-8 text-gray-400" />
                                </div>
                              )}
                            </div>
                            <p className="text-xs text-gray-600 mt-1 truncate">
                              {asset.title || asset.file_name}
                            </p>
                          </div>
                        ))
                      )}
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}

      {selectedPage && currentSlots.length === 0 && (
        <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-6 text-center text-yellow-800">
          <p>该页面暂未配置图片位置</p>
        </div>
      )}
    </div>
  );
}
