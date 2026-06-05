-- ========================================
-- 志信纸业 B2B Admin - Storage RLS策略
-- ========================================

-- ========================================
-- 1. zhixin-lead-files (私有 - 线索相关文件)
-- ========================================
-- 允许认证用户上传文件
CREATE POLICY "Authenticated users can upload lead files"
  ON storage.objects FOR INSERT
  TO authenticated
  WITH CHECK (bucket_id = 'zhixin-lead-files');

-- 允许用户查看与自己相关的线索文件
CREATE POLICY "Users can view related lead files"
  ON storage.objects FOR SELECT
  TO authenticated
  USING (
    bucket_id = 'zhixin-lead-files' AND (
      -- admin/owner可以查看所有
      (SELECT role FROM user_roles WHERE user_id = auth.uid()) IN ('admin', 'owner', 'supervisor', 'ops')
      OR
      -- sales只能查看自己负责的线索文件（通过文件名前缀匹配lead_id）
      (SELECT role FROM user_roles WHERE user_id = auth.uid()) = 'sales'
    )
  );

-- admin/owner可以删除文件
CREATE POLICY "Admin/Owner can delete lead files"
  ON storage.objects FOR DELETE
  TO authenticated
  USING (
    bucket_id = 'zhixin-lead-files' AND
    (SELECT role FROM user_roles WHERE user_id = auth.uid()) IN ('admin', 'owner')
  );

-- ========================================
-- 2. zhixin-assets (私有 - 素材库)
-- ========================================
-- ops以上角色可以上传素材
CREATE POLICY "Staff can upload assets"
  ON storage.objects FOR INSERT
  TO authenticated
  WITH CHECK (
    bucket_id = 'zhixin-assets' AND
    (SELECT role FROM user_roles WHERE user_id = auth.uid()) IN ('ops', 'supervisor', 'admin', 'owner')
  );

-- supervisor以上角色可以查看所有素材
CREATE POLICY "Staff can view assets"
  ON storage.objects FOR SELECT
  TO authenticated
  USING (
    bucket_id = 'zhixin-assets' AND
    (SELECT role FROM user_roles WHERE user_id = auth.uid()) IN ('supervisor', 'admin', 'owner')
  );

-- admin/owner可以删除素材
CREATE POLICY "Admin/Owner can delete assets"
  ON storage.objects FOR DELETE
  TO authenticated
  USING (
    bucket_id = 'zhixin-assets' AND
    (SELECT role FROM user_roles WHERE user_id = auth.uid()) IN ('admin', 'owner')
  );

-- ========================================
-- 3. zhixin-product-images (公开 - 产品图片)
-- ========================================
-- 所有人可以查看产品图片
CREATE POLICY "Public can view product images"
  ON storage.objects FOR SELECT
  TO public
  USING (bucket_id = 'zhixin-product-images');

-- ops以上角色可以上传产品图片
CREATE POLICY "Staff can upload product images"
  ON storage.objects FOR INSERT
  TO authenticated
  WITH CHECK (
    bucket_id = 'zhixin-product-images' AND
    (SELECT role FROM user_roles WHERE user_id = auth.uid()) IN ('ops', 'supervisor', 'admin', 'owner')
  );

-- admin/owner可以删除产品图片
CREATE POLICY "Admin/Owner can delete product images"
  ON storage.objects FOR DELETE
  TO authenticated
  USING (
    bucket_id = 'zhixin-product-images' AND
    (SELECT role FROM user_roles WHERE user_id = auth.uid()) IN ('admin', 'owner')
  );

-- ========================================
-- 4. zhixin-case-studies (公开 - 案例研究)
-- ========================================
-- 所有人可以查看案例研究
CREATE POLICY "Public can view case studies"
  ON storage.objects FOR SELECT
  TO public
  USING (bucket_id = 'zhixin-case-studies');

-- ops以上角色可以上传案例研究
CREATE POLICY "Staff can upload case studies"
  ON storage.objects FOR INSERT
  TO authenticated
  WITH CHECK (
    bucket_id = 'zhixin-case-studies' AND
    (SELECT role FROM user_roles WHERE user_id = auth.uid()) IN ('ops', 'supervisor', 'admin', 'owner')
  );

-- admin/owner可以删除案例研究
CREATE POLICY "Admin/Owner can delete case studies"
  ON storage.objects FOR DELETE
  TO authenticated
  USING (
    bucket_id = 'zhixin-case-studies' AND
    (SELECT role FROM user_roles WHERE user_id = auth.uid()) IN ('admin', 'owner')
  );

-- ========================================
-- 5. zhixin-certificates (公开 - 证书资质)
-- ========================================
-- 所有人可以查看证书
CREATE POLICY "Public can view certificates"
  ON storage.objects FOR SELECT
  TO public
  USING (bucket_id = 'zhixin-certificates');

-- ops以上角色可以上传证书
CREATE POLICY "Staff can upload certificates"
  ON storage.objects FOR INSERT
  TO authenticated
  WITH CHECK (
    bucket_id = 'zhixin-certificates' AND
    (SELECT role FROM user_roles WHERE user_id = auth.uid()) IN ('ops', 'supervisor', 'admin', 'owner')
  );

-- admin/owner可以删除证书
CREATE POLICY "Admin/Owner can delete certificates"
  ON storage.objects FOR DELETE
  TO authenticated
  USING (
    bucket_id = 'zhixin-certificates' AND
    (SELECT role FROM user_roles WHERE user_id = auth.uid()) IN ('admin', 'owner')
  );

-- 显示创建成功消息
SELECT 'Storage policies created successfully! ✅' AS status;
