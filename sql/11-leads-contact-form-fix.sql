-- ========================================
-- 联系表单提交修复：补充 leads 表缺失列 + source 约束
-- 解决 "Could not find the 'page_url' column" 及 400 错误
-- ========================================

-- 1. 补充缺失列
ALTER TABLE public.leads
  ADD COLUMN IF NOT EXISTS page_url TEXT,
  ADD COLUMN IF NOT EXISTS lead_type TEXT DEFAULT 'inquiry',
  ADD COLUMN IF NOT EXISTS product_interest TEXT;

-- 2. 放宽 source 约束（原表只允许 website/yandex/direct/referral/other，表单传 contact_form）
ALTER TABLE public.leads
  DROP CONSTRAINT IF EXISTS leads_source_check;

ALTER TABLE public.leads
  ADD CONSTRAINT leads_source_check
  CHECK (source IN ('website', 'yandex', 'direct', 'referral', 'contact_form', 'tender_form', 'other'));

-- 3. lead_type 约束（若缺失则添加）
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_constraint WHERE conname = 'leads_lead_type_check'
  ) THEN
    ALTER TABLE public.leads
      ADD CONSTRAINT leads_lead_type_check
      CHECK (lead_type IS NULL OR lead_type IN ('tender', 'distributor', 'oem', 'inquiry', 'contact'));
  END IF;
END $$;
