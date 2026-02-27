-- ========================================
-- blog_posts 扩展：支持 Factory Journal
-- 同一表、同一编辑器，通过 content_type 区分
-- 执行顺序：需在 07-blog-posts 之后
-- ========================================

-- 1) 内容类型区分
alter table public.blog_posts
add column if not exists content_type text default 'blog';

-- 2) Factory Journal 类型
alter table public.blog_posts
add column if not exists journal_type text;

-- 3) 每周字段
alter table public.blog_posts
add column if not exists week_of date;

-- 4) 客户问题结构字段
alter table public.blog_posts
add column if not exists problem text,
add column if not exists root_cause text,
add column if not exists solution text,
add column if not exists result text;

-- 5) 可选增强字段
alter table public.blog_posts
add column if not exists client_region text,
add column if not exists product_category text;

-- 6) 唯一约束：Factory Journal 每周每种类型仅一条（可选）
-- create unique index if not exists idx_blog_posts_factory_journal_unique_week_type
-- on public.blog_posts (week_of, journal_type, language)
-- where content_type = 'factory_journal';

create index if not exists idx_blog_posts_content_type on public.blog_posts(content_type);
create index if not exists idx_blog_posts_week_of on public.blog_posts(week_of desc nulls last);

comment on column public.blog_posts.content_type is 'blog | factory_journal';
comment on column public.blog_posts.journal_type is 'weekly_update | client_solution | behind_scenes (when content_type=factory_journal)';
comment on column public.blog_posts.week_of is 'Week start (Monday) for Factory Journal';
comment on column public.blog_posts.problem is 'Client problem (client_solution)';
comment on column public.blog_posts.root_cause is 'Root cause (client_solution)';
comment on column public.blog_posts.solution is 'Our solution (client_solution)';
comment on column public.blog_posts.result is 'Final result (client_solution)';

select 'blog_posts factory journal columns added ✅' as status;
