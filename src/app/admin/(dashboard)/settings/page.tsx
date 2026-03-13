"use client";

import AdminCard from "@/components/admin/AdminCard";
import { ExternalLink } from "lucide-react";

export default function SettingsPage() {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-white">Configurações</h2>

      <AdminCard title="Informações do Sistema">
        <div className="space-y-3 text-sm">
          <div className="flex items-center justify-between rounded-lg border border-white/5 bg-white/[0.02] px-4 py-3">
            <span className="text-white/50">Plataforma</span>
            <span className="font-medium text-white">Shoppz Digital LP</span>
          </div>
          <div className="flex items-center justify-between rounded-lg border border-white/5 bg-white/[0.02] px-4 py-3">
            <span className="text-white/50">Framework</span>
            <span className="font-medium text-white">
              Next.js 14 + Tailwind CSS
            </span>
          </div>
          <div className="flex items-center justify-between rounded-lg border border-white/5 bg-white/[0.02] px-4 py-3">
            <span className="text-white/50">Storage</span>
            <span className="font-medium text-white">
              JSON File (data/content.json)
            </span>
          </div>
        </div>
      </AdminCard>

      <AdminCard title="Links Úteis">
        <div className="space-y-2">
          <a
            href="/"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 rounded-lg border border-white/5 bg-white/[0.02] px-4 py-3 text-sm text-white/70 transition-colors hover:border-gold/30 hover:text-gold"
          >
            <ExternalLink className="h-4 w-4" />
            Ver Landing Page
          </a>
          <a
            href="/api/content"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 rounded-lg border border-white/5 bg-white/[0.02] px-4 py-3 text-sm text-white/70 transition-colors hover:border-gold/30 hover:text-gold"
          >
            <ExternalLink className="h-4 w-4" />
            Ver API de Conteúdo (JSON)
          </a>
        </div>
      </AdminCard>
    </div>
  );
}
