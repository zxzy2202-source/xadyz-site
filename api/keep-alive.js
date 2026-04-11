/**
 * Vercel Cron Job: keep-alive
 * 每隔 5 天自动向 Supabase 发送一个轻量查询，防止免费计划项目被自动暂停。
 * 触发方式：由 vercel.json 中的 crons 配置自动调用（每 5 天一次）。
 */
export default async function handler(req, res) {
  // 仅允许 Vercel Cron 调用（生产环境会带上 Authorization 头）
  // 本地开发时可直接访问 /api/keep-alive 手动触发
  const projectId = process.env.VITE_SUPABASE_PROJECT_ID;
  const anonKey = process.env.VITE_SUPABASE_ANON_KEY;

  if (!projectId || !anonKey) {
    return res.status(500).json({
      ok: false,
      error: 'Missing Supabase environment variables',
    });
  }

  const supabaseUrl = `https://${projectId}.supabase.co`;
  const startTime = Date.now();

  try {
    // 发送一个最轻量的 REST 请求：查询 assets 表的行数（limit 0，不返回数据）
    const response = await fetch(
      `${supabaseUrl}/rest/v1/assets?select=id&limit=1`,
      {
        method: 'GET',
        headers: {
          apikey: anonKey,
          Authorization: `Bearer ${anonKey}`,
          'Content-Type': 'application/json',
          Prefer: 'count=exact',
        },
      }
    );

    const elapsed = Date.now() - startTime;
    const timestamp = new Date().toISOString();

    if (response.ok) {
      console.log(`[keep-alive] ✅ Supabase ping OK — ${elapsed}ms @ ${timestamp}`);
      return res.status(200).json({
        ok: true,
        message: 'Supabase keep-alive ping successful',
        status: response.status,
        elapsed_ms: elapsed,
        timestamp,
      });
    } else {
      const body = await response.text();
      console.warn(`[keep-alive] ⚠️ Supabase responded ${response.status}: ${body}`);
      return res.status(200).json({
        ok: false,
        message: 'Supabase responded with non-OK status',
        status: response.status,
        body,
        elapsed_ms: elapsed,
        timestamp,
      });
    }
  } catch (err) {
    const elapsed = Date.now() - startTime;
    console.error(`[keep-alive] ❌ Fetch failed: ${err.message}`);
    return res.status(500).json({
      ok: false,
      error: err.message,
      elapsed_ms: elapsed,
      timestamp: new Date().toISOString(),
    });
  }
}
