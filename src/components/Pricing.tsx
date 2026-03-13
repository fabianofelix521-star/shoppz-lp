'use client'

import { motion } from 'framer-motion'
import { Check } from 'lucide-react'

interface Plan {
  name: string
  price: string
  popular: boolean
  features: string[]
  cta: string
}

const plans: Plan[] = [
  {
    name: 'Starter',
    price: 'R$97',
    popular: false,
    features: [
      '1 loja online',
      'Até 100 produtos',
      'Checkout padrão',
      'Suporte por email',
      'SSL gratuito',
    ],
    cta: 'Começar Agora',
  },
  {
    name: 'Pro',
    price: 'R$197',
    popular: true,
    features: [
      '3 lojas online',
      'Produtos ilimitados',
      'Analytics avançado',
      'Suporte prioritário',
      'Domínio personalizado grátis',
      'Checkout personalizado',
      'Integrações premium',
    ],
    cta: 'Escolher Pro',
  },
  {
    name: 'Enterprise',
    price: 'R$397',
    popular: false,
    features: [
      'Lojas ilimitadas',
      'API access completo',
      'Manager dedicado',
      'SLA 99.9%',
      'Integrações customizadas',
      'Relatórios sob medida',
      'Onboarding VIP',
    ],
    cta: 'Falar com Vendas',
  },
]

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12 } },
}

const item = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5 } },
}

export default function Pricing() {
  return (
    <section id="precos" className="py-24 lg:py-32">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold mb-4">
            Planos que cabem no seu{' '}
            <span className="text-gold-gradient">bolso</span>
          </h2>
          <p className="text-white/40 text-lg max-w-2xl mx-auto">
            Comece grátis por 14 dias. Cancele quando quiser.
          </p>
        </motion.div>

        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 items-start"
        >
          {plans.map((plan) => (
            <motion.div
              key={plan.name}
              variants={item}
              className={`relative rounded-2xl p-7 transition-all duration-300 ${
                plan.popular
                  ? 'glass border-gold/40 shadow-gold-lg scale-[1.02] md:-mt-4 md:mb-4'
                  : 'glass glass-hover'
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-gold-gradient text-bg-deep text-xs font-bold uppercase tracking-wider">
                  Popular
                </div>
              )}

              <h3 className="text-xl font-bold mb-1">{plan.name}</h3>
              <div className="flex items-baseline gap-1 mb-6">
                <span className="text-4xl font-extrabold text-gold-gradient">
                  {plan.price}
                </span>
                <span className="text-white/40 text-sm">/mês</span>
              </div>

              <ul className="space-y-3 mb-8">
                {plan.features.map((feature) => (
                  <li
                    key={feature}
                    className="flex items-center gap-3 text-sm text-white/70"
                  >
                    <Check className="w-4 h-4 text-gold flex-shrink-0" />
                    {feature}
                  </li>
                ))}
              </ul>

              <a
                href="#"
                className={`block w-full py-3.5 rounded-full text-center font-semibold text-sm transition-all duration-300 ${
                  plan.popular
                    ? 'bg-gold-gradient text-bg-deep hover:shadow-gold-lg'
                    : 'glass hover:bg-white/10'
                }`}
              >
                {plan.cta}
              </a>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
