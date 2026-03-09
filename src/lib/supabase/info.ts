/**
 * Supabase 项目配置
 *
 * 出于安全原因，这里不直接硬编码真实的 projectId / anon key。
 * - 本地开发：请在 .env.local 中设置 VITE_SUPABASE_PROJECT_ID / VITE_SUPABASE_ANON_KEY
 * - 生产（Vercel）：在项目环境变量中设置同名变量
 *
 * 对于纯前台访问场景，如果未配置 Supabase，admin 功能会不可用，但不影响公开站点渲染。
 */

type MaybeEnv = {
  VITE_SUPABASE_PROJECT_ID?: string;
  VITE_SUPABASE_ANON_KEY?: string;
} | undefined;

const viteEnv: MaybeEnv =
  typeof import.meta !== "undefined" && (import.meta as any).env
    ? (import.meta as any).env
    : undefined;

const projectIdFromEnv =
  viteEnv?.VITE_SUPABASE_PROJECT_ID ?? process.env.VITE_SUPABASE_PROJECT_ID;
const anonKeyFromEnv =
  viteEnv?.VITE_SUPABASE_ANON_KEY ?? process.env.VITE_SUPABASE_ANON_KEY;

// 为了避免阻塞前台渲染，如果没有配置，就使用占位符。
// Admin 功能在未配置真实 key 时将无法正常工作，需要在部署环境中补齐变量。
export const projectId = projectIdFromEnv || "your-supabase-project-id";
export const publicAnonKey = anonKeyFromEnv || "your-public-anon-key";

