-- =========================================================================================
-- 志信纸业 B2B 独立站 - 数据库迁移脚本
-- =========================================================================================
-- 版本: 1.0.0
-- 日期: 2026-02-05
-- 说明: Assets + Placeholders + User Roles 完整数据库架构
-- 
-- 功能：
-- ✅ 建表 + 约束 + 索引
-- ✅ 触发器（自动更新 updated_at）
-- ✅ 数据库层规则（只能绑定 approved 素材、status 自动切换）
-- ✅ RLS 策略（基于角色的访问控制）
-- ✅ Storage 策略（文件上传权限）
-- ✅ 视图（素材使用情况）
-- ✅ 批量 upsert 函数
-- 
-- 运行方式：
-- 1. 打开 Supabase Dashboard → SQL Editor
-- 2. 复制整段代码
-- 3. 点击 RUN 一次性执行
-- =========================================================================================

-- =========================
-- 0) Extensions (safe)
-- =========================
create extension if not exists pgcrypto;

-- =========================
-- 1) Enum Types
-- =========================
do $$ begin
  create type public.role_type as enum ('owner','supervisor','ops','sales','admin');
exception when duplicate_object then null; end $$;

do $$ begin
  create type public.asset_type as enum
    ('banner','factory','product','material','qc','packaging','container','document');
exception when duplicate_object then null; end $$;

do $$ begin
  create type public.placeholder_type as enum
    ('hero','product','industry','proof','background');
exception when duplicate_object then null; end $$;

do $$ begin
  create type public.placeholder_status as enum
    ('missing','replaced');
exception when duplicate_object then null; end $$;

-- =========================
-- 2) Helper: updated_at trigger
-- =========================
create or replace function public.set_updated_at()
returns trigger language plpgsql as $$
begin
  new.updated_at = now();
  return new;
end $$;

-- =========================
-- 3) Roles table
-- =========================
create table if not exists public.user_roles (
  user_id uuid primary key references auth.users(id) on delete cascade,
  role public.role_type not null default 'sales',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

drop trigger if exists trg_user_roles_updated_at on public.user_roles;
create trigger trg_user_roles_updated_at
before update on public.user_roles
for each row execute function public.set_updated_at();

-- Helper function: current user's role
create or replace function public.current_role()
returns public.role_type
language sql
stable
security definer
set search_path = public
as $$
  select coalesce(
    (select role from public.user_roles where user_id = auth.uid()),
    'sales'::public.role_type
  );
$$;

-- =========================
-- 4) Assets table
-- =========================
create table if not exists public.assets (
  id uuid primary key default gen_random_uuid(),
  file_url text not null,
  title text not null,
  type public.asset_type not null,
  tags text[] not null default '{}',
  usage_pages text[] not null default '{}',
  approved boolean not null default false,
  notes text null,

  uploaded_by uuid null references auth.users(id) on delete set null,
  uploaded_at timestamptz not null default now(),

  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists idx_assets_type on public.assets(type);
create index if not exists idx_assets_approved on public.assets(approved);
create index if not exists idx_assets_tags_gin on public.assets using gin(tags);
create index if not exists idx_assets_usage_pages_gin on public.assets using gin(usage_pages);
alter table public.assets add column if not exists evidence_tags text[] not null default '{}';
create index if not exists idx_assets_evidence_tags_gin on public.assets using gin(evidence_tags);

drop trigger if exists trg_assets_updated_at on public.assets;
create trigger trg_assets_updated_at
before update on public.assets
for each row execute function public.set_updated_at();

-- =========================
-- 4b) Evidence tags table
-- =========================
create table if not exists public.evidence_tags (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  tag_key text not null unique,
  tag_label text not null,
  description text null
);
create index if not exists idx_evidence_tags_tag_key on public.evidence_tags(tag_key);

-- =========================
-- 5) Placeholders table
-- =========================
create table if not exists public.placeholders (
  id uuid primary key default gen_random_uuid(),

  page_key text not null,
  section_key text not null,

  -- placeholder_key is always page_key.section_key
  placeholder_key text generated always as (page_key || '.' || section_key) stored,

  placeholder_type public.placeholder_type not null,
  required_ratio text not null default '16:9',
  required_size text null,

  status public.placeholder_status not null default 'missing',

  asset_id uuid null references public.assets(id) on delete set null,

  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- Uniqueness guarantee
create unique index if not exists uq_placeholders_key on public.placeholders(placeholder_key);

create index if not exists idx_placeholders_page on public.placeholders(page_key);
create index if not exists idx_placeholders_status on public.placeholders(status);
create index if not exists idx_placeholders_type on public.placeholders(placeholder_type);
create index if not exists idx_placeholders_asset on public.placeholders(asset_id);

drop trigger if exists trg_placeholders_updated_at on public.placeholders;
create trigger trg_placeholders_updated_at
before update on public.placeholders
for each row execute function public.set_updated_at();

-- =========================
-- 6) Guardrails: Only approved assets can be bound
--    and auto-sync status with asset_id
-- =========================
create or replace function public.enforce_placeholder_binding_rules()
returns trigger language plpgsql as $$
declare
  ok boolean;
