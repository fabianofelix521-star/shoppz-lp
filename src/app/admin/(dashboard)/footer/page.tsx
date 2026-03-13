"use client";

import { useEffect, useState, useCallback } from "react";
import { SiteContent } from "@/lib/types";
import AdminCard from "@/components/admin/AdminCard";
import Toast from "@/components/admin/Toast";
import { Plus, Trash2, Loader2 } from "lucide-react";

export default function FooterEditor() {
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

  const footer = content.footer;
  const update = (field: string, value: string) =>
    setContent({ ...content, footer: { ...footer, [field]: value } });

  const updateContact = (field: string, value: string) =>
    setContent({
      ...content,
      footer: { ...footer, contact: { ...footer.contact, [field]: value } },
    });

  const updateSocial = (field: string, value: string) =>
    setContent({
      ...content,
      footer: { ...footer, social: { ...footer.social, [field]: value } },
    });

  const updateQuickLink = (
    i: number,
    field: "label" | "href",
    value: string,
  ) => {
    const quickLinks = [...footer.quickLinks];
    quickLinks[i] = { ...quickLinks[i], [field]: value };
    setContent({ ...content, footer: { ...footer, quickLinks } });
  };

  const addQuickLink = () =>
    setContent({
      ...content,
      footer: {
        ...footer,
        quickLinks: [...footer.quickLinks, { label: "Novo Link", href: "#" }],
      },
    });

  const removeQuickLink = (i: number) =>
    setContent({
      ...content,
      footer: {
        ...footer,
        quickLinks: footer.quickLinks.filter((_, idx) => idx !== i),
      },
    });

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-white">Footer</h2>
        <button
          onClick={save}
          disabled={saving}
          className="flex items-center gap-2 rounded-xl bg-gold-gradient px-6 py-3 font-bold text-black transition-opacity hover:opacity-90 disabled:opacity-60"
        >
          {saving ? <Loader2 className="h-5 w-5 animate-spin" /> : null}
          Salvar Alterações
        </button>
      </div>

      <AdminCard title="Marca">
        <div className="space-y-4">
          <div>
            <label className="mb-2 block text-sm font-medium text-white/70">
              Descrição da Marca
            </label>
            <textarea
              value={footer.brandDescription}
              onChange={(e) => update("brandDescription", e.target.value)}
              rows={3}
              className="min-h-[80px] w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white focus:border-gold focus:outline-none"
            />
          </div>
          <div>
            <label className="mb-2 block text-sm font-medium text-white/70">
              Copyright
            </label>
            <input
              value={footer.copyright}
              onChange={(e) => update("copyright", e.target.value)}
              className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white focus:border-gold focus:outline-none"
            />
          </div>
        </div>
      </AdminCard>

      <AdminCard title="Contato">
        <div className="space-y-4">
          <div>
            <label className="mb-2 block text-sm font-medium text-white/70">
              Email
            </label>
            <input
              value={footer.contact.email}
              onChange={(e) => updateContact("email", e.target.value)}
              className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white focus:border-gold focus:outline-none"
            />
          </div>
          <div>
            <label className="mb-2 block text-sm font-medium text-white/70">
              Telefone
            </label>
            <input
              value={footer.contact.phone}
              onChange={(e) => updateContact("phone", e.target.value)}
              className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white focus:border-gold focus:outline-none"
            />
          </div>
          <div>
            <label className="mb-2 block text-sm font-medium text-white/70">
              Endereço
            </label>
            <input
              value={footer.contact.address}
              onChange={(e) => updateContact("address", e.target.value)}
              className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white focus:border-gold focus:outline-none"
            />
          </div>
        </div>
      </AdminCard>

      <AdminCard title="Redes Sociais">
        <div className="space-y-4">
          <div>
            <label className="mb-2 block text-sm font-medium text-white/70">
              Instagram URL
            </label>
            <input
              value={footer.social.instagram}
              onChange={(e) => updateSocial("instagram", e.target.value)}
              className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white focus:border-gold focus:outline-none"
            />
          </div>
          <div>
            <label className="mb-2 block text-sm font-medium text-white/70">
              Facebook URL
            </label>
            <input
              value={footer.social.facebook}
              onChange={(e) => updateSocial("facebook", e.target.value)}
              className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white focus:border-gold focus:outline-none"
            />
          </div>
          <div>
            <label className="mb-2 block text-sm font-medium text-white/70">
              LinkedIn URL
            </label>
            <input
              value={footer.social.linkedin}
              onChange={(e) => updateSocial("linkedin", e.target.value)}
              className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white focus:border-gold focus:outline-none"
            />
          </div>
        </div>
      </AdminCard>

      <AdminCard title="Links Rápidos">
        <div className="space-y-3">
          {footer.quickLinks.map((link, i) => (
            <div key={i} className="flex items-center gap-3">
              <input
                value={link.label}
                onChange={(e) => updateQuickLink(i, "label", e.target.value)}
                placeholder="Label"
                className="flex-1 rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white focus:border-gold focus:outline-none"
              />
              <input
                value={link.href}
                onChange={(e) => updateQuickLink(i, "href", e.target.value)}
                placeholder="href"
                className="flex-1 rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white focus:border-gold focus:outline-none"
              />
              <button
                onClick={() => removeQuickLink(i)}
                className="text-red-400 hover:text-red-300"
              >
                <Trash2 className="h-5 w-5" />
              </button>
            </div>
          ))}
          <button
            onClick={addQuickLink}
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
