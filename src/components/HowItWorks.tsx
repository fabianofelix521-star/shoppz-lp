'use client'

import { motion } from 'framer-motion'
import { ClipboardList, Palette, Rocket } from 'lucide-react'

const steps = [
  {
    num: '01',
    icon: ClipboardList,
    title: 'Crie sua conta',
    desc: 'Cadastro gratuito em 2 minutos. Sem burocracia.',
  },
  {
    num: '02',
    icon: Palette,
    title: 'Configure sua loja',
    desc: 'Escolha um template e personalize com sua marca.',
  },
  {
    num: '03',
    icon: Rocket,
    title: 'Comece a vender',
    desc: 'Publique e receba seus primeiros pedidos hoje.',
  },
]

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.2 } },
}

const item = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5 } },
}

export default function HowItWorks() {
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
            Como <span className="text-gold-gradient">funciona</span>
          </h2>
          <p className="text-white/40 text-lg max-w-2xl mx-auto">
            Três passos simples para colocar sua loja no ar.
          </p>
        </motion.div>

        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-3 gap-8 relative"
        >
          {/* Dashed line connecting steps — desktop only */}
          <div className="hidden md:block absolute top-24 left-[20%] right-[20%] h-px border-t-2 border-dashed border-gold/20" />

          {steps.map((step) => (
            <motion.div
              key={step.num}
              variants={item}
              className="relative text-center"
            >
              <div className="text-6xl sm:text-7xl font-black text-gold/10 mb-4 select-none">
                {step.num}
              </div>
              <div className="w-16 h-16 rounded-2xl bg-navy-gradient flex items-center justify-center mx-auto mb-5 shadow-gold">
                <step.icon className="w-7 h-7 text-gold" />
              </div>
              <h3 className="text-xl font-bold mb-2">{step.title}</h3>
              <p className="text-white/40 text-sm max-w-xs mx-auto">
                {step.desc}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
