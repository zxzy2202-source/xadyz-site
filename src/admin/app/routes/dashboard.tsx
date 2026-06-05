import React, { useEffect, useState } from 'react';
import { Link } from 'react-router';
import { supabase } from '@/admin/lib/supabaseClient';
import { Users, FileText, Image, AlertTriangle, ChevronDown, ChevronUp, Wrench } from 'lucide-react';
import { getCurrentUser } from '@/admin/lib/auth';
import { insertTestAssets, insertTestPlaceholders } from '@/admin/lib/testData';
import { insertCompletePlaceholders, deleteAllPlaceholders, getPlaceholderStats } from '@/admin/lib/placeholderHelpers';
import { toast } from 'sonner';

interface Stats {
  totalLeads: number;
  newLeads: number;
  totalAssets: number;
  missingPlaceholders: number;
}

export function DashboardPage() {
  const [stats, setStats] = useState<Stats>({
    totalLeads: 0,
    newLeads: 0,
    totalAssets: 0,
    missingPlaceholders: 0,
  });
  const [loading, setLoading] = useState(true);
  const [devToolsOpen, setDevToolsOpen] = useState(false);

  useEffect(() => {
    loadStats();
  }, []);

  const loadStats = async () => {
    try {
      // Get leads count
      const { count: totalLeads } = await supabase
        .from('leads')
        .select('*', { count: 'exact', head: true });

      // Get new leads (last 7 days)
      const sevenDaysAgo = new Date();
      sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);
      const { count: newLeads } = await supabase
        .from('leads')
        .select('*', { count: 'exact', head: true })
        .gte('created_at', sevenDaysAgo.toISOString());

      // Get assets count
      const { count: totalAssets } = await supabase
        .from('assets')
        .select('*', { count: 'exact', head: true });

      // Get missing placeholders
      const { count: missingPlaceholders } = await supabase
        .from('placeholders')
        .select('*', { count: 'exact', head: true })
        .eq('status', 'missing');

      setStats({
        totalLeads: totalLeads || 0,
        newLeads: newLeads || 0,
        totalAssets: totalAssets || 0,
        missingPlaceholders: missingPlaceholders || 0,
      });
    } catch (error) {
      console.error('Error loading stats:', error);
    } finally {
      setLoading(false);
    }
  };

  const statCards = [
    {
      name: '线索总数',
      value: stats.totalLeads,
      icon: Users,
      color: 'text-blue-600',
      bgColor: 'bg-blue-50',
    },
    {
      name: '新增线索（7天）',
      value: stats.newLeads,
      icon: FileText,
      color: 'text-green-600',
      bgColor: 'bg-green-50',
    },
    {
      name: '素材总数',
      value: stats.totalAssets,
      icon: Image,
      color: 'text-purple-600',
      bgColor: 'bg-purple-50',
    },
    {
      name: '缺失占位符',
      value: stats.missingPlaceholders,
      icon: AlertTriangle,
      color: 'text-orange-600',
      bgColor: 'bg-orange-50',
    },
  ];

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center h-64 gap-4">
        <div className="w-10 h-10 border-2 border-blue-500 border-t-transparent rounded-full animate-spin" aria-hidden="true" />
        <p className="text-sm text-gray-500">加载中...</p>
      </div>
    );
  }

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">控制台</h1>
        <p className="text-gray-600 mt-1">欢迎使用志信纸业后台管理系统</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {statCards.map((stat) => {
          const Icon = stat.icon;
          return (
            <div
              key={stat.name}
              className="bg-white rounded-lg shadow p-6 border border-gray-200"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">{stat.name}</p>
                  <p className="text-3xl font-bold text-gray-900 mt-2">{stat.value}</p>
                </div>
                <div className={`p-3 rounded-full ${stat.bgColor}`}>
                  <Icon className={`w-6 h-6 ${stat.color}`} />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="mt-8 bg-white rounded-lg shadow p-6 border border-gray-200">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">快捷操作</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Link
            to="/admin/leads"
            className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 hover:border-blue-200 transition-colors block"
          >
            <h3 className="font-medium text-gray-900">查看线索</h3>
            <p className="text-sm text-gray-600 mt-1">管理和跟进客户线索</p>
          </Link>
          <Link
            to="/admin/assets"
            className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 hover:border-blue-200 transition-colors block"
          >
            <h3 className="font-medium text-gray-900">上传素材</h3>
            <p className="text-sm text-gray-600 mt-1">添加新的图片和文档</p>
          </Link>
          <Link
            to="/admin/placeholders"
            className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 hover:border-blue-200 transition-colors block"
          >
            <h3 className="font-medium text-gray-900">修复占位符</h3>
            <p className="text-sm text-gray-600 mt-1">替换网站上缺失的图片</p>
          </Link>
        </div>

        {/* 开发工具（仅限本地开发环境） */}
        {import.meta.env.DEV && <div className="mt-6 pt-6 border-t border-gray-200">
          <button
            onClick={() => setDevToolsOpen(!devToolsOpen)}
            className="flex items-center gap-2 text-sm font-medium text-gray-600 hover:text-gray-900"
          >
            <Wrench className="w-4 h-4" />
            开发工具
            {devToolsOpen ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
          </button>
          {devToolsOpen && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
          <button
            onClick={async () => {
              try {
                toast.loading('正在插入测试数据...');
                const result = await insertTestAssets();
                
                if (result.success) {
                  toast.dismiss();
                  toast.success(`成功插入 ${result.count} 条测试素材！`);
                  await loadStats(); // 重新加载统计数据
                } else {
                  toast.dismiss();
                  toast.error(`插入失败: ${result.error}`);
                  console.error('插入测试素材失败:', result.error);
                }
              } catch (error: any) {
                toast.dismiss();
                toast.error('插入测试素材时发生错误');
                console.error('插入测试素材异常:', error);
              }
            }}
            className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
          >
            <h3 className="font-medium text-gray-900">插入测试素材</h3>
            <p className="text-sm text-gray-600 mt-1">插入测试素材到数据库</p>
          </button>
          <button
            onClick={async () => {
              try {
                toast.loading('正在插入测试占位符...');
                const result = await insertTestPlaceholders();
                
                if (result.success) {
                  toast.dismiss();
                  toast.success(`成功插入 ${result.count} 条测试占位符！`);
                  await loadStats(); // 重新加载统计数据
                } else {
                  toast.dismiss();
                  toast.error(`插入失败: ${result.error}`);
                  console.error('插入测试占位符失败:', result.error);
                }
              } catch (error: any) {
                toast.dismiss();
                toast.error('插入测试占位符时发生错误');
                console.error('插入测试占位符异常:', error);
              }
            }}
            className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
          >
            <h3 className="font-medium text-gray-900">插入测试占位符</h3>
            <p className="text-sm text-gray-600 mt-1">插入测试占位符到数据库</p>
          </button>
          <button
            onClick={async () => {
              try {
                toast.loading('正在插入完整占位符...');
                const result = await insertCompletePlaceholders();
                
                if (result.success) {
                  toast.dismiss();
                  toast.success(`成功插入 ${result.count} 条完整占位符！`);
                  await loadStats(); // 重新加载统计数据
                } else {
                  toast.dismiss();
                  toast.error(`插入失败: ${result.error}`);
                  console.error('插入完整占位符失败:', result.error);
                }
              } catch (error: any) {
                toast.dismiss();
                toast.error('插入完整占位符时发生错误');
                console.error('插入完整占位符异常:', error);
              }
            }}
            className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
          >
            <h3 className="font-medium text-gray-900">✅ 插入完整占位符（18个）</h3>
            <p className="text-sm text-gray-600 mt-1">基于实际页面代码扫描，插入精确的占位符数据（含三语言路径）</p>
          </button>
          <button
            onClick={async () => {
              try {
                toast.loading('正在删除所有占位符...');
                const result = await deleteAllPlaceholders();
                
                if (result.success) {
                  toast.dismiss();
                  toast.success(`成功删除 ${result.count} 条占位符！`);
                  await loadStats(); // 重新��载统计数据
                } else {
                  toast.dismiss();
                  toast.error(`删除失败: ${result.error}`);
                  console.error('删除所有占位符失败:', result.error);
                }
              } catch (error: any) {
                toast.dismiss();
                toast.error('删除所有占位符时发生错误');
                console.error('删除所有占位符异常:', error);
              }
            }}
            className="p-4 border border-red-200 rounded-lg hover:bg-red-50 transition-colors"
          >
            <h3 className="font-medium text-red-900">🗑️ 删除所有占位符</h3>
            <p className="text-sm text-red-600 mt-1">清空数据库中的所有占位符（请先备份！）</p>
          </button>
          <button
            onClick={async () => {
              try {
                toast.loading('正在获取占位符统计信息...');
                const result = await getPlaceholderStats();
                
                if (result.success) {
                  toast.dismiss();
                  toast.success(`成功获取占位符统计信息！`);
                  console.log('占位符统计信息:', result.stats);
                } else {
                  toast.dismiss();
                  toast.error(`获取失败: ${result.error}`);
                  console.error('获取占位符统计信息失败:', result.error);
                }
              } catch (error: any) {
                toast.dismiss();
                toast.error('获取占位符统计信息时发生错误');
                console.error('获取占位符统计信息异常:', error);
              }
            }}
            className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
          >
            <h3 className="font-medium text-gray-900">获取占位符统计信息</h3>
            <p className="text-sm text-gray-600 mt-1">获取数据库中占位符的统计信息</p>
          </button>
            </div>
          )}
        </div>}
      </div>
    </div>
  );
}