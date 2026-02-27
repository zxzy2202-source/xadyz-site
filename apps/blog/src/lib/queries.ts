import "server-only";
import { supabaseServer } from "./supabase-server";
import type { Locale, Post } from "./types";

export async function listPublishedPosts(locale: Locale = "en"): Promise<Post[]> {
  const nowIso = new Date().toISOString();

  const { data, error } = await supabaseServer
    .from("blog_posts")
    .select("*")
    .eq("is_draft", false)
    .not("published_at", "is", null)
    .lte("published_at", nowIso)
    .eq("language", locale)
    .order("published_at", { ascending: false });

  if (error) {
    console.error("listPublishedPosts error:", error.message, error.details, error.hint);
    return [];
  }

  return (data || []) as Post[];
}
