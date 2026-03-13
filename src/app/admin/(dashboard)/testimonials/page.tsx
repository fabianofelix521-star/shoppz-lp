"use client";

import { useEffect, useState, useCallback } from "react";
import { SiteContent } from "@/lib/types";
import AdminCard from "@/components/admin/AdminCard";
import Toast from "@/components/admin/Toast";
import { Plus, Trash2, Star, Loader2 } from "lucide-react";

export default function TestimonialsEditor() {
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

  const testimonials = content.testimonials;
  const updateSection = (field: string, value: string) =>
    setContent({
      ...content,
      testimonials: { ...testimonials, [field]: value },
    });

  const updateItem = (i: number, field: string, value: string | number) => {
    const items = [...testimonials.items];
    items[i] = { ...items[i], [field]: value };
    setContent({ ...content, testimonials: { ...testimonials, items } });
  };

  const addItem = () =>
    setContent({
      ...content,
      testimonials: {
        ...testimonials,
        items: [
          ...testimonials.items,
          {
            text: "Novo depoimento...",
            name: "Nome",
            role: "Cargo, Empresa",
            avatar: "",
            stars: 5,
          },
        ],
      },
    });

  const removeItem = (i: number) =>
    setContent({
      ...content,
      testimonials: {
        ...testimonials,
        items: testimonials.items.filter((_, idx) => idx !== i),
      },
    });

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-white">Depoimentos</h2>
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
              value={testimonials.sectionLabel}
              onChange={(e) => updateSection("sectionLabel", e.target.value)}
              className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white focus:border-gold focus:outline-none"
            />
          </div>
          <div>
            <label className="mb-2 block text-sm font-medium text-white/70">
              Título
            </label>
            <input
              value={testimonials.title}
              onChange={(e) => updateSection("title", e.target.value)}
              className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white focus:border-gold focus:outline-none"
            />
          </div>
          <div>
            <label className="mb-2 block text-sm font-medium text-white/70">
              Subtítulo
            </label>
            <textarea
              value={testimonials.subtitle}
              onChange={(e) => updateSection("subtitle", e.target.value)}
              rows={2}
              className="min-h-[80px] w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white focus:border-gold focus:outline-none"
            />
          </div>
        </div>
      </AdminCard>

      <AdminCard title="Lista de Depoimentos">
        <div className="space-y-6">
          {testimonials.items.map((item, i) => (
            <div
              key={i}
              className="rounded-xl border border-white/5 bg-white/[0.02] p-4"
            >
              <div className="mb-3 flex items-center justify-between">
                <span className="text-sm font-semibold text-gold">
                  Depoimento {i + 1}
                </span>
                <button
                  onClick={() => removeItem(i)}
                  className="rounded p-1 text-red-400 hover:text-red-300"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
              <div className="space-y-4">
                <div>
                  <label className="mb-2 block text-sm font-medium text-white/70">
                    Texto
                  </label>
                  <textarea
                    value={item.text}
                    onChange={(e) => updateItem(i, "text", e.target.value)}
                    rows={3}
                    className="min-h-[80px] w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white focus:border-gold focus:outline-none"
                  />
                </div>
                <div className="grid gap-4 sm:grid-cols-2">
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
                      Cargo / Empresa
                    </label>
                    <input
                      value={item.role}
                      onChange={(e) => updateItem(i, "role", e.target.value)}
                      className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white focus:border-gold focus:outline-none"
                    />
                  </div>
                </div>
                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <label className="mb-2 block text-sm font-medium text-white/70">
                      URL do Avatar
                    </label>
                    <input
                      value={item.avatar}
                      onChange={(e) => updateItem(i, "avatar", e.target.value)}
                      className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white focus:border-gold focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="mb-2 block text-sm font-medium text-white/70">
                      Estrelas
                    </label>
                    <div className="flex items-center gap-1 py-2">
                      {[1, 2, 3, 4, 5].map((s) => (
                        <button
                          key={s}
                          type="button"
                          onClick={() => updateItem(i, "stars", s)}
                          className="p-1"
                        >
                          <Star
                            className={`h-6 w-6 ${s <= item.stars ? "fill-gold text-gold" : "text-white/20"}`}
                          />
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
                {item.avatar && (
                  <img
                    src={item.avatar}
                    alt={item.name}
                    className="h-16 w-16 rounded-full border border-white/10 object-cover"
                  />
                )}
              </div>
            </div>
          ))}
          <button
            onClick={addItem}
            className="flex w-full items-center justify-center gap-2 rounded-xl border border-dashed border-white/20 py-3 text-sm text-white/50 transition-colors hover:border-gold hover:text-gold"
          >
            <Plus className="h-4 w-4" /> Adicionar Depoimento
          </button>
        </div>
      </AdminCard>

      <Toast {...toast} onClose={closeToast} />
    </div>
  );
}
