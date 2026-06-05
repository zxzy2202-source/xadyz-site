import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import { getCurrentUser } from '@/admin/lib/auth';
import { AdminLayout } from '@/admin/app/layout/AdminLayout';

interface ProtectedRouteProps {
  children: React.ReactNode;
}

export function ProtectedRoute({ children }: ProtectedRouteProps) {
  const [loading, setLoading] = useState(true);
  const [authenticated, setAuthenticated] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    checkAuth();
  }, [navigate]);

  const checkAuth = async () => {
    try {
      const user = await getCurrentUser();
      if (!user) {
        navigate('/admin/login');
      } else {
        setAuthenticated(true);
      }
    } catch (error) {
      navigate('/admin/login');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="flex flex-col items-center gap-4">
          <div className="w-10 h-10 border-2 border-blue-500 border-t-transparent rounded-full animate-spin" aria-hidden="true" />
          <p className="text-sm text-gray-500">正在验证登录...</p>
        </div>
      </div>
    );
  }

  if (!authenticated) {
    return null;
  }

  return <AdminLayout>{children}</AdminLayout>;
}