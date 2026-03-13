'use client'

import { motion } from 'framer-motion'

export default function CTAFinal() {
  return (
    <section className="relative py-32 lg:py-40 overflow-hidden">
      {/* Orb Glow */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="w-[600px] h-[600px] bg-gold/10 rounded-full blur-[150px] animate-glow-pulse" />
      </div>

      <div className="relative max-w-3xl mx-auto px-4 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold mb-6">
            Pronto para{' '}
            <span className="text-gold-gradient">Vender Mais?</span>
          </h2>
          <p className="text-lg text-white/50 mb-10 max-w-xl mx-auto">
            Crie sua loja agora e comece a receber pagamentos hoje mesmo. Sem
            complicação, sem taxa de adesão.
          </p>

          <a
            href="#precos"
            className="inline-flex px-10 py-4 rounded-full bg-gold-gradient text-bg-deep font-bold text-lg hover:shadow-gold-lg transition-all duration-300"
          >
            Começar Agora — Grátis por 14 dias
          </a>

          <p className="mt-5 text-sm text-white/30">
            Sem cartão de crédito • Cancele quando quiser
          </p>
        </motion.div>
      </div>
    </section>
  )
}
