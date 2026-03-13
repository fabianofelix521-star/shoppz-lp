'use client'

import { motion } from 'framer-motion'
import PhoneMockup from './PhoneMockup'

const stats = [
  { value: 'R$ 12M+', label: 'Vendas' },
  { value: '500+', label: 'Lojistas' },
  { value: '98%', label: 'Satisfação' },
]

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center pt-20 overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[600px] bg-gold/5 rounded-full blur-[120px]" />
        <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-navy/20 rounded-full blur-[100px]" />
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage:
              'linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)',
            backgroundSize: '60px 60px',
          }}
        />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-8 items-center">
          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="text-center lg:text-left"
          >
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass text-sm text-white/70 mb-8"
            >
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              +500 lojas ativas hoje
            </motion.div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-extrabold leading-[1.1] tracking-tight mb-6">
              Sua Loja Online em{' '}
              <span className="text-gold-gradient">Minutos.</span>
              <br />
              Vendas para Sempre.
            </h1>

            <p className="text-lg text-white/50 max-w-xl mx-auto lg:mx-0 mb-10">
              Crie sua loja profissional com checkout ultrarrápido, pagamentos
              integrados e analytics em tempo real. Tudo o que você precisa para
              vender mais, em um só lugar.
            </p>

            {/* Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <a
                href="#precos"
                className="px-8 py-4 rounded-full bg-gold-gradient text-bg-deep font-bold text-base hover:shadow-gold-lg transition-all duration-300 text-center"
              >
                Criar Loja Grátis
              </a>
              <a
                href="#lojas"
                className="px-8 py-4 rounded-full glass font-semibold text-base hover:bg-white/10 transition-all duration-300 text-center"
              >
                Ver Demonstração
              </a>
            </div>

            {/* Stats */}
            <div className="flex gap-8 mt-12 justify-center lg:justify-start">
              {stats.map((stat) => (
                <div key={stat.label} className="text-center">
                  <div className="text-2xl sm:text-3xl font-bold text-gold-gradient">
                    {stat.value}
                  </div>
                  <div className="text-sm text-white/40 mt-1">{stat.label}</div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Right — Phone Mockups */}
          <motion.div
            initial={{ opacity: 0, x: 60 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="relative h-[500px] hidden lg:block"
          >
            <div className="absolute top-0 left-8">
              <PhoneMockup variant="fashion" delay={0} />
            </div>
            <div className="absolute top-12 left-1/2 -translate-x-1/2 z-10">
              <PhoneMockup variant="beauty" delay={0.5} />
            </div>
            <div className="absolute top-4 right-8">
              <PhoneMockup variant="tech" delay={1} />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
