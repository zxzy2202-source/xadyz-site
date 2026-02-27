/**
 * 前台只读 Supabase 客户端（转发层）
 *
 * 真正的客户端实例在 `src/lib/supabase/client.ts`，此处只做转发，
 * 确保前台组件的 import 路径无需更改。
 */
export { supabasePublic } from '@/lib/supabase/client';
