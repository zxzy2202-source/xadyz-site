-- ========================================
-- 志信纸业 B2B Admin - RLS安全策略
-- ========================================

-- 启用所有表的RLS
ALTER TABLE user_roles ENABLE ROW LEVEL SECURITY;
ALTER TABLE leads ENABLE ROW LEVEL SECURITY;
ALTER TABLE lead_activities ENABLE ROW LEVEL SECURITY;
ALTER TABLE lead_files ENABLE ROW LEVEL SECURITY;
ALTER TABLE assets ENABLE ROW LEVEL SECURITY;
ALTER TABLE placeholder_bindings ENABLE ROW LEVEL SECURITY;

-- ========================================
-- 辅助函数：获取当前用户角色
-- ========================================
CREATE OR REPLACE FUNCTION get_user_role(user_uuid UUID)
RETURNS TEXT AS $$
  SELECT role FROM user_roles WHERE user_id = user_uuid;
$$ LANGUAGE SQL SECURITY DEFINER;

-- ========================================
-- user_roles 表策略
-- ========================================
-- 所有认证用户可以查看自己的角色
CREATE POLICY "Users can view own role"
  ON user_roles FOR SELECT
  TO authenticated
  USING (user_id = auth.uid());

-- owner/admin可以查看所有角色
CREATE POLICY "Owner/Admin can view all roles"
  ON user_roles FOR SELECT
  TO authenticated
  USING (get_user_role(auth.uid()) IN ('owner', 'admin'));

-- owner/admin可以插入角色
CREATE POLICY "Owner/Admin can insert roles"
  ON user_roles FOR INSERT
  TO authenticated
  WITH CHECK (get_user_role(auth.uid()) IN ('owner', 'admin'));

-- owner/admin可以更新角色
CREATE POLICY "Owner/Admin can update roles"
  ON user_roles FOR UPDATE
  TO authenticated
  USING (get_user_role(auth.uid()) IN ('owner', 'admin'));

-- 只有owner可以删除角色
CREATE POLICY "Only owner can delete roles"
  ON user_roles FOR DELETE
  TO authenticated
  USING (get_user_role(auth.uid()) = 'owner');

-- ========================================
-- leads 表策略
-- ========================================
-- sales只能查看分配给自己的线索
CREATE POLICY "Sales can view assigned leads"
  ON leads FOR SELECT
  TO authenticated
  USING (
    get_user_role(auth.uid()) = 'sales' AND assigned_to = auth.uid()
  );

-- ops/supervisor/admin/owner可以查看所有线索
CREATE POLICY "Staff can view all leads"
  ON leads FOR SELECT
  TO authenticated
  USING (
    get_user_role(auth.uid()) IN ('ops', 'supervisor', 'admin', 'owner')
  );

-- ops以上角色可以创建线索
CREATE POLICY "Staff can insert leads"
  ON leads FOR INSERT
  TO authenticated
  WITH CHECK (
    get_user_role(auth.uid()) IN ('ops', 'supervisor', 'admin', 'owner')
  );

-- sales可以更新自己负责的线索
CREATE POLICY "Sales can update assigned leads"
  ON leads FOR UPDATE
  TO authenticated
  USING (
    get_user_role(auth.uid()) = 'sales' AND assigned_to = auth.uid()
  );

-- ops以上角色可以更新所有线索
CREATE POLICY "Staff can update all leads"
  ON leads FOR UPDATE
  TO authenticated
  USING (
    get_user_role(auth.uid()) IN ('ops', 'supervisor', 'admin', 'owner')
  );

-- 只有admin/owner可以删除线索
CREATE POLICY "Admin/Owner can delete leads"
  ON leads FOR DELETE
  TO authenticated
  USING (
    get_user_role(auth.uid()) IN ('admin', 'owner')
  );

-- ========================================
-- lead_activities 表策略
-- ========================================
-- 用户可以查看自己创建的活动记录
CREATE POLICY "Users can view own activities"
  ON lead_activities FOR SELECT
  TO authenticated
  USING (user_id = auth.uid());

