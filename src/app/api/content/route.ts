import { NextRequest, NextResponse } from "next/server";
import { getContent, saveContent } from "@/lib/storage";
import { createClient } from "@/lib/supabase/server";

export async function GET() {
  const content = await getContent();
  return NextResponse.json(content);
}

export async function PUT(req: NextRequest) {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.json({ error: "Não autorizado" }, { status: 401 });
  }

  // Verify admin
  const { data: adminUser } = await supabase
    .from("admin_users")
    .select("id")
    .eq("id", user.id)
    .single();

  if (!adminUser) {
    return NextResponse.json({ error: "Não autorizado" }, { status: 403 });
  }

  const content = await req.json();
  await saveContent(content, user.id);
  return NextResponse.json({ success: true });
}
