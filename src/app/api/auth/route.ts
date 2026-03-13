import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";

const ADMIN_USER = "fabianoshoppz";
const ADMIN_PASS = "Sppz543652B";
const AUTH_TOKEN = "shoppz_admin_authenticated_2024_secure";

export async function POST(req: NextRequest) {
  const { username, password } = await req.json();

  if (username === ADMIN_USER && password === ADMIN_PASS) {
    const cookieStore = await cookies();
    cookieStore.set("admin_token", AUTH_TOKEN, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: 60 * 60 * 24,
    });
    return NextResponse.json({ success: true });
  }

  return NextResponse.json({ error: "Credenciais inválidas" }, { status: 401 });
}

export async function GET() {
  const cookieStore = await cookies();
  const token = cookieStore.get("admin_token");
  const authenticated = token?.value === AUTH_TOKEN;
  return NextResponse.json({ authenticated });
}

export async function DELETE() {
  const cookieStore = await cookies();
  cookieStore.delete("admin_token");
  return NextResponse.json({ success: true });
}
