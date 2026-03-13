"use client";

import { useEffect, useState, useCallback } from "react";
import { SiteContent } from "@/lib/types";
import AdminCard from "@/components/admin/AdminCard";
import Toast from "@/components/admin/Toast";
import { Plus, Trash2, Loader2 } from "lucide-react";

export default function NavbarEditor() {
  const [content, setContent] = useState<SiteContent | null>(null);
  const [saving, setSaving] = useState(false);
  const [toast, setToast] = useState<{
    visible: boolean;
    message: string;
    type: "success" | "error";
  }>({
    visible: false,
    message: "",
    type: "success",
  });

  useEffect(() => {
    fetch("/api/content")
      .then((r) => r.json())
      .then(setContent);
  }, []);

  const closeToast = useCallback(
    () => setToast((t) => ({ ...t, visible: false })),
    [],
  );

  const save = async () => {
    setSaving(true);
    try {
      const res = await fetch("/api/content", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(content),
      });
      setToast({
        visible: true,
        message: res.ok ? "Salvo com sucesso!" : "Erro ao salvar",
        type: res.ok ? "success" : "error",
      });
    } catch {
      setToast({ visible: true, message: "Erro de conexão", type: "error" });
    }
    setSaving(false);
  };

  if (!content)
    return (
      <div className="flex h-64 items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-2 border-gold border-t-transparent" />
      </div>
    );

  const navbar = content.navbar;
  const update = (field: string, value: string) =>
    setContent({ ...content, navbar: { ...navbar, [field]: value } });

  const updateLink = (i: number, field: "label" | "href", value: string) => {
    const links = [...navbar.links];
    links[i] = { ...links[i], [field]: value };
    setContent({ ...content, navbar: { ...navbar, links } });
  };

  const addLink = () =>
    setContent({
      ...content,
      navbar: {
        ...navbar,
        links: [...navbar.links, { label: "Novo Link", href: "#" }],
      },
    });

  const removeLink = (i: number) =>
    setContent({
      ...content,
      navbar: { ...navbar, links: navbar.links.filter((_, idx) => idx !== i) },
    });

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-white">Navbar</h2>
        <button
          onClick={save}
          disabled={saving}
          className="flex items-center gap-2 rounded-xl bg-gold-gradient px-6 py-3 font-bold text-black transition-opacity hover:opacity-90 disabled:opacity-60"
        >
          {saving ? <Loader2 className="h-5 w-5 animate-spin" /> : null}
          Salvar Alterações
        </button>
      </div>

      <AdminCard title="Logo e CTA">
        <div className="space-y-4">
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label className="mb-2 block text-sm font-medium text-white/70">
                Logo Text
              </label>
              <input
                value={navbar.logoText}
                onChange={(e) => update("logoText", e.target.value)}
                className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white focus:border-gold focus:outline-none"
              />
            </div>
            <div>
              <label className="mb-2 block text-sm font-medium text-white/70">
                Logo Accent
              </label>
              <input
                value={navbar.logoAccent}
                onChange={(e) => update("logoAccent", e.target.value)}
                className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white focus:border-gold focus:outline-none"
              />
            </div>
          </div>
          <div>
            <label className="mb-2 block text-sm font-medium text-white/70">
              CTA Text
            </label>
            <input
              value={navbar.ctaText}
              onChange={(e) => update("ctaText", e.target.value)}
              className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white focus:border-gold focus:outline-none"
            />
          </div>
          <div>
            <label className="mb-2 block text-sm font-medium text-white/70">
              WhatsApp URL
            </label>
            <input
              value={navbar.ctaWhatsapp}
              onChange={(e) => update("ctaWhatsapp", e.target.value)}
              className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white focus:border-gold focus:outline-none"
            />
          </div>
        </div>
      </AdminCard>

      <AdminCard title="Links de Navegação">
        <div className="space-y-3">
          {navbar.links.map((link, i) => (
            <div key={i} className="flex items-center gap-3">
              <input
                value={link.label}
                onChange={(e) => updateLink(i, "label", e.target.value)}
                placeholder="Label"
                className="flex-1 rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white focus:border-gold focus:outline-none"
              />
              <input
                value={link.href}
                onChange={(e) => updateLink(i, "href", e.target.value)}
                placeholder="href"
                className="flex-1 rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white focus:border-gold focus:outline-none"
              />
              <button
                onClick={() => removeLink(i)}
                className="text-red-400 hover:text-red-300"
              >
                <Trash2 className="h-5 w-5" />
              </button>
            </div>
          ))}
          <button
            onClick={addLink}
            className="flex w-full items-center justify-center gap-2 rounded-xl border border-dashed border-white/20 py-3 text-sm text-white/50 transition-colors hover:border-gold hover:text-gold"
          >
            <Plus className="h-4 w-4" /> Adicionar Link
          </button>
        </div>
      </AdminCard>

      <Toast {...toast} onClose={closeToast} />
    </div>
  );
}
