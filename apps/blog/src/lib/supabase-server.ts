import "server-only";
import { createClient } from "@supabase/supabase-js";

const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
const anon = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
// 可选：如果你以后要后台写入，再配 service role
const service = process.env.SUPABASE_SERVICE_ROLE_KEY;

const key = service || anon;

if (!url) throw new Error("Missing env: NEXT_PUBLIC_SUPABASE_URL");
if (!key) throw new Error("Missing env: NEXT_PUBLIC_SUPABASE_ANON_KEY or SUPABASE_SERVICE_ROLE_KEY");

export const supabaseServer = createClient(url, key, {
  auth: { persistSession: false },
});
