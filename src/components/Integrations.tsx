"use client";

import { motion } from "framer-motion";
import { getIcon } from "@/lib/icons";
import { SiteContent } from "@/lib/types";

interface IntegrationsProps {
  data: SiteContent["integrations"];
}

export default function Integrations({ data }: IntegrationsProps) {
  return (
    <section className="py-24 relative">
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

        {/* Integration cards */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-16">
          {data.items.map((item, i) => {
            const Icon = getIcon(item.icon);
            return (
              <motion.div
                key={item.name}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                className="glass glass-hover rounded-2xl p-6 text-center transition-all duration-500 group cursor-default"
              >
                <div className="w-12 h-12 rounded-xl bg-gold/10 flex items-center justify-center mx-auto mb-4 group-hover:bg-gold/20 transition-colors">
                  <Icon size={24} className="text-gold" />
                </div>
                <p className="font-semibold text-sm mb-1">{item.name}</p>
                <p className="text-[11px] text-white/40">{item.description}</p>
              </motion.div>
            );
          })}
        </div>

        {/* Compliance badges */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex flex-wrap justify-center gap-4"
        >
          {data.compliance.map((c) => {
            const Icon = getIcon(c.icon);
            return (
              <div
                key={c.label}
                className="flex items-center gap-2 px-5 py-2.5 rounded-full glass text-xs font-medium text-white/60"
              >
                <Icon size={14} className="text-gold" />
                {c.label}
              </div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
