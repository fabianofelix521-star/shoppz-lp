import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

export async function POST(req: NextRequest) {
  const { email, password } = await req.json();

  if (!email || !password) {
    return NextResponse.json(
      { error: "E-mail e senha são obrigatórios" },
      { status: 400 },
    );
  }

  const supabase = await createClient();

  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    return NextResponse.json(
      { error: "Credenciais inválidas" },
      { status: 401 },
    );
  }

  // Check if user is in admin_users whitelist
  const { data: adminUser } = await supabase
    .from("admin_users")
    .select("id, role")
    .eq("id", data.user.id)
    .single();

  if (!adminUser) {
    await supabase.auth.signOut();
    return NextResponse.json(
      { error: "Acesso negado. Usuário não é administrador." },
      { status: 403 },
    );
  }

  return NextResponse.json({ success: true, role: adminUser.role });
}

export async function GET() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.json({ authenticated: false });
  }

  const { data: adminUser } = await supabase
    .from("admin_users")
    .select("id, role")
    .eq("id", user.id)
    .single();

  return NextResponse.json({
    authenticated: !!adminUser,
    role: adminUser?.role ?? null,
    email: user.email,
  });
}

export async function DELETE() {
  const supabase = await createClient();
  await supabase.auth.signOut();
  return NextResponse.json({ success: true });
}