begin
  -- Auto status based on asset_id
  if new.asset_id is null then
    new.status := 'missing'::public.placeholder_status;
  else
    -- asset must be approved
    select approved into ok from public.assets where id = new.asset_id;

    if ok is distinct from true then
      raise exception using
        errcode = 'P0001',
        message = 'ASSET_NOT_APPROVED';
    end if;

    new.status := 'replaced'::public.placeholder_status;
  end if;

  return new;
end $$;

drop trigger if exists trg_placeholders_bind_rules on public.placeholders;
create trigger trg_placeholders_bind_rules
before insert or update of asset_id, page_key, section_key on public.placeholders
for each row execute function public.enforce_placeholder_binding_rules();

-- =========================
-- 7) Views: usage (asset -> placeholder keys)
-- =========================
create or replace view public.asset_placeholder_usage as
select
  a.id as asset_id,
  a.title,
  a.type,
  a.approved,
  a.file_url,
  coalesce(array_agg(p.placeholder_key order by p.placeholder_key) filter (where p.id is not null), '{}') as placeholder_keys
from public.assets a
left join public.placeholders p on p.asset_id = a.id
group by a.id;

-- =========================
-- 8) Convenience: Bulk upsert placeholders by placeholder_key
--    (safe init without overwriting asset binding)
-- =========================
create or replace function public.bulk_upsert_placeholders(rows jsonb)
returns integer
language plpgsql
security definer
set search_path = public
as $$
declare
  r jsonb;
  c int := 0;
begin
  -- Expect rows: array of objects with keys:
  -- page_key, section_key, placeholder_type, required_ratio, required_size
  for r in select * from jsonb_array_elements(rows)
  loop
    insert into public.placeholders (page_key, section_key, placeholder_type, required_ratio, required_size, status)
    values (
      (r->>'page_key'),
      (r->>'section_key'),
      (r->>'placeholder_type')::public.placeholder_type,
      coalesce(r->>'required_ratio','16:9'),
      nullif(r->>'required_size',''),
      coalesce((r->>'status')::public.placeholder_status, 'missing'::public.placeholder_status)
    )
    on conflict (placeholder_key) do update
      set
        placeholder_type = excluded.placeholder_type,
        required_ratio   = excluded.required_ratio,
        required_size    = excluded.required_size,
        updated_at       = now()
      -- IMPORTANT: do not touch asset_id/status on conflict
      ;
    c := c + 1;
  end loop;

  return c;
end $$;

-- =========================
-- 9) RLS (Row Level Security)
-- =========================
alter table public.user_roles enable row level security;
alter table public.assets enable row level security;
alter table public.placeholders enable row level security;
alter table public.evidence_tags enable row level security;

-- ---- evidence_tags policies ----
drop policy if exists "evidence_tags_select_authenticated" on public.evidence_tags;
create policy "evidence_tags_select_authenticated"
on public.evidence_tags for select to authenticated using (true);

drop policy if exists "evidence_tags_insert_ops_super_admin" on public.evidence_tags;
create policy "evidence_tags_insert_ops_super_admin"
on public.evidence_tags for insert to authenticated
with check (public.current_role() in ('ops','supervisor','admin'));

drop policy if exists "evidence_tags_delete_admin" on public.evidence_tags;
create policy "evidence_tags_delete_admin"
on public.evidence_tags for delete to authenticated
using (public.current_role() = 'admin');

-- ---- user_roles policies ----
-- Only admin can manage roles; users can read their own role
drop policy if exists "user_roles_read_own" on public.user_roles;
create policy "user_roles_read_own"
on public.user_roles for select
to authenticated
using (user_id = auth.uid());

drop policy if exists "user_roles_admin_all" on public.user_roles;
create policy "user_roles_admin_all"
on public.user_roles for all
to authenticated
using (public.current_role() = 'admin')
with check (public.current_role() = 'admin');

