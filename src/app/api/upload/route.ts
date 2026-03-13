import { NextRequest, NextResponse } from "next/server";
import crypto from "crypto";
import { createClient } from "@/lib/supabase/server";

const ALLOWED_TYPES = ["image/jpeg", "image/png", "image/webp", "image/gif"];
const MAX_SIZE = 5 * 1024 * 1024; // 5MB

export async function POST(req: NextRequest) {
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

  const formData = await req.formData();
  const file = formData.get("file") as File | null;

  if (!file) {
    return NextResponse.json(
      { error: "Nenhum arquivo enviado" },
      { status: 400 },
    );
  }

  if (!ALLOWED_TYPES.includes(file.type)) {
    return NextResponse.json(
      { error: "Tipo não permitido. Use JPG, PNG, WebP ou GIF." },
      { status: 400 },
    );
  }

  if (file.size > MAX_SIZE) {
    return NextResponse.json(
      { error: "Arquivo muito grande. Máximo 5MB." },
      { status: 400 },
    );
  }

  const ext = file.name.split(".").pop()?.toLowerCase() || "jpg";
  const safeName = `store-${crypto.randomBytes(8).toString("hex")}.${ext}`;

  const buffer = Buffer.from(await file.arrayBuffer());

  const { error: uploadError } = await supabase.storage
    .from("portfolio")
    .upload(safeName, buffer, {
      contentType: file.type,
      upsert: false,
    });

  if (uploadError) {
    return NextResponse.json(
      { error: "Erro ao fazer upload: " + uploadError.message },
      { status: 500 },
    );
  }

  const {
    data: { publicUrl },
  } = supabase.storage.from("portfolio").getPublicUrl(safeName);

  return NextResponse.json({ url: publicUrl });
}
