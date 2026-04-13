import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { Link, useNavigate, useLocation } from 'react-router';
import { getCurrentUser, signOut, hasPermission, User } from '@/admin/lib/auth';
import { 
  LayoutDashboard, 
  Users, 
  Image, 
  ImageOff, 
  FileText, 
  MapPin,
  ExternalLink,
  LogOut,
  Menu,
  X
} from 'lucide-react';
import { toast } from 'sonner';

interface AdminLayoutProps {
  children: React.ReactNode;
}

export function AdminLayout({ children }: AdminLayoutProps) {
  const [user, setUser] = useState<User | null>(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    loadUser();
  }, []);

  const loadUser = async () => {
    try {
      const currentUser = await getCurrentUser();
      setUser(currentUser);
    } catch (error) {
      console.error('加载用户失败:', error);
    }
  };

  const handleSignOut = async () => {
    try {
      await signOut();
      toast.success('退出登录成功');
      navigate('/admin/login');
    } catch (error: any) {
      toast.error(error.message || '退出登录失败');
    }
  };

  const navigation = [
    { 
      name: '控制台', 
      href: '/admin', 
      icon: LayoutDashboard,
      permission: 'view_dashboard',
      exact: true
    },
    { 
      name: '线索管理', 
      href: '/admin/leads', 
      icon: Users,
      permission: 'view_leads'
    },
    { 
      name: '素材管理', 
      href: '/admin/assets', 
      icon: Image,
      permission: 'view_assets'
    },
    { 
      name: '占位符', 
      href: '/admin/placeholders', 
      icon: ImageOff,
      permission: 'manage_placeholders'
    },
    { 
      name: '证据标签', 
      href: '/admin/assets/evidence-tags', 
      icon: FileText,
      permission: 'view_assets'
    },
    { 
      name: '页面素材对应', 
      href: '/admin/page-assets', 
      icon: MapPin,
      permission: 'view_assets'
    },
    { 
      name: '工厂日志', 
      href: '/admin/factory-journal', 
      icon: FileText,
      permission: 'view_dashboard'
    },
    { 
      name: '博客管理', 
      href: '/admin/blog', 
      icon: FileText,
      permission: 'view_dashboard'
    },
  ];

  const strapiAdminUrl = typeof import.meta !== 'undefined' && import.meta.env?.VITE_STRAPI_URL
    ? `${String(import.meta.env.VITE_STRAPI_URL).replace(/\/$/, '')}/admin`
    : 'http://localhost:1337/admin';

  const visibleNavigation = navigation.filter(item => 
    !item.disabled && (!item.permission || hasPermission(user?.role, item.permission))
  );

  const pageTitles: [string, string][] = [
    ['/admin/assets/evidence-tags', '证据标签'],
    ['/admin/page-assets', '页面素材对应'],
    ['/admin/factory-journal', '工厂日志管理'],
    ['/admin/blog/new', '新建文章'],
    ['/admin/blog/', '编辑文章'],
    ['/admin/blog', '博客管理'],
    ['/admin/leads', '线索管理'],
    ['/admin/assets', '素材管理'],
    ['/admin/placeholders', '占位符'],
    ['/admin', '控制台'],
  ];
  const title = pageTitles.find(([path]) =>
    path === '/admin' ? location.pathname === '/admin' : location.pathname.startsWith(path)
  )?.[1] || '志信纸业 Admin';

  return (
    <div className="min-h-screen bg-gray-50 font-sans antialiased">
      <Helmet>
        <title>{title} | 志信纸业</title>
      </Helmet>
      {/* Mobile sidebar backdrop */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 bg-gray-600 bg-opacity-75 z-20 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div className={`
        fixed inset-y-0 left-0 z-30 w-64 bg-white border-r border-gray-200 transform transition-transform duration-300 ease-in-out
        ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}
        lg:translate-x-0
      `}>
        <div className="flex flex-col h-full">
          {/* Logo */}
          <div className="flex items-center justify-between h-16 px-6 border-b border-gray-200">
            <h1 className="text-xl font-bold text-gray-900">志信纸业</h1>
            <button
              onClick={() => setSidebarOpen(false)}
              className="lg:hidden"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          {/* Navigation */}
          <nav className="flex-1 px-4 py-4 space-y-1 overflow-y-auto">
            {visibleNavigation.map((item) => {
              const Icon = item.icon;
              const isActive = item.exact 
                ? location.pathname === item.href
                : location.pathname.startsWith(item.href);
              
              return (
                <Link
                  key={item.name}
                  to={item.href}
                  onClick={() => setSidebarOpen(false)}
                  className={`
                    flex items-center gap-3 px-4 py-2 text-sm font-medium rounded-md
                    ${isActive 
                      ? 'bg-blue-50 text-blue-700' 
                      : 'text-gray-700 hover:bg-gray-50'
                    }
                  `}
                >
                  <Icon className="w-5 h-5" />
                  {item.name}
                </Link>
              );
            })}
            <a
              href={strapiAdminUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 px-4 py-2 text-sm font-medium rounded-md text-gray-700 hover:bg-gray-50"
            >
              <ExternalLink className="w-5 h-5" />
              CMS 管理 (Strapi)
            </a>
          </nav>

          {/* User section */}
          <div className="p-4 border-t border-gray-200">
            <div className="flex items-center justify-between">
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-900 truncate">
                  {user?.email}
                </p>
                <p className="text-xs text-gray-500 uppercase">
                  {user?.role || '用户'}
                </p>
              </div>
              <button
                onClick={handleSignOut}
                className="ml-2 p-2 text-gray-400 hover:text-gray-600 rounded-md hover:bg-gray-50"
                title="退出登录"
              >
                <LogOut className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="lg:pl-64">
        {/* Mobile header */}
        <div className="lg:hidden sticky top-0 z-10 flex items-center justify-between h-16 px-4 bg-white border-b border-gray-200">
          <button
            onClick={() => setSidebarOpen(true)}
            className="p-2 text-gray-600 hover:text-gray-900"
          >
            <Menu className="w-6 h-6" />
          </button>
          <h1 className="text-lg font-semibold text-gray-900">志信纸业 Admin</h1>
          <div className="w-10" /> {/* Spacer for centering */}
        </div>

        {/* Page content */}
        <main className="p-6">
          {children}
        </main>
      </div>
    </div>
  );
}
