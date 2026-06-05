-- ========================================
-- 修复 blog_posts RLS 在 auth.uid() 无效时抛出 UUID 解析错误
-- 当 JWT 中 sub 为 "undefined" 等无效值时，使用安全包装避免抛错
-- ========================================

CREATE OR REPLACE FUNCTION public.get_safe_staff_role()
RETURNS TEXT AS $$
DECLARE
  uid UUID;
BEGIN
  uid := auth.uid();
  IF uid IS NULL THEN
    RETURN NULL;
  END IF;
  RETURN (SELECT role FROM user_roles WHERE user_id = uid LIMIT 1);
EXCEPTION
  WHEN OTHERS THEN
    RETURN NULL;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER STABLE;

-- 重建 INSERT/UPDATE/DELETE 策略，改用安全函数
DROP POLICY IF EXISTS "Staff can insert blog posts" ON blog_posts;
CREATE POLICY "Staff can insert blog posts"
  ON blog_posts FOR INSERT
  TO authenticated
  WITH CHECK (
    (public.get_safe_staff_role()) IN ('ops', 'supervisor', 'admin', 'owner')
  );

DROP POLICY IF EXISTS "Staff can update blog posts" ON blog_posts;
CREATE POLICY "Staff can update blog posts"
  ON blog_posts FOR UPDATE
  TO authenticated
  USING (
    (public.get_safe_staff_role()) IN ('ops', 'supervisor', 'admin', 'owner')
  );

DROP POLICY IF EXISTS "Staff can delete blog posts" ON blog_posts;
CREATE POLICY "Staff can delete blog posts"
  ON blog_posts FOR DELETE
  TO authenticated
  USING (
    (public.get_safe_staff_role()) IN ('admin', 'owner')
  );

SELECT 'blog_posts RLS safe-uid fix applied ✅' AS status;
