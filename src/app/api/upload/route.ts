import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import { promises as fs } from "fs";
import path from "path";
import crypto from "crypto";

const AUTH_TOKEN = "shoppz_admin_authenticated_2024_secure";
const UPLOAD_DIR = path.join(process.cwd(), "public", "uploads", "portfolio");
const ALLOWED_TYPES = ["image/jpeg", "image/png", "image/webp", "image/gif"];
const MAX_SIZE = 5 * 1024 * 1024; // 5MB

async function isAuthenticated(): Promise<boolean> {
  const cookieStore = await cookies();
  return cookieStore.get("admin_token")?.value === AUTH_TOKEN;
}

export async function POST(req: NextRequest) {
  if (!(await isAuthenticated())) {
    return NextResponse.json({ error: "Não autorizado" }, { status: 401 });
  }

  const formData = await req.formData();
  const file = formData.get("file") as File | null;

  if (!file) {
    return NextResponse.json({ error: "Nenhum arquivo enviado" }, { status: 400 });
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
  const filePath = path.join(UPLOAD_DIR, safeName);

  await fs.mkdir(UPLOAD_DIR, { recursive: true });

  const buffer = Buffer.from(await file.arrayBuffer());
  await fs.writeFile(filePath, buffer);

  return NextResponse.json({ url: `/uploads/portfolio/${safeName}` });
}
