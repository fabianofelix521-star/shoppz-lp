'use client'

import { motion } from 'framer-motion'
import { Star } from 'lucide-react'

interface Testimonial {
  quote: string
  name: string
  store: string
  city: string
  initials: string
}

const testimonials: Testimonial[] = [
  {
    quote: 'Triplicou minhas vendas em 3 meses! A plataforma é incrivelmente fácil de usar.',
    name: 'Ana Silva',
    store: 'Moda Luxo',
    city: 'São Paulo',
    initials: 'AS',
  },
  {
    quote: 'O suporte é incrível, resolvem tudo na hora. Nunca vi atendimento assim.',
    name: 'Carlos Tech',
    store: 'Tech Shop',
    city: 'Rio de Janeiro',
    initials: 'CT',
  },
  {
    quote: 'Melhor investimento que fiz para minha marca. Recomendo de olhos fechados.',
    name: 'Julia Beauty',
    store: 'Beauty Store',
    city: 'Curitiba',
    initials: 'JB',
  },
]

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.15 } },
}

const item = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5 } },
}

export default function Testimonials() {
  return (
    <section className="py-24 lg:py-32 bg-bg-surface">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold mb-4">
            O que nossos{' '}
            <span className="text-gold-gradient">lojistas</span> dizem
          </h2>
        </motion.div>

        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6"
        >
          {testimonials.map((t) => (
            <motion.div
              key={t.name}
              variants={item}
              className="p-6 rounded-2xl glass glass-hover transition-all duration-300"
            >
              {/* Stars */}
              <div className="flex gap-1 mb-4">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star
                    key={i}
                    className="w-4 h-4 fill-gold text-gold"
                  />
                ))}
              </div>

              <p className="text-white/70 leading-relaxed mb-6">
                &ldquo;{t.quote}&rdquo;
              </p>

              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-navy-gradient flex items-center justify-center text-xs font-bold text-gold">
                  {t.initials}
                </div>
                <div>
                  <div className="text-sm font-semibold">{t.name}</div>
                  <div className="text-xs text-white/40">
                    {t.store} • {t.city}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
