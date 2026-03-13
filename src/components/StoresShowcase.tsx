"use client"

import { motion } from "framer-motion"

const stores = [
  {
    name: "Loja de Moda",
    badge: "FASHION & LIFESTYLE",
    image:
      "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=800&h=600&fit=crop&q=80",
    sales: "+280%",
    visits: "15K/mês",
  },
  {
    name: "Tech Store",
    badge: "ELETRÔNICOS",
    image:
      "https://images.unsplash.com/photo-1472851294608-062f824d29cc?w=800&h=600&fit=crop&q=80",
    sales: "+350%",
    visits: "22K/mês",
  },
  {
    name: "Beauty Shop",
    badge: "COSMÉTICOS",
    image:
      "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?w=800&h=600&fit=crop&q=80",
    sales: "+420%",
    visits: "18K/mês",
  },
  {
    name: "Home Decor",
    badge: "DECORAÇÃO",
    image:
      "https://images.unsplash.com/photo-1484101403633-562f891dc89a?w=800&h=600&fit=crop&q=80",
    sales: "+190%",
    visits: "12K/mês",
  },
  {
    name: "Fitness Store",
    badge: "ESPORTES",
    image:
      "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=800&h=600&fit=crop&q=80",
    sales: "+310%",
    visits: "19K/mês",
  },
  {
    name: "Pet Shop",
    badge: "ANIMAIS",
    image:
      "https://images.unsplash.com/photo-1450778869180-41d0601e046e?w=800&h=600&fit=crop&q=80",
    sales: "+265%",
    visits: "14K/mês",
  },
]

export default function StoresShowcase() {
  return (
    <section id="portfolio" className="py-24 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <motion.span
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-gold text-xs font-semibold tracking-[0.3em] uppercase"
          >
            Portfólio
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mt-4 text-3xl sm:text-4xl lg:text-5xl font-bold"
          >
            Lojas Premium que Vendem
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="mt-4 text-white/50 max-w-2xl mx-auto"
          >
            Veja alguns exemplos de lojas criadas com nossa plataforma e os
            resultados impressionantes.
          </motion.p>
        </div>

        {/* Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {stores.map((store, i) => (
            <motion.div
              key={store.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="group relative rounded-2xl overflow-hidden cursor-pointer"
            >
              {/* Image */}
              <div className="aspect-[4/3] overflow-hidden">
                <img
                  src={store.image}
                  alt={store.name}
                  loading="lazy"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
              </div>

              {/* Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />

              {/* Category badge */}
              <div className="absolute top-4 left-4">
                <span className="px-3 py-1 rounded-full text-[10px] font-semibold tracking-wider bg-gold/20 text-gold border border-gold/30 uppercase">
                  {store.badge}
                </span>
              </div>

              {/* Content */}
              <div className="absolute bottom-0 left-0 right-0 p-6">
                <h3 className="text-xl font-bold mb-3">{store.name}</h3>
                <div className="flex gap-3">
                  <span className="px-3 py-1.5 rounded-lg glass text-xs font-semibold">
                    <span className="text-gold">VENDAS</span>{" "}
                    <span className="text-white">{store.sales}</span>
                  </span>
                  <span className="px-3 py-1.5 rounded-lg glass text-xs font-semibold">
                    <span className="text-gold">VISITAS</span>{" "}
                    <span className="text-white">{store.visits}</span>
                  </span>
                </div>
              </div>

              {/* Hover glow */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 border-2 border-gold/30 rounded-2xl pointer-events-none" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
