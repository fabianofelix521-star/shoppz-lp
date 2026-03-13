"use client"

import { motion } from "framer-motion"
import { Star, Quote } from "lucide-react"

const testimonials = [
  {
    text: "A Shoppz Digital transformou completamente meu negócio. Em 3 meses aumentei minhas vendas em 280% e hoje faturamos mais de R$150K por mês.",
    name: "Carolina Santos",
    role: "Fundadora, Luxe Fashion",
    avatar:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&h=200&fit=crop&q=80",
  },
  {
    text: "Design impecável, performance incrível e suporte sempre disponível. Nossa conversão dobrou e o ticket médio aumentou 45%. Melhor investimento que fizemos!",
    name: "Roberto Almeida",
    role: "CEO, Tech Haven",
    avatar:
      "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&h=200&fit=crop&q=80",
  },
  {
    text: "Profissionalismo do início ao fim. A loja ficou linda, as integrações funcionam perfeitamente e o retorno sobre investimento foi absurdo. Super recomendo!",
    name: "Mariana Costa",
    role: "Proprietária, Glow Beauty",
    avatar:
      "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200&h=200&fit=crop&q=80",
  },
]

export default function Testimonials() {
  return (
    <section id="testimonials" className="py-24 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <motion.span
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-gold text-xs font-semibold tracking-[0.3em] uppercase"
          >
            Depoimentos
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mt-4 text-3xl sm:text-4xl lg:text-5xl font-bold"
          >
            Histórias de Sucesso
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="mt-4 text-white/50 max-w-2xl mx-auto"
          >
            Veja o que nossos clientes dizem sobre as lojas que criamos para eles.
          </motion.p>
        </div>

        {/* Cards */}
        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((t, i) => (
            <motion.div
              key={t.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.15 }}
              className="glass rounded-2xl p-8 relative"
            >
              {/* Quote icon */}
              <Quote size={40} className="text-gold/20 mb-4" />

              {/* Stars */}
              <div className="flex gap-1 mb-6">
                {Array.from({ length: 5 }).map((_, j) => (
                  <Star
                    key={j}
                    size={16}
                    className="text-gold fill-gold"
                  />
                ))}
              </div>

              {/* Text */}
              <p className="text-white/70 leading-relaxed mb-8">
                &ldquo;{t.text}&rdquo;
              </p>

              {/* Divider */}
              <div className="h-px bg-white/10 mb-6" />

              {/* Author */}
              <div className="flex items-center gap-4">
                <img
                  src={t.avatar}
                  alt={t.name}
                  loading="lazy"
                  className="w-12 h-12 rounded-full object-cover border-2 border-gold/30"
                />
                <div>
                  <p className="font-semibold text-sm">{t.name}</p>
                  <p className="text-xs text-white/40">{t.role}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
