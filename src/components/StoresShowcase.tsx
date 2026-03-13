"use client";

import { motion } from "framer-motion";
import { SiteContent } from "@/lib/types";

interface StoresShowcaseProps {
  data: SiteContent["portfolio"];
}

export default function StoresShowcase({ data }: StoresShowcaseProps) {
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
          {data.stores.map((store, i) => {
            const hasLink = store.link && store.link !== "#";
            const Wrapper = hasLink ? "a" : "div";
            const linkProps = hasLink
              ? {
                  href: store.link,
                  target: "_blank" as const,
                  rel: "noopener noreferrer",
                }
              : {};

            return (
              <motion.div
                key={store.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
              >
                <Wrapper
                  {...linkProps}
                  className="group relative rounded-2xl overflow-hidden cursor-pointer block"
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
                </Wrapper>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
