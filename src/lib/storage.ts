import { SiteContent } from "./types";
import { defaultContent } from "./data";
import { createClient } from "./supabase/server";

export async function getContent(): Promise<SiteContent> {
  try {
    const supabase = await createClient();
    const { data, error } = await supabase
      .from("site_content")
      .select("content")
      .limit(1)
      .single();

    if (error || !data) {
      return defaultContent;
    }

    return data.content as SiteContent;
  } catch {
    return defaultContent;
  }
}

export async function saveContent(
  content: SiteContent,
  userId?: string,
): Promise<void> {
  const supabase = await createClient();

  // Check if a row already exists
  const { data: existing } = await supabase
    .from("site_content")
    .select("id")
    .limit(1)
    .single();

  if (existing) {
    const { error } = await supabase
      .from("site_content")
      .update({
        content,
        updated_by: userId ?? null,
      })
      .eq("id", existing.id);

    if (error) throw new Error(error.message);
  } else {
    const { error } = await supabase.from("site_content").insert({
      content,
      updated_by: userId ?? null,
    });

    if (error) throw new Error(error.message);
  }
}
