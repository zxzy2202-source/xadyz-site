import { supabase } from './supabaseClient';

export interface User {
  id: string;
  email: string;
  role?: 'owner' | 'supervisor' | 'ops' | 'sales' | 'admin';
}

export async function signIn(email: string, password: string) {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });
  
  if (error) throw error;
  
  // Get user role
  if (data.user) {
    const { data: roleData } = await supabase
      .from('user_roles')
      .select('role')
      .eq('user_id', data.user.id)
      .single();
    
    return {
      user: data.user,
      session: data.session,
      role: roleData?.role || 'sales',
    };
  }
  
  return data;
}

export async function signOut() {
  const { error } = await supabase.auth.signOut();
  if (error) throw error;
}

/** 校验并清除无效会话，防止将 undefined 等 invalid UUID 发给 Supabase */
export async function validateAndClearInvalidSession(): Promise<void> {
  const { data: { session } } = await supabase.auth.getSession();
  if (session?.user) {
    const id = session.user.id;
    if (!id || typeof id !== 'string' || id === 'undefined') {
      await supabase.auth.signOut();
    }
  }
}

export async function getCurrentUser(): Promise<User | null> {
  await validateAndClearInvalidSession();
  const { data: { session } } = await supabase.auth.getSession();

  if (!session?.user) return null;
  const userId = session.user.id;
  if (!userId || typeof userId !== 'string' || userId === 'undefined') {
    return null;
  }

  const { data: roleData } = await supabase
    .from('user_roles')
    .select('role')
    .eq('user_id', userId)
    .single();

  return {
    id: userId,
    email: session.user.email || '',
    role: roleData?.role || 'sales',
  };
}

export async function getAccessToken(): Promise<string | null> {
  const { data: { session } } = await supabase.auth.getSession();
  return session?.access_token || null;
}

// Role-based permissions
export const permissions = {
  owner: ['*'], // Owner has full access - they own the company!
  supervisor: ['view_dashboard', 'view_leads', 'assign_leads', 'view_all_leads', 'manage_team', 'view_assets'],
  ops: ['view_dashboard', 'view_assets', 'upload_assets', 'manage_placeholders', 'approve_assets'],
  sales: ['view_dashboard', 'view_leads', 'update_own_leads', 'add_notes', 'view_assets'],
  admin: ['*'], // Full access
};

export function hasPermission(role: string | undefined, permission: string): boolean {
  if (!role) return false;
  if (role === 'admin' || role === 'owner') return true; // Both admin and owner have full access
  
  const userPermissions = permissions[role as keyof typeof permissions] || [];
  return userPermissions.includes(permission);
}