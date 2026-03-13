"use client";

import { useEffect, useState, useCallback } from "react";
import { SiteContent } from "@/lib/types";
import AdminCard from "@/components/admin/AdminCard";
import Toast from "@/components/admin/Toast";
import {
  Plus,
  Trash2,
  ChevronUp,
  ChevronDown,
  Loader2,
  Upload,
  ImageIcon,
} from "lucide-react";

export default function PortfolioEditor() {
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
  const [uploading, setUploading] = useState<number | null>(null);

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

  const portfolio = content.portfolio;
  const updateSection = (field: string, value: string) =>
    setContent({ ...content, portfolio: { ...portfolio, [field]: value } });

  const updateStore = (i: number, field: string, value: string) => {
    const stores = [...portfolio.stores];
    stores[i] = { ...stores[i], [field]: value };
    setContent({ ...content, portfolio: { ...portfolio, stores } });
  };

  const addStore = () =>
    setContent({
      ...content,
      portfolio: {
        ...portfolio,
        stores: [
          ...portfolio.stores,
          {
            name: "Nova Loja",
            badge: "CATEGORIA",
            image: "",
            link: "#",
            sales: "+0%",
            visits: "0/mês",
          },
        ],
      },
    });

  const removeStore = (i: number) =>
    setContent({
      ...content,
      portfolio: {
        ...portfolio,
        stores: portfolio.stores.filter((_, idx) => idx !== i),
      },
    });

  const uploadImage = async (i: number, file: File) => {
    setUploading(i);
    try {
      const formData = new FormData();
      formData.append("file", file);
      const res = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });
      const data = await res.json();
      if (res.ok && data.url) {
        updateStore(i, "image", data.url);
        setToast({
          visible: true,
          message: "Imagem enviada!",
          type: "success",
        });
      } else {
        setToast({
          visible: true,
          message: data.error || "Erro no upload",
          type: "error",
        });
      }
    } catch {
      setToast({
        visible: true,
        message: "Erro ao enviar imagem",
        type: "error",
      });
    }
    setUploading(null);
  };

  const moveStore = (i: number, dir: -1 | 1) => {
    const stores = [...portfolio.stores];
    const j = i + dir;
    if (j < 0 || j >= stores.length) return;
    [stores[i], stores[j]] = [stores[j], stores[i]];
    setContent({ ...content, portfolio: { ...portfolio, stores } });
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-white">Portfólio (Lojas)</h2>
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
              value={portfolio.sectionLabel}
              onChange={(e) => updateSection("sectionLabel", e.target.value)}
              className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white focus:border-gold focus:outline-none"
            />
          </div>
          <div>
            <label className="mb-2 block text-sm font-medium text-white/70">
              Título
            </label>
            <input
              value={portfolio.title}
              onChange={(e) => updateSection("title", e.target.value)}
              className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white focus:border-gold focus:outline-none"
            />
          </div>
          <div>
            <label className="mb-2 block text-sm font-medium text-white/70">
              Subtítulo
            </label>
            <textarea
              value={portfolio.subtitle}
              onChange={(e) => updateSection("subtitle", e.target.value)}
              rows={2}
              className="min-h-[80px] w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white focus:border-gold focus:outline-none"
            />
          </div>
        </div>
      </AdminCard>

      <AdminCard title="Lojas">
        <div className="space-y-6">
          {portfolio.stores.map((store, i) => (
            <div
              key={i}
              className="rounded-xl border border-white/5 bg-white/[0.02] p-4"
            >
              <div className="mb-3 flex items-center justify-between">
                <span className="text-sm font-semibold text-gold">
                  Loja {i + 1}
                </span>
                <div className="flex items-center gap-1">
                  <button
                    onClick={() => moveStore(i, -1)}
                    disabled={i === 0}
                    className="rounded p-1 text-white/40 hover:text-white disabled:opacity-30"
                  >
                    <ChevronUp className="h-4 w-4" />
                  </button>
                  <button
                    onClick={() => moveStore(i, 1)}
                    disabled={i === portfolio.stores.length - 1}
                    className="rounded p-1 text-white/40 hover:text-white disabled:opacity-30"
                  >
                    <ChevronDown className="h-4 w-4" />
                  </button>
                  <button
                    onClick={() => removeStore(i)}
                    className="rounded p-1 text-red-400 hover:text-red-300"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              </div>
              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label className="mb-2 block text-sm font-medium text-white/70">
                    Nome da Loja
                  </label>
                  <input
                    value={store.name}
                    onChange={(e) => updateStore(i, "name", e.target.value)}
                    className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white focus:border-gold focus:outline-none"
                  />
                </div>
                <div>
                  <label className="mb-2 block text-sm font-medium text-white/70">
                    Badge / Categoria
                  </label>
                  <input
                    value={store.badge}
                    onChange={(e) => updateStore(i, "badge", e.target.value)}
                    className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white focus:border-gold focus:outline-none"
                  />
                </div>
                <div>
                  <label className="mb-2 block text-sm font-medium text-white/70">
                    Link da Loja (URL)
                  </label>
                  <input
                    value={store.link}
                    onChange={(e) => updateStore(i, "link", e.target.value)}
                    placeholder="https://..."
                    className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white focus:border-gold focus:outline-none"
                  />
                </div>
                <div className="sm:col-span-2">
                  <label className="mb-2 block text-sm font-medium text-white/70">
                    Imagem da Loja
                  </label>
                  <label className="flex cursor-pointer items-center gap-3 rounded-xl border border-dashed border-white/20 bg-white/5 px-4 py-3 transition-colors hover:border-gold hover:bg-white/10">
                    {uploading === i ? (
                      <Loader2 className="h-5 w-5 animate-spin text-gold" />
                    ) : (
                      <Upload className="h-5 w-5 text-white/50" />
                    )}
                    <span className="text-sm text-white/60">
                      {uploading === i
                        ? "Enviando..."
                        : "Clique para enviar imagem (JPG, PNG, WebP — máx 5MB)"}
                    </span>
                    <input
                      type="file"
                      accept="image/jpeg,image/png,image/webp,image/gif"
                      className="hidden"
                      onChange={(e) => {
                        const file = e.target.files?.[0];
                        if (file) uploadImage(i, file);
                        e.target.value = "";
                      }}
                    />
                  </label>
                </div>
                <div>
                  <label className="mb-2 block text-sm font-medium text-white/70">
                    Vendas
                  </label>
                  <input
                    value={store.sales}
                    onChange={(e) => updateStore(i, "sales", e.target.value)}
                    placeholder="+280%"
                    className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white focus:border-gold focus:outline-none"
                  />
                </div>
                <div>
                  <label className="mb-2 block text-sm font-medium text-white/70">
                    Visitas
                  </label>
                  <input
                    value={store.visits}
                    onChange={(e) => updateStore(i, "visits", e.target.value)}
                    placeholder="15K/mês"
                    className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white focus:border-gold focus:outline-none"
                  />
                </div>
              </div>
              {store.image && (
                <div className="mt-3 flex items-center gap-3">
                  <img
                    src={store.image}
                    alt={store.name}
                    className="h-24 w-24 rounded-xl border border-white/10 object-cover"
                  />
                  <div className="flex flex-col gap-1">
                    <span className="flex items-center gap-1 text-xs text-green-400">
                      <ImageIcon className="h-3 w-3" /> Imagem carregada
                    </span>
                    <button
                      type="button"
                      onClick={() => updateStore(i, "image", "")}
                      className="text-xs text-red-400 hover:text-red-300"
                    >
                      Remover imagem
                    </button>
                  </div>
                </div>
              )}
            </div>
          ))}
          <button
            onClick={addStore}
            className="flex w-full items-center justify-center gap-2 rounded-xl border border-dashed border-white/20 py-3 text-sm text-white/50 transition-colors hover:border-gold hover:text-gold"
          >
            <Plus className="h-4 w-4" /> Adicionar Loja
          </button>
        </div>
      </AdminCard>

      <Toast {...toast} onClose={closeToast} />
    </div>
  );
}
