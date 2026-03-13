"use client";

import { useState, useRef, useEffect } from "react";
import { ChevronDown } from "lucide-react";
import * as LucideIcons from "lucide-react";

const ICON_OPTIONS = [
  "Palette",
  "Zap",
  "Headphones",
  "Search",
  "Shield",
  "Smartphone",
  "Star",
  "Heart",
  "Globe",
  "Lock",
  "CreditCard",
  "BarChart3",
  "Target",
  "Cloud",
  "Award",
  "Wallet",
  "FileCheck",
  "ArrowRight",
  "MessageCircle",
  "Users",
  "Camera",
  "Code",
  "Database",
  "Layers",
  "Layout",
  "Monitor",
  "Package",
  "Settings",
  "ShoppingBag",
  "TrendingUp",
  "Truck",
] as const;

function getIcon(name: string) {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const icons = LucideIcons as unknown as Record<
    string,
    React.ComponentType<{ className?: string }>
  >;
  return icons[name] || LucideIcons.HelpCircle;
}

interface IconSelectProps {
  value: string;
  onChange: (value: string) => void;
}

export default function IconSelect({ value, onChange }: IconSelectProps) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node))
        setOpen(false);
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  const CurrentIcon = getIcon(value);

  return (
    <div ref={ref} className="relative">
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className="flex w-full items-center gap-3 rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-left text-white transition-colors hover:border-white/20 focus:border-gold focus:outline-none"
      >
        <CurrentIcon className="h-5 w-5 text-gold" />
        <span className="flex-1 text-sm">{value}</span>
        <ChevronDown
          className={`h-4 w-4 text-white/50 transition-transform ${open ? "rotate-180" : ""}`}
        />
      </button>

      {open && (
        <div className="absolute left-0 top-full z-50 mt-2 max-h-64 w-full overflow-y-auto rounded-xl border border-white/10 bg-bg-surface p-2 shadow-lg backdrop-blur-xl">
          <div className="grid grid-cols-4 gap-1">
            {ICON_OPTIONS.map((name) => {
              const Icon = getIcon(name);
              return (
                <button
                  key={name}
                  type="button"
                  onClick={() => {
                    onChange(name);
                    setOpen(false);
                  }}
                  className={`flex flex-col items-center gap-1 rounded-lg p-2 text-xs transition-colors hover:bg-white/10 ${
                    value === name ? "bg-gold/20 text-gold" : "text-white/70"
                  }`}
                  title={name}
                >
                  <Icon className="h-5 w-5" />
                  <span className="truncate w-full text-center text-[10px]">
                    {name}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
