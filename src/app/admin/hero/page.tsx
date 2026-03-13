"use client";

import { useEffect, useState, useCallback } from "react";
import { SiteContent } from "@/lib/types";
import AdminCard from "@/components/admin/AdminCard";
import Toast from "@/components/admin/Toast";
import { Plus, Trash2, ChevronUp, ChevronDown, Loader2 } from "lucide-react";

export default function HeroEditor() {
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

  const hero = content.hero;
  const update = (field: string, value: string) =>
    setContent({ ...content, hero: { ...hero, [field]: value } });

  const updateStat = (i: number, field: "value" | "label", val: string) => {
    const stats = [...hero.stats];
    stats[i] = { ...stats[i], [field]: val };
    setContent({ ...content, hero: { ...hero, stats } });
  };

  const addStat = () =>
    setContent({
      ...content,
      hero: {
        ...hero,
        stats: [...hero.stats, { value: "0", label: "NOVO STAT" }],
      },
    });
  const removeStat = (i: number) =>
    setContent({
      ...content,
      hero: { ...hero, stats: hero.stats.filter((_, idx) => idx !== i) },
    });

  const updatePhone = (i: number, field: string, val: string) => {
    const phones = [...hero.phones];
    phones[i] = { ...phones[i], [field]: val };
    setContent({ ...content, hero: { ...hero, phones } });
  };

  const updateStatsBar = (i: number, val: string) => {
    const statsBar = [...hero.statsBar];
    statsBar[i] = { label: val };
    setContent({ ...content, hero: { ...hero, statsBar } });
  };

  const addStatsBar = () =>
    setContent({
      ...content,
      hero: { ...hero, statsBar: [...hero.statsBar, { label: "Novo item" }] },
    });
  const removeStatsBar = (i: number) =>
    setContent({
      ...content,
      hero: { ...hero, statsBar: hero.statsBar.filter((_, idx) => idx !== i) },
    });

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-white">Hero & Banner</h2>
        <button
          onClick={save}
          disabled={saving}
          className="flex items-center gap-2 rounded-xl bg-gold-gradient px-6 py-3 font-bold text-black transition-opacity hover:opacity-90 disabled:opacity-60"
        >
          {saving ? <Loader2 className="h-5 w-5 animate-spin" /> : null}
          Salvar Alterações
        </button>
      </div>

      <AdminCard title="Textos Principais">
        <div className="space-y-4">
          <div>
            <label className="mb-2 block text-sm font-medium text-white/70">
              Badge
            </label>
            <input
              value={hero.badge}
              onChange={(e) => update("badge", e.target.value)}
              className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white placeholder-white/30 focus:border-gold focus:outline-none"
            />
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label className="mb-2 block text-sm font-medium text-white/70">
                Title Line 1
              </label>
              <input
                value={hero.titleLine1}
                onChange={(e) => update("titleLine1", e.target.value)}
                className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white focus:border-gold focus:outline-none"
              />
            </div>
            <div>
              <label className="mb-2 block text-sm font-medium text-white/70">
                Title Line 2 (gradient)
              </label>
              <input
                value={hero.titleLine2}
                onChange={(e) => update("titleLine2", e.target.value)}
                className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white focus:border-gold focus:outline-none"
              />
            </div>
          </div>
          <div>
            <label className="mb-2 block text-sm font-medium text-white/70">
              Descrição
            </label>
            <textarea
              value={hero.description}
              onChange={(e) => update("description", e.target.value)}
              rows={3}
              className="min-h-[80px] w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white focus:border-gold focus:outline-none"
            />
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label className="mb-2 block text-sm font-medium text-white/70">
                Botão Primário
              </label>
              <input
                value={hero.ctaPrimaryText}
                onChange={(e) => update("ctaPrimaryText", e.target.value)}
                className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white focus:border-gold focus:outline-none"
              />
            </div>
            <div>
              <label className="mb-2 block text-sm font-medium text-white/70">
                Botão Secundário
              </label>
              <input
                value={hero.ctaSecondaryText}
                onChange={(e) => update("ctaSecondaryText", e.target.value)}
                className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white focus:border-gold focus:outline-none"
              />
            </div>
          </div>
          <div>
            <label className="mb-2 block text-sm font-medium text-white/70">
              WhatsApp URL
            </label>
            <input
              value={hero.whatsappUrl}
              onChange={(e) => update("whatsappUrl", e.target.value)}
              className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white focus:border-gold focus:outline-none"
            />
          </div>
        </div>
      </AdminCard>

      {/* Stats */}
      <AdminCard title="Stats" description="Estatísticas exibidas no hero">
        <div className="space-y-3">
          {hero.stats.map((stat, i) => (
            <div key={i} className="flex items-center gap-3">
              <input
                value={stat.value}
                onChange={(e) => updateStat(i, "value", e.target.value)}
                placeholder="Valor"
                className="w-32 rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white focus:border-gold focus:outline-none"
              />
              <input
                value={stat.label}
                onChange={(e) => updateStat(i, "label", e.target.value)}
                placeholder="Label"
                className="flex-1 rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white focus:border-gold focus:outline-none"
              />
              <button
                onClick={() => removeStat(i)}
                className="text-red-400 hover:text-red-300"
              >
                <Trash2 className="h-5 w-5" />
              </button>
            </div>
          ))}
          <button
            onClick={addStat}
            className="flex w-full items-center justify-center gap-2 rounded-xl border border-dashed border-white/20 py-3 text-sm text-white/50 transition-colors hover:border-gold hover:text-gold"
          >
            <Plus className="h-4 w-4" /> Adicionar Stat
          </button>
        </div>
      </AdminCard>

      {/* Phone Mockups */}
      <AdminCard
        title="Phone Mockups"
        description="3 vitrines de celular no hero"
      >
        <div className="space-y-6">
          {hero.phones.map((phone, i) => (
            <div
              key={i}
              className="rounded-xl border border-white/5 bg-white/[0.02] p-4"
            >
              <p className="mb-3 text-sm font-semibold text-gold">
                Mockup {i + 1}
              </p>
              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label className="mb-2 block text-sm font-medium text-white/70">
                    Nome da Loja
                  </label>
                  <input
                    value={phone.storeName}
                    onChange={(e) =>
                      updatePhone(i, "storeName", e.target.value)
                    }
                    className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white focus:border-gold focus:outline-none"
                  />
                </div>
                <div>
                  <label className="mb-2 block text-sm font-medium text-white/70">
                    Categoria
                  </label>
                  <input
                    value={phone.category}
                    onChange={(e) => updatePhone(i, "category", e.target.value)}
                    className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white focus:border-gold focus:outline-none"
                  />
                </div>
                <div>
                  <label className="mb-2 block text-sm font-medium text-white/70">
                    Preço
                  </label>
                  <input
                    value={phone.price}
                    onChange={(e) => updatePhone(i, "price", e.target.value)}
                    className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white focus:border-gold focus:outline-none"
                  />
                </div>
                <div>
                  <label className="mb-2 block text-sm font-medium text-white/70">
                    URL da Imagem
                  </label>
                  <input
                    value={phone.imageUrl}
                    onChange={(e) => updatePhone(i, "imageUrl", e.target.value)}
                    className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white focus:border-gold focus:outline-none"
                  />
                </div>
              </div>
              {phone.imageUrl && (
                <div className="mt-3">
                  <img
                    src={phone.imageUrl}
                    alt={phone.storeName}
                    className="max-w-[200px] rounded-xl border border-white/10"
                  />
                </div>
              )}
            </div>
          ))}
        </div>
      </AdminCard>

      {/* Stats Bar */}
      <AdminCard title="Stats Bar" description="Barra de estatísticas animada">
        <div className="space-y-3">
          {hero.statsBar.map((item, i) => (
            <div key={i} className="flex items-center gap-3">
              <input
                value={item.label}
                onChange={(e) => updateStatsBar(i, e.target.value)}
                className="flex-1 rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white focus:border-gold focus:outline-none"
              />
              <button
                onClick={() => removeStatsBar(i)}
                className="text-red-400 hover:text-red-300"
              >
                <Trash2 className="h-5 w-5" />
              </button>
            </div>
          ))}
          <button
            onClick={addStatsBar}
            className="flex w-full items-center justify-center gap-2 rounded-xl border border-dashed border-white/20 py-3 text-sm text-white/50 transition-colors hover:border-gold hover:text-gold"
          >
            <Plus className="h-4 w-4" /> Adicionar Item
          </button>
        </div>
      </AdminCard>

      <Toast {...toast} onClose={closeToast} />
    </div>
  );
}
