"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Image,
  Sparkles,
  Store,
  MessageSquare,
  Plug,
  PhoneCall,
  Navigation,
  Footprints,
  Settings,
  X,
} from "lucide-react";

const NAV_ITEMS = [
  { label: "Dashboard", href: "/admin", icon: LayoutDashboard },
  { label: "Hero & Banner", href: "/admin/hero", icon: Image },
  { label: "Recursos", href: "/admin/features", icon: Sparkles },
  { label: "Portfólio", href: "/admin/portfolio", icon: Store },
  { label: "Depoimentos", href: "/admin/testimonials", icon: MessageSquare },
  { label: "Integrações", href: "/admin/integrations", icon: Plug },
  { label: "CTA Final", href: "/admin/cta", icon: PhoneCall },
  { label: "Navbar", href: "/admin/navbar", icon: Navigation },
  { label: "Footer", href: "/admin/footer", icon: Footprints },
  { label: "Configurações", href: "/admin/settings", icon: Settings },
];

interface AdminSidebarProps {
  open: boolean;
  onClose: () => void;
}

export default function AdminSidebar({ open, onClose }: AdminSidebarProps) {
  const pathname = usePathname();

  return (
    <>
      {/* Overlay mobile */}
      {open && (
        <div
          className="fixed inset-0 z-40 bg-black/60 lg:hidden"
          onClick={onClose}
        />
      )}

      <aside
        className={`fixed left-0 top-0 z-50 flex h-screen w-[280px] flex-col border-r border-white/5 bg-bg-surface transition-transform lg:translate-x-0 ${
          open ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {/* Logo */}
        <div className="flex h-16 items-center justify-between border-b border-white/5 px-6">
          <Link href="/admin" className="flex items-center gap-1">
            <span className="text-xl font-bold text-white">Shoppz.</span>
            <span className="text-xs font-bold tracking-widest text-gold">
              ADMIN
            </span>
          </Link>
          <button
            onClick={onClose}
            className="text-white/50 hover:text-white lg:hidden"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Nav */}
        <nav className="flex-1 overflow-y-auto p-4">
          <ul className="space-y-1">
            {NAV_ITEMS.map(({ label, href, icon: Icon }) => {
              const active = pathname === href;
              return (
                <li key={href}>
                  <Link
                    href={href}
                    onClick={onClose}
                    className={`flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium transition-colors ${
                      active
                        ? "bg-gold/10 text-gold"
                        : "text-white/60 hover:bg-white/5 hover:text-white"
                    }`}
                  >
                    <Icon className="h-5 w-5" />
                    {label}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        {/* Footer */}
        <div className="border-t border-white/5 p-4">
          <p className="text-xs text-white/30 text-center">
            Shoppz Digital © 2024
          </p>
        </div>
      </aside>
    </>
  );
}
