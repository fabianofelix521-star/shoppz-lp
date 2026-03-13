"use client"

import { Instagram, Facebook, Linkedin, Mail, Phone, MapPin } from "lucide-react"

export default function Footer() {
  return (
    <footer className="border-t border-white/5 py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-3 gap-12">
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
              Transformamos negócios em sucessos digitais. Criamos lojas online
              premium que realmente vendem.
            </p>
          </div>

          {/* Contato */}
          <div>
            <h4 className="font-semibold text-sm mb-4 text-gold tracking-wider uppercase">
              Contato
            </h4>
            <ul className="space-y-3">
              <li className="flex items-center gap-3 text-sm text-white/50">
                <Mail size={16} className="text-gold shrink-0" />
                contato@shoppzdigital.com.br
              </li>
              <li className="flex items-center gap-3 text-sm text-white/50">
                <Phone size={16} className="text-gold shrink-0" />
                (11) 99999-9999
              </li>
              <li className="flex items-center gap-3 text-sm text-white/50">
                <MapPin size={16} className="text-gold shrink-0" />
                São Paulo, SP - Brasil
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
                href="#"
                aria-label="Instagram"
                className="w-10 h-10 rounded-xl glass flex items-center justify-center text-white/50 hover:text-gold hover:border-gold/40 transition-all"
              >
                <Instagram size={18} />
              </a>
              <a
                href="#"
                aria-label="Facebook"
                className="w-10 h-10 rounded-xl glass flex items-center justify-center text-white/50 hover:text-gold hover:border-gold/40 transition-all"
              >
                <Facebook size={18} />
              </a>
              <a
                href="#"
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
          <p className="text-xs text-white/30">
            &copy; 2024 Shoppz Digital. Todos os direitos reservados.
          </p>
        </div>
      </div>
    </footer>
  )
}
