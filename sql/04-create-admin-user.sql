-- ========================================
-- 志信纸业 B2B Admin - 创建管理员账号
-- ========================================

-- 注意：这个脚本需要使用 Supabase Dashboard 的 Authentication 功能
-- 因为直接通过SQL创建用户需要特殊权限

-- 方式1：通过SQL创建（如果有service_role权限）
-- 如果执行失败，请使用方式2（UI界面）

DO $$
DECLARE
  new_user_id UUID;
BEGIN
  -- 尝试创建用户（需要service_role权限）
  -- 如果失败，请使用下面的UI方式创建
  
  INSERT INTO auth.users (
    instance_id,
    id,
    aud,
    role,
    email,
    encrypted_password,
    email_confirmed_at,
    invited_at,
    confirmation_token,
    confirmation_sent_at,
    recovery_token,
    recovery_sent_at,
    email_change_token_new,
    email_change,
    email_change_sent_at,
    last_sign_in_at,
    raw_app_meta_data,
    raw_user_meta_data,
    is_super_admin,
    created_at,
    updated_at,
    phone,
    phone_confirmed_at,
    phone_change,
    phone_change_token,
    phone_change_sent_at,
    email_change_token_current,
    email_change_confirm_status,
    banned_until,
    reauthentication_token,
    reauthentication_sent_at
  ) VALUES (
    '00000000-0000-0000-0000-000000000000',
    gen_random_uuid(),
    'authenticated',
    'authenticated',
    'admin@zhixin.com',
    crypt('zhixin2025', gen_salt('bf')), -- 密码: zhixin2025
    NOW(),
    NULL,
    '',
    NULL,
    '',
    NULL,
    '',
    '',
    NULL,
    NULL,
    '{"provider":"email","providers":["email"]}',
    '{"name":"Admin User"}',
    NULL,
    NOW(),
    NOW(),
    NULL,
    NULL,
    '',
    '',
    NULL,
    '',
    0,
    NULL,
    '',
    NULL
  )
  RETURNING id INTO new_user_id;

  -- 为新用户分配owner角色
  INSERT INTO user_roles (user_id, role)
  VALUES (new_user_id, 'owner');

  RAISE NOTICE 'Admin user created successfully with ID: %', new_user_id;
  
EXCEPTION
  WHEN OTHERS THEN
    RAISE NOTICE 'SQL creation failed. Please use UI method below.';
    RAISE NOTICE 'Error: %', SQLERRM;
END $$;

-- 显示提示信息
SELECT '如果上面的SQL执行失败，请使用UI方式创建管理员账号（见操作步骤）' AS notice;
