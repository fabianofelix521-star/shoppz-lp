'use client'

import { motion } from 'framer-motion'
import { Star } from 'lucide-react'

interface StoreCard {
  name: string
  category: string
  revenue: string
  orders: string
  rating: string
  gradient: string
  accentBg: string
}

const stores: StoreCard[] = [
  {
    name: 'Moda Luxo',
    category: 'Moda',
    revenue: 'R$45.000/mês',
    orders: '320 pedidos',
    rating: '4.9',
    gradient: 'from-[#1a1a3e] to-[#0d0d2b]',
    accentBg: 'bg-gold/15',
  },
  {
    name: 'Beauty Store',
    category: 'Beleza',
    revenue: 'R$28.000/mês',
    orders: '180 pedidos',
    rating: '5.0',
    gradient: 'from-[#2d1a2e] to-[#1a0d1e]',
    accentBg: 'bg-pink-500/15',
  },
  {
    name: 'Tech & Gadgets',
    category: 'Tecnologia',
    revenue: 'R$67.000/mês',
    orders: '430 pedidos',
    rating: '4.8',
    gradient: 'from-[#0d2818] to-[#0a1a10]',
    accentBg: 'bg-emerald-500/15',
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

export default function StoresShowcase() {
  return (
    <section id="lojas" className="py-24 lg:py-32">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold mb-4">
            Lojas que já vendem na{' '}
            <span className="text-gold-gradient">Shoppz</span>
          </h2>
          <p className="text-white/40 text-lg max-w-2xl mx-auto">
            Resultados reais de lojistas que transformaram seus negócios.
          </p>
        </motion.div>

        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6"
        >
          {stores.map((store) => (
            <motion.div
              key={store.name}
              variants={item}
              className="rounded-2xl glass glass-hover transition-all duration-300 overflow-hidden"
            >
              {/* Mini Phone Preview */}
              <div
                className={`h-40 bg-gradient-to-br ${store.gradient} flex items-center justify-center relative`}
              >
                <div className="w-20 rounded-2xl border border-white/10 overflow-hidden shadow-phone">
                  <div className="h-2 bg-black" />
                  <div className={`h-28 ${store.accentBg} p-2 space-y-1.5`}>
                    <div className="h-6 rounded bg-white/10" />
                    <div className="h-4 rounded bg-white/5" />
                    <div className="h-4 w-2/3 rounded bg-white/5" />
                    <div className="h-5 rounded-full bg-white/10 mt-2" />
                  </div>
                </div>
                <span className="absolute top-3 left-3 px-3 py-1 rounded-full text-[11px] font-medium bg-white/10 text-white/70 backdrop-blur-sm">
                  {store.category}
                </span>
              </div>

              {/* Info */}
              <div className="p-5">
                <h3 className="text-lg font-bold mb-3">{store.name}</h3>
                <div className="flex items-center justify-between text-sm">
                  <div>
                    <div className="text-gold font-semibold">
                      {store.revenue}
                    </div>
                    <div className="text-white/40 text-xs mt-0.5">
                      {store.orders}
                    </div>
                  </div>
                  <div className="flex items-center gap-1">
                    <Star className="w-4 h-4 fill-gold text-gold" />
                    <span className="text-white/70 font-medium">
                      {store.rating}
                    </span>
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
