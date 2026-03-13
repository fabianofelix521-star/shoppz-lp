'use client'

import { motion } from 'framer-motion'
import {
  Zap,
  Smartphone,
  Package,
  BarChart3,
  CreditCard,
  Headphones,
} from 'lucide-react'

const features = [
  {
    icon: Zap,
    title: 'Checkout Ultrarrápido',
    desc: 'Converta mais visitantes em clientes com um processo de compra simples e rápido.',
  },
  {
    icon: Smartphone,
    title: 'Design 100% Responsivo',
    desc: 'Perfeito em qualquer dispositivo — celular, tablet ou desktop.',
  },
  {
    icon: Package,
    title: 'Gestão de Estoque',
    desc: 'Controle seus produtos facilmente com alertas e relatórios automáticos.',
  },
  {
    icon: BarChart3,
    title: 'Analytics em Tempo Real',
    desc: 'Dados que revelam oportunidades e ajudam você a crescer mais rápido.',
  },
  {
    icon: CreditCard,
    title: 'Pagamentos Integrados',
    desc: 'Pix, cartão, boleto. Tudo em um lugar, com recebimento rápido.',
  },
  {
    icon: Headphones,
    title: 'Suporte 24/7',
    desc: 'Time especializado sempre disponível para resolver qualquer dúvida.',
  },
]

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1 } },
}

const item = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5 } },
}

export default function Features() {
  return (
    <section id="recursos" className="py-24 lg:py-32">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold mb-4">
            Tudo que você precisa para{' '}
            <span className="text-gold-gradient">vender online</span>
          </h2>
          <p className="text-white/40 text-lg max-w-2xl mx-auto">
            Ferramentas poderosas para criar, gerenciar e escalar sua loja
            digital.
          </p>
        </motion.div>

        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {features.map((f) => (
            <motion.div
              key={f.title}
              variants={item}
              className="group p-6 rounded-2xl glass glass-hover transition-all duration-300 cursor-default"
            >
              <div className="w-12 h-12 rounded-xl bg-navy-gradient flex items-center justify-center mb-5 group-hover:shadow-gold transition-shadow">
                <f.icon className="w-6 h-6 text-gold" />
              </div>
              <h3 className="text-lg font-bold mb-2">{f.title}</h3>
              <p className="text-sm text-white/50 leading-relaxed">{f.desc}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
