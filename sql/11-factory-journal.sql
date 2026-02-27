-- ========================================
-- Factory Journal（独立表方案，可选）
-- 表结构：entries + media + tags + 关联表
-- 与 blog_posts 独立，RLS 复用 get_safe_staff_role()
--
-- ⚠️ 注意：当前实现使用 blog_posts + content_type（见 sql/12）
-- 本脚本为独立表方案，仅当需要 media/tags 多对多时使用
-- ========================================

-- 0) Extensions
create extension if not exists pgcrypto;

-- 1) Enums
do $$ begin
  create type public.factory_entry_type as enum ('weekly_update', 'client_solution', 'behind_scenes');
exception when duplicate_object then null;
end $$;

do $$ begin
  create type public.factory_content_status as enum ('draft', 'published', 'archived');
exception when duplicate_object then null;
end $$;

-- 2) Main table
create table if not exists public.factory_journal_entries (
  id uuid primary key default gen_random_uuid(),

  -- i18n
  locale text not null default 'en' check (locale in ('en', 'ru', 'zh')),

  -- core
  entry_type public.factory_entry_type not null,
  status public.factory_content_status not null default 'draft',

  slug text not null,
  title text not null,
  summary text null,

  -- main content (markdown)
  body_md text null,

  -- weekly helper
  week_of date null,

  -- optional structured fields
  client_region text null,       -- 'CIS' 'EU' 'ME' 'SEA' 'Global'
  product_category text null,    -- 'POS Rolls' 'Thermal Labels' 'Jumbo Rolls' etc.

  -- case structure (client_solution only)
  problem text null,
  root_cause text null,
  solution text null,
  result text null,

  -- cover
  cover_image_url text null,
  cover_alt text null,

  -- publishing
  published_at timestamptz null,

  -- metadata
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),

  constraint factory_journal_entries_slug_locale_unique unique (slug, locale)
);

-- updated_at trigger
create or replace function public.set_updated_at()
returns trigger language plpgsql as $$
begin
  new.updated_at = now();
  return new;
end $$;

drop trigger if exists trg_factory_journal_set_updated_at on public.factory_journal_entries;
create trigger trg_factory_journal_set_updated_at
before update on public.factory_journal_entries
for each row execute function public.set_updated_at();

-- Indexes
create index if not exists idx_factory_journal_entries_status_pubtime
  on public.factory_journal_entries (status, published_at desc);

create index if not exists idx_factory_journal_entries_type_week
  on public.factory_journal_entries (entry_type, week_of desc nulls last);

create index if not exists idx_factory_journal_entries_locale
  on public.factory_journal_entries (locale);

create index if not exists idx_factory_journal_entries_slug_locale
  on public.factory_journal_entries (slug, locale);

-- 3) Media table
create table if not exists public.factory_journal_media (
  id uuid primary key default gen_random_uuid(),
  entry_id uuid not null references public.factory_journal_entries(id) on delete cascade,

  media_type text not null default 'image' check (media_type in ('image', 'video')),
  url text not null,
  alt text null,
  caption text null,
  sort_order int not null default 0,

  created_at timestamptz not null default now()
);

create index if not exists idx_factory_journal_media_entry_sort
  on public.factory_journal_media (entry_id, sort_order);

-- 4) Tags
create table if not exists public.factory_tags (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  slug text not null unique,
  created_at timestamptz not null default now()
);

create table if not exists public.factory_entry_tags (
  entry_id uuid not null references public.factory_journal_entries(id) on delete cascade,
  tag_id uuid not null references public.factory_tags(id) on delete cascade,
  primary key (entry_id, tag_id)
);

create index if not exists idx_factory_entry_tags_tag
  on public.factory_entry_tags (tag_id);

-- 5) Public read view for published
create or replace view public.factory_journal_published as
select *
from public.factory_journal_entries
where status = 'published'
  and published_at is not null
  and published_at <= now();

-- 6) RLS
alter table public.factory_journal_entries enable row level security;
alter table public.factory_journal_media enable row level security;
alter table public.factory_tags enable row level security;
alter table public.factory_entry_tags enable row level security;

-- Public read published entries (anon)
drop policy if exists "Public read factory journal published" on public.factory_journal_entries;
create policy "Public read factory journal published"
  on public.factory_journal_entries for select
  to anon
  using (
    status = 'published'
    and published_at is not null
    and published_at <= now()
  );

-- Authenticated read all (admin)
drop policy if exists "Staff read all factory journal entries" on public.factory_journal_entries;
create policy "Staff read all factory journal entries"
  on public.factory_journal_entries for select
  to authenticated
  using (true);

-- Staff insert/update/delete (ops+)
drop policy if exists "Staff insert factory journal" on public.factory_journal_entries;
create policy "Staff insert factory journal"
  on public.factory_journal_entries for insert
  to authenticated
  with check (
    (public.get_safe_staff_role()) in ('ops', 'supervisor', 'admin', 'owner')
  );

drop policy if exists "Staff update factory journal" on public.factory_journal_entries;
create policy "Staff update factory journal"
  on public.factory_journal_entries for update
  to authenticated
  using (
    (public.get_safe_staff_role()) in ('ops', 'supervisor', 'admin', 'owner')
  );

drop policy if exists "Staff delete factory journal" on public.factory_journal_entries;
create policy "Staff delete factory journal"
  on public.factory_journal_entries for delete
  to authenticated
  using (
    (public.get_safe_staff_role()) in ('admin', 'owner')
  );

-- Media: public read only via entry (anon sees published entries' media through join)
-- Staff can manage media for any entry
drop policy if exists "Staff manage factory journal media" on public.factory_journal_media;
create policy "Staff manage factory journal media"
  on public.factory_journal_media for all
  to authenticated
  using (
    (public.get_safe_staff_role()) in ('ops', 'supervisor', 'admin', 'owner')
  );

-- Media: anon can read media for published entries
drop policy if exists "Public read factory journal media for published" on public.factory_journal_media;
create policy "Public read factory journal media for published"
  on public.factory_journal_media for select
  to anon
  using (
    exists (
      select 1 from public.factory_journal_entries e
      where e.id = entry_id
        and e.status = 'published'
        and e.published_at is not null
        and e.published_at <= now()
    )
  );

-- Tags: public read
drop policy if exists "Public read factory tags" on public.factory_tags;
create policy "Public read factory tags"
  on public.factory_tags for select to anon using (true);

drop policy if exists "Staff manage factory tags" on public.factory_tags;
create policy "Staff manage factory tags"
  on public.factory_tags for all to authenticated
  using ((public.get_safe_staff_role()) in ('ops', 'supervisor', 'admin', 'owner'));

-- Entry tags: public read
drop policy if exists "Public read factory entry tags" on public.factory_entry_tags;
create policy "Public read factory entry tags"
  on public.factory_entry_tags for select to anon using (true);

drop policy if exists "Staff manage factory entry tags" on public.factory_entry_tags;
create policy "Staff manage factory entry tags"
  on public.factory_entry_tags for all to authenticated
  using ((public.get_safe_staff_role()) in ('ops', 'supervisor', 'admin', 'owner'));

-- 7) Seed default tags (optional)
insert into public.factory_tags (name, slug) values
  ('POS Rolls', 'pos-rolls'),
  ('4x6 Labels', '4x6-labels'),
  ('Jumbo Rolls', 'jumbo-rolls'),
  ('OEM', 'oem'),
  ('Quality Control', 'quality-control'),
  ('Container Loading', 'container-loading')
on conflict (slug) do nothing;

select 'factory_journal tables and RLS created ✅' as status;
