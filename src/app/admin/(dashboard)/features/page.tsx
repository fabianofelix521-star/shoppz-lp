"use client";

import { useEffect, useState, useCallback } from "react";
import { SiteContent } from "@/lib/types";
import AdminCard from "@/components/admin/AdminCard";
import Toast from "@/components/admin/Toast";
import IconSelect from "@/components/admin/IconSelect";
import { Plus, Trash2, ChevronUp, ChevronDown, Loader2 } from "lucide-react";

export default function FeaturesEditor() {
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

  const features = content.features;
  const updateSection = (field: string, value: string) =>
    setContent({ ...content, features: { ...features, [field]: value } });

  const updateItem = (i: number, field: string, value: string) => {
    const items = [...features.items];
    items[i] = { ...items[i], [field]: value };
    setContent({ ...content, features: { ...features, items } });
  };

  const addItem = () =>
    setContent({
      ...content,
      features: {
        ...features,
        items: [
          ...features.items,
          {
            icon: "Star",
            title: "Novo Recurso",
            description: "Descrição do recurso",
          },
        ],
      },
    });

  const removeItem = (i: number) =>
    setContent({
      ...content,
      features: {
        ...features,
        items: features.items.filter((_, idx) => idx !== i),
      },
    });

  const moveItem = (i: number, dir: -1 | 1) => {
    const items = [...features.items];
    const j = i + dir;
    if (j < 0 || j >= items.length) return;
    [items[i], items[j]] = [items[j], items[i]];
    setContent({ ...content, features: { ...features, items } });
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-white">Recursos (Features)</h2>
        <button
          onClick={save}
          disabled={saving}
          className="flex items-center gap-2 rounded-xl bg-gold-gradient px-6 py-3 font-bold text-black transition-opacity hover:opacity-90 disabled:opacity-60"
        >
          {saving ? <Loader2 className="h-5 w-5 animate-spin" /> : null}
          Salvar Alterações
        </button>
      </div>

      <AdminCard title="Seção">
        <div className="space-y-4">
          <div>
            <label className="mb-2 block text-sm font-medium text-white/70">
              Label da Seção
            </label>
            <input
              value={features.sectionLabel}
              onChange={(e) => updateSection("sectionLabel", e.target.value)}
              className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white focus:border-gold focus:outline-none"
            />
          </div>
          <div>
            <label className="mb-2 block text-sm font-medium text-white/70">
              Título
            </label>
            <input
              value={features.title}
              onChange={(e) => updateSection("title", e.target.value)}
              className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white focus:border-gold focus:outline-none"
            />
          </div>
          <div>
            <label className="mb-2 block text-sm font-medium text-white/70">
              Subtítulo
            </label>
            <textarea
              value={features.subtitle}
              onChange={(e) => updateSection("subtitle", e.target.value)}
              rows={2}
              className="min-h-[80px] w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white focus:border-gold focus:outline-none"
            />
          </div>
        </div>
      </AdminCard>

      <AdminCard title="Lista de Recursos">
        <div className="space-y-4">
          {features.items.map((item, i) => (
            <div
              key={i}
              className="rounded-xl border border-white/5 bg-white/[0.02] p-4"
            >
              <div className="mb-3 flex items-center justify-between">
                <span className="text-sm font-semibold text-gold">
                  Recurso {i + 1}
                </span>
                <div className="flex items-center gap-1">
                  <button
                    onClick={() => moveItem(i, -1)}
                    disabled={i === 0}
                    className="rounded p-1 text-white/40 hover:text-white disabled:opacity-30"
                  >
                    <ChevronUp className="h-4 w-4" />
                  </button>
                  <button
                    onClick={() => moveItem(i, 1)}
                    disabled={i === features.items.length - 1}
                    className="rounded p-1 text-white/40 hover:text-white disabled:opacity-30"
                  >
                    <ChevronDown className="h-4 w-4" />
                  </button>
                  <button
                    onClick={() => removeItem(i)}
                    className="rounded p-1 text-red-400 hover:text-red-300"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              </div>
              <div className="grid gap-4 sm:grid-cols-3">
                <div>
                  <label className="mb-2 block text-sm font-medium text-white/70">
                    Ícone
                  </label>
                  <IconSelect
                    value={item.icon}
                    onChange={(v) => updateItem(i, "icon", v)}
                  />
                </div>
                <div className="sm:col-span-2">
                  <label className="mb-2 block text-sm font-medium text-white/70">
                    Título
                  </label>
                  <input
                    value={item.title}
                    onChange={(e) => updateItem(i, "title", e.target.value)}
                    className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white focus:border-gold focus:outline-none"
                  />
                </div>
              </div>
              <div className="mt-4">
                <label className="mb-2 block text-sm font-medium text-white/70">
                  Descrição
                </label>
                <textarea
                  value={item.description}
                  onChange={(e) => updateItem(i, "description", e.target.value)}
                  rows={2}
                  className="min-h-[80px] w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white focus:border-gold focus:outline-none"
                />
              </div>
            </div>
          ))}
          <button
            onClick={addItem}
            className="flex w-full items-center justify-center gap-2 rounded-xl border border-dashed border-white/20 py-3 text-sm text-white/50 transition-colors hover:border-gold hover:text-gold"
          >
            <Plus className="h-4 w-4" /> Adicionar Recurso
          </button>
        </div>
      </AdminCard>

      <Toast {...toast} onClose={closeToast} />
    </div>
  );
}
