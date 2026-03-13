"use client"

import { motion } from "framer-motion"
import { getIcon } from "@/lib/icons"
import { SiteContent } from "@/lib/types"

interface FeaturesProps {
  data: SiteContent["features"]
}

export default function Features({ data }: FeaturesProps) {
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
            {data.sectionLabel}
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mt-4 text-3xl sm:text-4xl lg:text-5xl font-bold"
          >
            {data.title}
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="mt-4 text-white/50 max-w-2xl mx-auto"
          >
            {data.subtitle}
          </motion.p>
        </div>

        {/* Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {data.items.map((f, i) => {
            const Icon = getIcon(f.icon)
            return (
              <motion.div
                key={f.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="glass glass-hover rounded-2xl p-8 transition-all duration-500 group cursor-default"
              >
                <div className="w-14 h-14 rounded-2xl bg-gold/10 flex items-center justify-center mb-6 group-hover:bg-gold/20 transition-colors">
                  <Icon size={28} className="text-gold" />
                </div>
                <h3 className="text-xl font-bold mb-3">{f.title}</h3>
                <p className="text-white/50 text-sm leading-relaxed">{f.description}</p>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
