"use client";

import { useEffect, useState, useCallback } from "react";
import { SiteContent } from "@/lib/types";
import AdminCard from "@/components/admin/AdminCard";
import Toast from "@/components/admin/Toast";
import IconSelect from "@/components/admin/IconSelect";
import { Plus, Trash2, Loader2 } from "lucide-react";

export default function IntegrationsEditor() {
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

  const integrations = content.integrations;
  const updateSection = (field: string, value: string) =>
    setContent({
      ...content,
      integrations: { ...integrations, [field]: value },
    });

  const updateItem = (i: number, field: string, value: string) => {
    const items = [...integrations.items];
    items[i] = { ...items[i], [field]: value };
    setContent({ ...content, integrations: { ...integrations, items } });
  };

  const addItem = () =>
    setContent({
      ...content,
      integrations: {
        ...integrations,
        items: [
          ...integrations.items,
          { icon: "Star", name: "Nova Integração", description: "Descrição" },
        ],
      },
    });

  const removeItem = (i: number) =>
    setContent({
      ...content,
      integrations: {
        ...integrations,
        items: integrations.items.filter((_, idx) => idx !== i),
      },
    });

  const updateCompliance = (i: number, field: string, value: string) => {
    const compliance = [...integrations.compliance];
    compliance[i] = { ...compliance[i], [field]: value };
    setContent({ ...content, integrations: { ...integrations, compliance } });
  };

  const addCompliance = () =>
    setContent({
      ...content,
      integrations: {
        ...integrations,
        compliance: [
          ...integrations.compliance,
          { icon: "Shield", label: "Novo Badge" },
        ],
      },
    });

  const removeCompliance = (i: number) =>
    setContent({
      ...content,
      integrations: {
        ...integrations,
        compliance: integrations.compliance.filter((_, idx) => idx !== i),
      },
    });

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-white">Integrações</h2>
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
              value={integrations.sectionLabel}
              onChange={(e) => updateSection("sectionLabel", e.target.value)}
              className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white focus:border-gold focus:outline-none"
            />
          </div>
          <div>
            <label className="mb-2 block text-sm font-medium text-white/70">
              Título
            </label>
            <input
              value={integrations.title}
              onChange={(e) => updateSection("title", e.target.value)}
              className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white focus:border-gold focus:outline-none"
            />
          </div>
          <div>
            <label className="mb-2 block text-sm font-medium text-white/70">
              Subtítulo
            </label>
            <textarea
              value={integrations.subtitle}
              onChange={(e) => updateSection("subtitle", e.target.value)}
              rows={2}
              className="min-h-[80px] w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white focus:border-gold focus:outline-none"
            />
          </div>
        </div>
      </AdminCard>

      <AdminCard title="Lista de Integrações">
        <div className="space-y-4">
          {integrations.items.map((item, i) => (
            <div
              key={i}
              className="flex items-start gap-4 rounded-xl border border-white/5 bg-white/[0.02] p-4"
            >
              <div className="flex-1 grid gap-4 sm:grid-cols-3">
                <div>
                  <label className="mb-2 block text-sm font-medium text-white/70">
                    Ícone
                  </label>
                  <IconSelect
                    value={item.icon}
                    onChange={(v) => updateItem(i, "icon", v)}
                  />
                </div>
                <div>
                  <label className="mb-2 block text-sm font-medium text-white/70">
                    Nome
                  </label>
                  <input
                    value={item.name}
                    onChange={(e) => updateItem(i, "name", e.target.value)}
                    className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white focus:border-gold focus:outline-none"
                  />
                </div>
                <div>
                  <label className="mb-2 block text-sm font-medium text-white/70">
                    Descrição
                  </label>
                  <input
                    value={item.description}
                    onChange={(e) =>
                      updateItem(i, "description", e.target.value)
                    }
                    className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white focus:border-gold focus:outline-none"
                  />
                </div>
              </div>
              <button
                onClick={() => removeItem(i)}
                className="mt-8 text-red-400 hover:text-red-300"
              >
                <Trash2 className="h-4 w-4" />
              </button>
            </div>
          ))}
          <button
            onClick={addItem}
            className="flex w-full items-center justify-center gap-2 rounded-xl border border-dashed border-white/20 py-3 text-sm text-white/50 transition-colors hover:border-gold hover:text-gold"
          >
            <Plus className="h-4 w-4" /> Adicionar Integração
          </button>
        </div>
      </AdminCard>

      <AdminCard title="Compliance Badges">
        <div className="space-y-4">
          {integrations.compliance.map((badge, i) => (
            <div
              key={i}
              className="flex items-center gap-4 rounded-xl border border-white/5 bg-white/[0.02] p-4"
            >
              <div className="flex-1 grid gap-4 sm:grid-cols-2">
                <div>
                  <label className="mb-2 block text-sm font-medium text-white/70">
                    Ícone
                  </label>
                  <IconSelect
                    value={badge.icon}
                    onChange={(v) => updateCompliance(i, "icon", v)}
                  />
                </div>
                <div>
                  <label className="mb-2 block text-sm font-medium text-white/70">
                    Label
                  </label>
                  <input
                    value={badge.label}
                    onChange={(e) =>
                      updateCompliance(i, "label", e.target.value)
                    }
                    className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white focus:border-gold focus:outline-none"
                  />
                </div>
              </div>
              <button
                onClick={() => removeCompliance(i)}
                className="text-red-400 hover:text-red-300"
              >
                <Trash2 className="h-4 w-4" />
              </button>
            </div>
          ))}
          <button
            onClick={addCompliance}
            className="flex w-full items-center justify-center gap-2 rounded-xl border border-dashed border-white/20 py-3 text-sm text-white/50 transition-colors hover:border-gold hover:text-gold"
          >
            <Plus className="h-4 w-4" /> Adicionar Badge
          </button>
        </div>
      </AdminCard>

      <Toast {...toast} onClose={closeToast} />
    </div>
  );
}
