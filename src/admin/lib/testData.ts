// 测试数据脚本 - 仅用于开发测试
import { supabase } from './supabaseClient';

export async function insertTestAssets() {
  try {
    // 先获取当前用户ID
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) {
      throw new Error('未登录，无法插入测试数据');
    }

    const testAssets = [
      {
        file_name: 'factory-workshop-1.jpg',
        file_url: 'https://images.unsplash.com/photo-1565793298595-6a879b1d9492?w=800',
        file_type: 'image',
        file_size: 245678,
        category: 'factory',
        tags: ['工厂', '车间', '生产线'],
        status: 'pending',
        uploaded_by: user.id,
      },
      {
        file_name: 'product-tissue-box.jpg',
        file_url: 'https://images.unsplash.com/photo-1584820927498-cfe5211fd8bf?w=800',
        file_type: 'image',
        file_size: 189234,
        category: 'product',
        tags: ['产品', '纸巾盒', '包装'],
        status: 'pending',
        uploaded_by: user.id,
      },
      {
        file_name: 'material-paper-rolls.jpg',
        file_url: 'https://images.unsplash.com/photo-1506755855567-92ff770e8d00?w=800',
        file_type: 'image',
        file_size: 312456,
        category: 'material',
        tags: ['原料', '纸卷', '材料'],
        status: 'pending',
        uploaded_by: user.id,
      },
      {
        file_name: 'banner-hero-main.jpg',
        file_url: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=1600',
        file_type: 'image',
        file_size: 567890,
        category: 'banner',
        tags: ['横幅', '首页', 'hero'],
        status: 'pending',
        uploaded_by: user.id,
      },
      {
        file_name: 'factory-exterior.jpg',
        file_url: 'https://images.unsplash.com/photo-1581092160562-40aa08e78837?w=800',
        file_type: 'image',
        file_size: 423567,
        category: 'factory',
        tags: ['工厂', '建筑', '外观'],
        status: 'pending',
        uploaded_by: user.id,
      },
      {
        file_name: 'product-tissue-pack.jpg',
        file_url: 'https://images.unsplash.com/photo-1563291074-2bf8677ac0e5?w=800',
        file_type: 'image',
        file_size: 198765,
        category: 'product',
        tags: ['产品', '抽纸', '包装'],
        status: 'approved', // 这个设为已批准，方便测试占位符绑定
        uploaded_by: user.id,
        approved_by: user.id,
      },
    ];

    const { data, error } = await supabase
      .from('assets')
      .insert(testAssets)
      .select();

    if (error) throw error;

    console.log('✅ 成功插入测试素材:', data?.length, '条');
    return { success: true, count: data?.length };
  } catch (error: any) {
    console.error('❌ 插入测试素材失败:', error.message);
    return { success: false, error: error.message };
  }
}

export async function insertTestPlaceholders() {
  try {
    // 插入10个测试占位符
    const testPlaceholders = [
      {
        placeholder_key: 'home_hero_banner',
        page_path: '/',
        section_name: 'Hero Banner',
        element_description: '首页主横幅大图',
        placeholder_type: 'hero',
        required_dimensions: '1920x800',
        status: 'missing',
        priority: 'high',
      },
      {
        placeholder_key: 'home_about_factory',
        page_path: '/',
        section_name: 'About Section',
        element_description: '关于我们-工厂图片',
        placeholder_type: 'factory',
        required_dimensions: '600x400',
        status: 'missing',
        priority: 'high',
      },
      {
        placeholder_key: 'home_product_1',
        page_path: '/',
        section_name: 'Products Grid',
        element_description: '产品展示图1',
        placeholder_type: 'product',
        required_dimensions: '400x300',
        status: 'missing',
        priority: 'medium',
      },
      {
        placeholder_key: 'home_product_2',
        page_path: '/',
        section_name: 'Products Grid',
        element_description: '产品展示图2',
        placeholder_type: 'product',
        required_dimensions: '400x300',
        status: 'missing',
        priority: 'medium',
      },
      {
        placeholder_key: 'about_factory_exterior',
        page_path: '/about',
        section_name: 'Company Intro',
        element_description: '工厂外观',
        placeholder_type: 'factory',
        required_dimensions: '800x600',
        status: 'missing',
        priority: 'high',
      },
      {
        placeholder_key: 'products_hero_banner',
        page_path: '/products',
        section_name: 'Hero Banner',
        element_description: '产品页主横幅',
        placeholder_type: 'banner',
        required_dimensions: '1920x500',
        status: 'missing',
        priority: 'high',
      },
      {
        placeholder_key: 'products_tissue_box_1',
        page_path: '/products',
        section_name: 'Tissue Boxes',
        element_description: '盒装纸巾产品图1',
        placeholder_type: 'product',
        required_dimensions: '500x500',
        status: 'missing',
        priority: 'high',
      },
      {
        placeholder_key: 'mfg_production_line_1',
        page_path: '/manufacturing',
        section_name: 'Production Lines',
        element_description: '生产线全景1',
        placeholder_type: 'factory',
        required_dimensions: '800x500',
        status: 'missing',
        priority: 'high',
      },
      {
        placeholder_key: 'contact_office_exterior',
        page_path: '/contact',
        section_name: 'Location',
        element_description: '办公楼外观',
        placeholder_type: 'other',
        required_dimensions: '600x400',
        status: 'missing',
        priority: 'medium',
      },
      {
        placeholder_key: 'global_logo',
        page_path: '/',
        section_name: 'Header',
        element_description: '公司Logo',
        placeholder_type: 'icon',
        required_dimensions: '200x60',
        status: 'missing',
        priority: 'high',
      },
    ];

    const { data, error } = await supabase
      .from('placeholders')
      .insert(testPlaceholders)
      .select();

    if (error) throw error;

    console.log('✅ 成功插入测试占位符:', data?.length, '条');
    return { success: true, count: data?.length };
  } catch (error: any) {
    console.error('❌ 插入测试占位符失败:', error.message);
    return { success: false, error: error.message };
  }
}

export async function deleteAllAssets() {
  try {
    const { error } = await supabase
      .from('assets')
      .delete()
      .neq('id', '00000000-0000-0000-0000-000000000000'); // 删除所有记录

    if (error) throw error;

    console.log('✅ 已清空所有素材');
    return { success: true };
  } catch (error: any) {
    console.error('❌ 清空素材失败:', error.message);
    return { success: false, error: error.message };
  }
}

export async function deleteAllPlaceholders() {
  try {
    const { error } = await supabase
      .from('placeholders')
      .delete()
      .neq('id', '00000000-0000-0000-0000-000000000000'); // 删除所有记录

    if (error) throw error;

    console.log('✅ 已清空所有占位符');
    return { success: true };
  } catch (error: any) {
    console.error('❌ 清空占位符失败:', error.message);
    return { success: false, error: error.message };
  }
}
