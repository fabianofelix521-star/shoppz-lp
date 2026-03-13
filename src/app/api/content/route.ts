import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import { getContent, saveContent } from "@/lib/storage";

const AUTH_TOKEN = "shoppz_admin_authenticated_2024_secure";

async function isAuthenticated(): Promise<boolean> {
  const cookieStore = await cookies();
  return cookieStore.get("admin_token")?.value === AUTH_TOKEN;
}

export async function GET() {
  const content = await getContent();
  return NextResponse.json(content);
}

export async function PUT(req: NextRequest) {
  if (!(await isAuthenticated())) {
    return NextResponse.json({ error: "Não autorizado" }, { status: 401 });
  }

  const content = await req.json();
  await saveContent(content);
  return NextResponse.json({ success: true });
}
