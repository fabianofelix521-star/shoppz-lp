"use client"

import { motion } from "framer-motion"
import {
  CreditCard,
  Globe,
  BarChart3,
  Wallet,
  Target,
  Cloud,
  Shield,
  Lock,
  FileCheck,
  Award,
} from "lucide-react"

const integrations = [
  { icon: CreditCard, name: "Stripe", desc: "Pagamentos Seguros" },
  { icon: Globe, name: "PayPal", desc: "Checkout Global" },
  { icon: BarChart3, name: "Google Analytics", desc: "Análise de Dados" },
  { icon: Wallet, name: "Mercado Pago", desc: "Gateway BR" },
  { icon: Target, name: "Meta Pixel", desc: "Marketing" },
  { icon: Cloud, name: "AWS", desc: "Cloud Hosting" },
]

const compliance = [
  { icon: Lock, label: "SSL Certificado" },
  { icon: Shield, label: "PCI Compliance" },
  { icon: FileCheck, label: "LGPD Compliant" },
  { icon: Award, label: "ISO 27001" },
]

export default function Integrations() {
  return (
    <section className="py-24 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <motion.span
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-gold text-xs font-semibold tracking-[0.3em] uppercase"
          >
            Integrações
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mt-4 text-3xl sm:text-4xl lg:text-5xl font-bold"
          >
            Tecnologias Premium
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="mt-4 text-white/50 max-w-2xl mx-auto"
          >
            Trabalhamos com as melhores plataformas e ferramentas do mercado.
          </motion.p>
        </div>

        {/* Integration cards */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-16">
          {integrations.map((item, i) => (
            <motion.div
              key={item.name}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
              className="glass glass-hover rounded-2xl p-6 text-center transition-all duration-500 group cursor-default"
            >
              <div className="w-12 h-12 rounded-xl bg-gold/10 flex items-center justify-center mx-auto mb-4 group-hover:bg-gold/20 transition-colors">
                <item.icon size={24} className="text-gold" />
              </div>
              <p className="font-semibold text-sm mb-1">{item.name}</p>
              <p className="text-[11px] text-white/40">{item.desc}</p>
            </motion.div>
          ))}
        </div>

        {/* Compliance badges */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex flex-wrap justify-center gap-4"
        >
          {compliance.map((c) => (
            <div
              key={c.label}
              className="flex items-center gap-2 px-5 py-2.5 rounded-full glass text-xs font-medium text-white/60"
            >
              <c.icon size={14} className="text-gold" />
              {c.label}
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
