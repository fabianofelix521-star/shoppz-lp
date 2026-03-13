import { promises as fs } from "fs";
import path from "path";
import { SiteContent } from "./types";
import { defaultContent } from "./data";

const DATA_FILE = path.join(process.cwd(), "data", "content.json");

export async function getContent(): Promise<SiteContent> {
  try {
    const raw = await fs.readFile(DATA_FILE, "utf-8");
    return JSON.parse(raw) as SiteContent;
  } catch {
    await saveContent(defaultContent);
    return defaultContent;
  }
}

export async function saveContent(content: SiteContent): Promise<void> {
  const dir = path.dirname(DATA_FILE);
  await fs.mkdir(dir, { recursive: true });
  await fs.writeFile(DATA_FILE, JSON.stringify(content, null, 2), "utf-8");
}
