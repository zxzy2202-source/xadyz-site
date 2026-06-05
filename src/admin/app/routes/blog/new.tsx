/**
 * 新建文章页（/admin/blog/new）
 * 复用 BlogEditPage 表单逻辑，id 为 undefined 时自动为新建模式
 */
import { BlogEditPage } from './edit';

export function BlogNewPage() {
  return <BlogEditPage />;
}
