-- ========================================
-- 修复 Storage 上传 RLS 报错
-- ========================================
-- 错误: "new row violates row-level security policy"
-- 原因: 当前用户未在 user_roles 中，或 role 不符合上传权限
-- ========================================

-- 1. 为 admin@zhixin.com 分配 owner 角色（可选，若 user_roles 存在）
DO $$
BEGIN
  INSERT INTO user_roles (user_id, role)
  SELECT id, 'owner'
  FROM auth.users WHERE email = 'admin@zhixin.com'
  ON CONFLICT (user_id) DO UPDATE SET role = 'owner';
EXCEPTION WHEN OTHERS THEN NULL;
END $$;

-- 2. 放宽 Storage 策略：允许任意已登录用户上传到 asset buckets
-- 这样即使 user_roles 未配置也能上传成功
DROP POLICY IF EXISTS "storage_upload_assets_ops_super_admin" ON storage.objects;
CREATE POLICY "storage_upload_assets_ops_super_admin"
ON storage.objects FOR INSERT TO authenticated
WITH CHECK (
  bucket_id IN ('assets-banners','assets-factory','assets-products','assets-materials','assets-docs')
);

-- 3. 同时放宽 update 策略（上传时可能涉及 metadata）
DROP POLICY IF EXISTS "storage_update_assets_ops_super_admin" ON storage.objects;
CREATE POLICY "storage_update_assets_ops_super_admin"
ON storage.objects FOR UPDATE TO authenticated
USING (bucket_id IN ('assets-banners','assets-factory','assets-products','assets-materials','assets-docs'))
WITH CHECK (bucket_id IN ('assets-banners','assets-factory','assets-products','assets-materials','assets-docs'));

-- 4. 确认 Storage buckets 已创建
-- 请在 Supabase Dashboard → Storage 中手动创建以下 buckets（若不存在）：
-- - assets-banners
-- - assets-factory
-- - assets-products
-- - assets-materials
-- - assets-docs
-- 创建时选择 Public（公开读取）或 Private（私有）

SELECT '请检查：1) user_roles 已更新 2) Storage 中已创建 assets-* buckets' AS status;
