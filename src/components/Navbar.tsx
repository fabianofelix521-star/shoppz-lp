"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Menu, X, MessageCircle } from "lucide-react";
import { SiteContent } from "@/lib/types";

interface NavbarProps {
  data: SiteContent["navbar"];
}

export default function Navbar({ data }: NavbarProps) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled ? "glass shadow-lg shadow-black/20" : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <a href="#" className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-xl bg-gold-gradient flex items-center justify-center text-black font-bold text-lg">
              S
            </div>
            <span className="text-xl font-bold text-white">
              {data.logoText}
              <span className="text-gold">{data.logoAccent}</span>
            </span>
          </a>

          {/* Desktop Links */}
          <div className="hidden md:flex items-center gap-8">
            {data.links.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="text-sm text-white/70 hover:text-gold transition-colors duration-300"
              >
                {link.label}
              </a>
            ))}
          </div>

          {/* CTA */}
          <div className="hidden md:block">
            <a
              href={data.ctaWhatsapp}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-gold-gradient text-black font-semibold text-sm hover:shadow-gold-lg transition-all duration-300 hover:scale-105"
            >
              <MessageCircle size={16} />
              {data.ctaText}
            </a>
          </div>

          {/* Mobile toggle */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="md:hidden text-white"
            aria-label="Menu"
          >
            {mobileOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileOpen && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="md:hidden glass border-t border-white/10"
        >
          <div className="px-4 py-6 space-y-4">
            {data.links.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className="block text-white/80 hover:text-gold transition-colors"
              >
                {link.label}
              </a>
            ))}
            <a
              href={data.ctaWhatsapp}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-gold-gradient text-black font-semibold text-sm"
            >
              <MessageCircle size={16} />
              {data.ctaText}
            </a>
          </div>
        </motion.div>
      )}
    </motion.nav>
  );
}
