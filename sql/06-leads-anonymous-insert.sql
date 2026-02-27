-- 允许匿名用户（前台表单）向 leads 表插入数据
-- 用于：投标资料包表单、联系页表单等
-- 执行时间: 2026-02-06

CREATE POLICY "Anonymous can insert leads"
  ON leads FOR INSERT
  TO anon
  WITH CHECK (
    company_name IS NOT NULL
    AND company_name != ''
    AND email IS NOT NULL
    AND email != ''
  );

COMMENT ON POLICY "Anonymous can insert leads" ON leads IS 
  '前台表单（投标、联系页）匿名提交线索，仅允许 INSERT，不允许 SELECT/UPDATE/DELETE';
