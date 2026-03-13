"use client"

import { motion } from "framer-motion"
import { Palette, Zap, Headphones, Search, Shield, Smartphone } from "lucide-react"

const features = [
  {
    icon: Palette,
    title: "Design Exclusivo",
    desc: "Layouts premium personalizados que refletem a identidade única da sua marca.",
  },
  {
    icon: Zap,
    title: "Performance Máxima",
    desc: "Sites ultra-rápidos otimizados para conversão e experiência do usuário.",
  },
  {
    icon: Headphones,
    title: "Suporte Dedicado",
    desc: "Equipe especializada disponível para ajudar você a crescer.",
  },
  {
    icon: Search,
    title: "SEO Otimizado",
    desc: "Configuração profissional para ranquear no Google e atrair clientes.",
  },
  {
    icon: Shield,
    title: "Segurança Total",
    desc: "Certificado SSL, backups automáticos e proteção contra fraudes.",
  },
  {
    icon: Smartphone,
    title: "Mobile-First",
    desc: "Perfeito em todos os dispositivos, do celular ao desktop.",
  },
]

export default function Features() {
  return (
    <section id="features" className="py-24 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <motion.span
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-gold text-xs font-semibold tracking-[0.3em] uppercase"
          >
            Por Que Escolher
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mt-4 text-3xl sm:text-4xl lg:text-5xl font-bold"
          >
            Tudo Que Sua Loja Precisa
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="mt-4 text-white/50 max-w-2xl mx-auto"
          >
            Tecnologia de ponta, design premium e suporte especializado para
            impulsionar suas vendas online.
          </motion.p>
        </div>

        {/* Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((f, i) => (
            <motion.div
              key={f.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="glass glass-hover rounded-2xl p-8 transition-all duration-500 group cursor-default"
            >
              <div className="w-14 h-14 rounded-2xl bg-gold/10 flex items-center justify-center mb-6 group-hover:bg-gold/20 transition-colors">
                <f.icon size={28} className="text-gold" />
              </div>
              <h3 className="text-xl font-bold mb-3">{f.title}</h3>
              <p className="text-white/50 text-sm leading-relaxed">{f.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
