"use client";

import {
  Instagram,
  Facebook,
  Linkedin,
  Mail,
  Phone,
  MapPin,
} from "lucide-react";
import { SiteContent } from "@/lib/types";

interface FooterProps {
  data: SiteContent["footer"];
}

export default function Footer({ data }: FooterProps) {
  return (
    <footer className="border-t border-white/5 py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div
          className={`grid gap-12 ${data.quickLinks.length > 0 ? "md:grid-cols-4" : "md:grid-cols-3"}`}
        >
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 rounded-xl bg-gold-gradient flex items-center justify-center text-black font-bold text-lg">
                S
              </div>
              <span className="text-xl font-bold text-white">
                Shoppz.<span className="text-gold">DIGITAL</span>
              </span>
            </div>
            <p className="text-sm text-white/40 leading-relaxed max-w-xs">
              {data.brandDescription}
            </p>
          </div>

          {/* Quick Links */}
          {data.quickLinks.length > 0 && (
            <div>
              <h4 className="font-semibold text-sm mb-4 text-gold tracking-wider uppercase">
                Links Rápidos
              </h4>
              <ul className="space-y-3">
                {data.quickLinks.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      className="text-sm text-white/50 hover:text-gold transition-colors"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Contato */}
          <div>
            <h4 className="font-semibold text-sm mb-4 text-gold tracking-wider uppercase">
              Contato
            </h4>
            <ul className="space-y-3">
              <li>
                <a
                  href={`mailto:${data.contact.email}`}
                  className="flex items-center gap-3 text-sm text-white/50 hover:text-gold transition-colors"
                >
                  <Mail size={16} className="text-gold shrink-0" />
                  {data.contact.email}
                </a>
              </li>
              <li>
                <a
                  href={`tel:${data.contact.phone.replace(/\D/g, "")}`}
                  className="flex items-center gap-3 text-sm text-white/50 hover:text-gold transition-colors"
                >
                  <Phone size={16} className="text-gold shrink-0" />
                  {data.contact.phone}
                </a>
              </li>
              <li className="flex items-center gap-3 text-sm text-white/50">
                <MapPin size={16} className="text-gold shrink-0" />
                {data.contact.address}
              </li>
            </ul>
          </div>

          {/* Redes */}
          <div>
            <h4 className="font-semibold text-sm mb-4 text-gold tracking-wider uppercase">
              Redes Sociais
            </h4>
            <div className="flex gap-3">
              <a
                href={data.social.instagram}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="w-10 h-10 rounded-xl glass flex items-center justify-center text-white/50 hover:text-gold hover:border-gold/40 transition-all"
              >
                <Instagram size={18} />
              </a>
              <a
                href={data.social.facebook}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook"
                className="w-10 h-10 rounded-xl glass flex items-center justify-center text-white/50 hover:text-gold hover:border-gold/40 transition-all"
              >
                <Facebook size={18} />
              </a>
              <a
                href={data.social.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
                className="w-10 h-10 rounded-xl glass flex items-center justify-center text-white/50 hover:text-gold hover:border-gold/40 transition-all"
              >
                <Linkedin size={18} />
              </a>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-12 pt-8 border-t border-white/5 text-center">
          <p className="text-xs text-white/30">{data.copyright}</p>
        </div>
      </div>
    </footer>
  );
}
