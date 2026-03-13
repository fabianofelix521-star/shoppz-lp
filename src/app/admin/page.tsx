"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { SiteContent } from "@/lib/types";
import AdminCard from "@/components/admin/AdminCard";
import { Image, Store, MessageSquare, Plug, ArrowRight } from "lucide-react";

export default function AdminDashboard() {
  const [content, setContent] = useState<SiteContent | null>(null);

  useEffect(() => {
    fetch("/api/content")
      .then((r) => r.json())
      .then(setContent);
  }, []);

  if (!content) {
    return (
      <div className="flex h-64 items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-2 border-gold border-t-transparent" />
      </div>
    );
  }

  const stats = [
    {
      label: "Seções do Site",
      value: "9",
      icon: Image,
      color: "text-blue-400",
    },
    {
      label: "Lojas no Portfólio",
      value: String(content.portfolio.stores.length),
      icon: Store,
      color: "text-gold",
    },
    {
      label: "Depoimentos",
      value: String(content.testimonials.items.length),
      icon: MessageSquare,
      color: "text-green-400",
    },
    {
      label: "Integrações",
      value: String(content.integrations.items.length),
      icon: Plug,
      color: "text-purple-400",
    },
  ];

  const quickActions = [
    { label: "Editar Hero", href: "/admin/hero" },
    { label: "Editar Portfólio", href: "/admin/portfolio" },
    { label: "Editar Depoimentos", href: "/admin/testimonials" },
  ];

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-white">Dashboard</h2>

      {/* Stats */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map(({ label, value, icon: Icon, color }) => (
          <div
            key={label}
            className="rounded-2xl border border-gold/15 bg-white/[0.03] p-5 backdrop-blur-xl shadow-card"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-white/50">{label}</p>
                <p className="mt-1 text-3xl font-bold text-white">{value}</p>
              </div>
              <Icon className={`h-10 w-10 ${color} opacity-60`} />
            </div>
          </div>
        ))}
      </div>

      {/* Quick actions */}
      <AdminCard
        title="Ações Rápidas"
        description="Acesse rapidamente as seções mais editadas"
      >
        <div className="grid gap-3 sm:grid-cols-3">
          {quickActions.map(({ label, href }) => (
            <Link
              key={href}
              href={href}
              className="flex items-center justify-between rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm font-medium text-white/80 transition-colors hover:border-gold/30 hover:text-gold"
            >
              {label}
              <ArrowRight className="h-4 w-4" />
            </Link>
          ))}
        </div>
        <div className="mt-4">
          <a
            href="/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-sm text-gold hover:underline"
          >
            Ver Site ao Vivo <ArrowRight className="h-3.5 w-3.5" />
          </a>
        </div>
      </AdminCard>
    </div>
  );
}
