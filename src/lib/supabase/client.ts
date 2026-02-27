/**
 * 唯一的 Supabase 客户端实例
 *
 * 整个项目（公开前台 + 后台 admin）共用此一个实例。
 * 其他模块请从此文件导入 `supabase`，不要自行 createClient。
 *
 * 公开前台只读场景：直接使用 `supabase`（anon key + RLS 保护）
 * 后台写入场景：同一实例，由 RLS 策略 + 用户登录态控制权限
 */
import { createClient } from '@supabase/supabase-js';
import { projectId, publicAnonKey } from '/utils/supabase/info';

const supabaseUrl = `https://${projectId}.supabase.co`;

export const supabase = createClient(supabaseUrl, publicAnonKey);

// 验证 auth 会话，避免无效 JWT（user.id 为 undefined）污染后端
supabase.auth.onAuthStateChange((_event, session) => {
  if (session?.user) {
    const id = session.user.id;
    if (!id || typeof id !== 'string' || id === 'undefined') {
      supabase.auth.signOut();
    }
  }
});

/**
 * 前台只读别名（语义更清晰，行为与 supabase 完全一致）。
 * 如果将来需要区分前台/后台权限，可在此换成单独的 anon-only 客户端。
 */
export const supabasePublic = supabase;