-- supervisor以上角色可以查看所有活动记录
CREATE POLICY "Staff can view all activities"
  ON lead_activities FOR SELECT
  TO authenticated
  USING (
    get_user_role(auth.uid()) IN ('supervisor', 'admin', 'owner')
  );

-- 所有认证用户可以创建活动记录
CREATE POLICY "Authenticated users can insert activities"
  ON lead_activities FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() IS NOT NULL);

-- ========================================
-- lead_files 表策略
-- ========================================
-- 用户可以查看与自己相关的线索文件
CREATE POLICY "Users can view related lead files"
  ON lead_files FOR SELECT
  TO authenticated
  USING (
    lead_id IN (
      SELECT id FROM leads WHERE assigned_to = auth.uid()
    ) OR
    get_user_role(auth.uid()) IN ('ops', 'supervisor', 'admin', 'owner')
  );

-- 所有认证用户可以上传文件
CREATE POLICY "Authenticated users can insert files"
  ON lead_files FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() IS NOT NULL);

-- 只有admin/owner可以删除文件
CREATE POLICY "Admin/Owner can delete files"
  ON lead_files FOR DELETE
  TO authenticated
  USING (
    get_user_role(auth.uid()) IN ('admin', 'owner')
  );

-- ========================================
-- assets 表策略
-- ========================================
-- 所有认证用户可以查看已批准的素材
CREATE POLICY "Users can view approved assets"
  ON assets FOR SELECT
  TO authenticated
  USING (status = 'approved' OR get_user_role(auth.uid()) IN ('supervisor', 'admin', 'owner'));

-- supervisor以上角色可以查看所有素材
CREATE POLICY "Staff can view all assets"
  ON assets FOR SELECT
  TO authenticated
  USING (
    get_user_role(auth.uid()) IN ('supervisor', 'admin', 'owner')
  );

-- ops以上角色可以上传素材
CREATE POLICY "Staff can insert assets"
  ON assets FOR INSERT
  TO authenticated
  WITH CHECK (
    get_user_role(auth.uid()) IN ('ops', 'supervisor', 'admin', 'owner')
  );

-- supervisor以上角色可以更新素材（审批）
CREATE POLICY "Staff can update assets"
  ON assets FOR UPDATE
  TO authenticated
  USING (
    get_user_role(auth.uid()) IN ('supervisor', 'admin', 'owner')
  );

-- 只有admin/owner可以删除素材
CREATE POLICY "Admin/Owner can delete assets"
  ON assets FOR DELETE
  TO authenticated
  USING (
    get_user_role(auth.uid()) IN ('admin', 'owner')
  );

-- ========================================
-- placeholder_bindings 表策略
-- ========================================
-- 所有认证用户可以查看占位符绑定
CREATE POLICY "Users can view placeholder bindings"
  ON placeholder_bindings FOR SELECT
  TO authenticated
  USING (true);

-- ops以上角色可以创建绑定
CREATE POLICY "Staff can insert bindings"
  ON placeholder_bindings FOR INSERT
  TO authenticated
  WITH CHECK (
    get_user_role(auth.uid()) IN ('ops', 'supervisor', 'admin', 'owner')
  );

-- ops以上角色可以更新绑定
CREATE POLICY "Staff can update bindings"
  ON placeholder_bindings FOR UPDATE
  TO authenticated
  USING (
    get_user_role(auth.uid()) IN ('ops', 'supervisor', 'admin', 'owner')
  );

-- 只有admin/owner可以删除绑定
CREATE POLICY "Admin/Owner can delete bindings"
  ON placeholder_bindings FOR DELETE
  TO authenticated
  USING (
    get_user_role(auth.uid()) IN ('admin', 'owner')
  );

-- 显示创建成功消息
SELECT 'RLS policies created successfully! ✅' AS status;
