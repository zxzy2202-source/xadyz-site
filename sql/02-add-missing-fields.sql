-- 添加缺失的字段到 leads 表
-- 执行时间: 2026-02-05

-- 1. 添加 lead_type 字段（线索类型）
ALTER TABLE leads 
ADD COLUMN IF NOT EXISTS lead_type TEXT DEFAULT 'inquiry' 
CHECK (lead_type IN ('tender', 'distributor', 'oem', 'inquiry', 'contact'));

-- 2. 添加 lead_level 字段（线索等级）
ALTER TABLE leads 
ADD COLUMN IF NOT EXISTS lead_level TEXT 
CHECK (lead_level IN ('A', 'B', 'C'));

-- 3. 添加 product_interest 字段（产品兴趣 - 单个文本）
ALTER TABLE leads 
ADD COLUMN IF NOT EXISTS product_interest TEXT;

-- 4. 添加 utm 追踪字段
ALTER TABLE leads 
ADD COLUMN IF NOT EXISTS utm_campaign TEXT,
ADD COLUMN IF NOT EXISTS utm_source TEXT,
ADD COLUMN IF NOT EXISTS utm_medium TEXT,
ADD COLUMN IF NOT EXISTS page_url TEXT;

-- 5. 添加 next_follow_up 字段（下次跟进时间）
ALTER TABLE leads 
ADD COLUMN IF NOT EXISTS next_follow_up TIMESTAMP WITH TIME ZONE;

-- 6. 更新 source 字段的约束（添加新的来源选项）
ALTER TABLE leads 
DROP CONSTRAINT IF EXISTS leads_source_check;

ALTER TABLE leads 
ADD CONSTRAINT leads_source_check 
CHECK (source IN ('website', 'yandex', 'direct', 'referral', 'contact_form', 'tender_form', 'other'));

-- 7. 为新字段创建索引
CREATE INDEX IF NOT EXISTS idx_leads_lead_type ON leads(lead_type);
CREATE INDEX IF NOT EXISTS idx_leads_lead_level ON leads(lead_level);
CREATE INDEX IF NOT EXISTS idx_leads_next_follow_up ON leads(next_follow_up);

-- 8. 更新现有数据（如果有）
-- 将所有现有线索默认设置为 'inquiry' 类型
UPDATE leads 
SET lead_type = 'inquiry' 
WHERE lead_type IS NULL;

COMMENT ON COLUMN leads.lead_type IS '线索类型: tender=招标, distributor=经销商, oem=OEM合作, inquiry=询价, contact=联系咨询';
COMMENT ON COLUMN leads.lead_level IS '线索等级: A=高优先级, B=中优先级, C=低优先级';
COMMENT ON COLUMN leads.product_interest IS '客户感兴趣的产品';
COMMENT ON COLUMN leads.next_follow_up IS '计划的下次跟进时间';
