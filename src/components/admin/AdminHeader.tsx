"use client";

import { useRouter } from "next/navigation";
import { ExternalLink, LogOut, Menu } from "lucide-react";
import { createClient } from "@/lib/supabase/client";

interface AdminHeaderProps {
  onMenuToggle: () => void;
}

export default function AdminHeader({ onMenuToggle }: AdminHeaderProps) {
  const router = useRouter();

  const handleLogout = async () => {
    const supabase = createClient();
    await supabase.auth.signOut();
    router.push("/admin/login");
  };

  return (
    <header className="sticky top-0 z-30 flex h-16 items-center justify-between border-b border-white/5 bg-bg-deep/80 px-6 backdrop-blur-xl">
      <div className="flex items-center gap-4">
        <button
          onClick={onMenuToggle}
          className="text-white/60 hover:text-white lg:hidden"
        >
          <Menu className="h-6 w-6" />
        </button>
        <h1 className="text-sm font-semibold text-white/80">
          Painel Admin — <span className="text-gold">Shoppz Digital</span>
        </h1>
      </div>

      <div className="flex items-center gap-3">
        <a
          href="/"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 rounded-lg border border-white/10 px-3 py-2 text-xs font-medium text-white/60 transition-colors hover:border-white/20 hover:text-white"
        >
          <ExternalLink className="h-3.5 w-3.5" />
          Ver Site
        </a>
        <button
          onClick={handleLogout}
          className="flex items-center gap-2 rounded-lg border border-red-500/20 px-3 py-2 text-xs font-medium text-red-400 transition-colors hover:bg-red-500/10"
        >
          <LogOut className="h-3.5 w-3.5" />
          Logout
        </button>
      </div>
    </header>
  );
}
