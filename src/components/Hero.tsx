"use client";

import { motion } from "framer-motion";
import {
  MessageCircle,
  ArrowRight,
  ShoppingBag,
  TrendingUp,
  Star,
} from "lucide-react";
import PhoneMockup from "./PhoneMockup";
import { SiteContent } from "@/lib/types";

interface HeroProps {
  data: SiteContent["hero"];
}

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, delay: i * 0.15 },
  }),
};

const statsBarIcons = [ShoppingBag, TrendingUp, TrendingUp, Star];

export default function Hero({ data }: HeroProps) {
  const phoneClassNames = ["mt-16", "-mt-8", "mt-24"];
  const phoneDelays = [0, 0.3, 0.6];

  return (
    <section className="relative min-h-screen flex items-center pt-20 overflow-hidden">
      {/* Background grid */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(212,175,55,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(212,175,55,0.03)_1px,transparent_1px)] bg-[size:60px_60px]" />

      {/* Glow orbs */}
      <div className="absolute top-20 left-1/4 w-[500px] h-[500px] bg-gold/5 rounded-full blur-[120px]" />
      <div className="absolute bottom-20 right-1/4 w-[400px] h-[400px] bg-gold/5 rounded-full blur-[100px]" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div>
            <motion.div
              custom={0}
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-gold/30 bg-gold/5 mb-8"
            >
              <span className="w-2 h-2 rounded-full bg-gold animate-pulse" />
              <span className="text-gold text-xs font-semibold tracking-widest uppercase">
                {data.badge}
              </span>
            </motion.div>

            <motion.h1
              custom={1}
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight"
            >
              {data.titleLine1}
              <br />
              <span className="text-gold-gradient">{data.titleLine2}</span>
            </motion.h1>

            <motion.p
              custom={2}
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              className="mt-6 text-lg text-white/60 max-w-lg"
            >
              {data.description}
            </motion.p>

            <motion.div
              custom={3}
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              className="mt-8 flex flex-wrap gap-4"
            >
              <a
                href={data.whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-gold-gradient text-black font-bold hover:shadow-gold-lg transition-all duration-300 hover:scale-105"
              >
                <MessageCircle size={20} />
                {data.ctaPrimaryText}
              </a>
              <a
                href="#portfolio"
                className="inline-flex items-center gap-2 px-8 py-4 rounded-full glass text-white font-semibold hover:border-gold/40 transition-all duration-300"
              >
                {data.ctaSecondaryText}
                <ArrowRight size={18} />
              </a>
            </motion.div>

            {/* Mini stats */}
            <motion.div
              custom={4}
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              className="mt-12 flex flex-wrap gap-8"
            >
              {data.stats.map((stat) => (
                <div key={stat.label}>
                  <p className="text-2xl font-bold text-gold">{stat.value}</p>
                  <p className="text-[10px] text-white/40 tracking-widest uppercase mt-1">
                    {stat.label}
                  </p>
                </div>
              ))}
            </motion.div>
          </div>

          {/* Right — Phone Mockups */}
          <div className="hidden lg:flex items-center justify-center gap-4 relative">
            {data.phones.map((phone, i) => (
              <PhoneMockup
                key={phone.storeName}
                storeName={phone.storeName}
                category={phone.category}
                imageUrl={phone.imageUrl}
                price={phone.price}
                delay={phoneDelays[i] ?? 0}
                className={phoneClassNames[i] ?? ""}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Stats Bar */}
      <div className="absolute bottom-0 left-0 right-0 border-t border-white/5 bg-black/40 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 py-6">
            {data.statsBar.map((stat, i) => {
              const Icon = statsBarIcons[i] ?? Star;
              return (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="flex items-center gap-3"
                >
                  <Icon size={20} className="text-gold shrink-0" />
                  <span className="text-xs text-white/60">{stat.label}</span>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