-- ---- assets policies ----
-- Read: ops/supervisor/admin/owner can read all; sales cannot by default
drop policy if exists "assets_select_ops_super_admin_owner" on public.assets;
create policy "assets_select_ops_super_admin_owner"
on public.assets for select
to authenticated
using (public.current_role() in ('ops','supervisor','admin','owner'));

-- Insert: ops/supervisor/admin
drop policy if exists "assets_insert_ops_super_admin" on public.assets;
create policy "assets_insert_ops_super_admin"
on public.assets for insert
to authenticated
with check (public.current_role() in ('ops','supervisor','admin'));

-- Update: ops/supervisor/admin
drop policy if exists "assets_update_ops_super_admin" on public.assets;
create policy "assets_update_ops_super_admin"
on public.assets for update
to authenticated
using (public.current_role() in ('ops','supervisor','admin'))
with check (public.current_role() in ('ops','supervisor','admin'));

-- Delete: admin only (recommend soft delete instead)
drop policy if exists "assets_delete_admin_only" on public.assets;
create policy "assets_delete_admin_only"
on public.assets for delete
to authenticated
using (public.current_role() = 'admin');

-- ---- placeholders policies ----
-- Read: ops/supervisor/admin/owner can read
drop policy if exists "placeholders_select_ops_super_admin_owner" on public.placeholders;
create policy "placeholders_select_ops_super_admin_owner"
on public.placeholders for select
to authenticated
using (public.current_role() in ('ops','supervisor','admin','owner'));

-- Insert: ops/admin (initialization / bulk)
drop policy if exists "placeholders_insert_ops_admin" on public.placeholders;
create policy "placeholders_insert_ops_admin"
on public.placeholders for insert
to authenticated
with check (public.current_role() in ('ops','admin'));

-- Update (bind/replace): ops/supervisor/admin
drop policy if exists "placeholders_update_ops_super_admin" on public.placeholders;
create policy "placeholders_update_ops_super_admin"
on public.placeholders for update
to authenticated
using (public.current_role() in ('ops','supervisor','admin'))
with check (public.current_role() in ('ops','supervisor','admin'));

-- Delete: admin only
drop policy if exists "placeholders_delete_admin_only" on public.placeholders;
create policy "placeholders_delete_admin_only"
on public.placeholders for delete
to authenticated
using (public.current_role() = 'admin');

-- =========================
-- 10) Storage policies (OPTIONAL but recommended)
-- NOTE: You still need to create buckets in Supabase UI with these exact names.
-- These policies allow authenticated ops/supervisor/admin to upload;
-- and allow public read if you want public images.
-- =========================

-- Enable RLS on storage.objects (usually already enabled in Supabase projects)
alter table storage.objects enable row level security;

-- Helper to check if object is in one of our buckets
create or replace function public.is_asset_bucket(bucket text)
returns boolean language sql stable as $$
  select bucket in (
    'assets-banners','assets-factory','assets-products','assets-materials','assets-docs'
  );
$$;

-- Public read (optional):
-- If you don't want public read, delete this policy and use signed URLs instead.
drop policy if exists "storage_public_read_assets" on storage.objects;
create policy "storage_public_read_assets"
on storage.objects for select
to public
using (public.is_asset_bucket(bucket_id));

-- Upload: owner/ops/supervisor/admin
drop policy if exists "storage_upload_assets_ops_super_admin" on storage.objects;
create policy "storage_upload_assets_ops_super_admin"
on storage.objects for insert
to authenticated
with check (
  public.is_asset_bucket(bucket_id)
  and public.current_role() in ('owner','ops','supervisor','admin')
);

-- Update object metadata: owner/ops/supervisor/admin
drop policy if exists "storage_update_assets_ops_super_admin" on storage.objects;
create policy "storage_update_assets_ops_super_admin"
on storage.objects for update
to authenticated
using (
  public.is_asset_bucket(bucket_id)
  and public.current_role() in ('owner','ops','supervisor','admin')
)
with check (
  public.is_asset_bucket(bucket_id)
  and public.current_role() in ('owner','ops','supervisor','admin')
);

-- Delete: owner/admin
drop policy if exists "storage_delete_assets_admin_only" on storage.objects;
create policy "storage_delete_assets_admin_only"
on storage.objects for delete
to authenticated
using (
  public.is_asset_bucket(bucket_id)
  and public.current_role() in ('owner','admin')
);

-- =========================================================================================
-- 执行完成！
-- =========================================================================================
-- 接下来请按照 DATABASE_SETUP_GUIDE.md 完成后续配置步骤
-- =========================================================================================
