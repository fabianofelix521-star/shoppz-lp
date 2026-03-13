"use client"

import { motion } from "framer-motion"
import { MessageCircle, ArrowRight, ShoppingBag, TrendingUp, Star } from "lucide-react"
import PhoneMockup from "./PhoneMockup"

const WHATSAPP_URL =
  "https://wa.me/5511999999999?text=Olá! Quero criar minha loja online premium com a Shoppz Digital."

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, delay: i * 0.15 },
  }),
}

const stats = [
  { icon: ShoppingBag, label: "500+ Lojas Online Criadas" },
  { icon: TrendingUp, label: "R$10M+ Faturamento dos Clientes" },
  { icon: TrendingUp, label: "350% Aumento Médio em Vendas" },
  { icon: Star, label: "98% Taxa de Satisfação" },
]

export default function Hero() {
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
                Loja Premium em 7 Dias
              </span>
            </motion.div>

            <motion.h1
              custom={1}
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight"
            >
              Sua Loja Online Premium
              <br />
              <span className="text-gold-gradient">que Realmente Vende</span>
            </motion.h1>

            <motion.p
              custom={2}
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              className="mt-6 text-lg text-white/60 max-w-lg"
            >
              Design exclusivo, integração completa e suporte especializado.
              Transformamos sua visão em resultados reais com tecnologia de ponta.
            </motion.p>

            <motion.div
              custom={3}
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              className="mt-8 flex flex-wrap gap-4"
            >
              <a
                href={WHATSAPP_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-gold-gradient text-black font-bold hover:shadow-gold-lg transition-all duration-300 hover:scale-105"
              >
                <MessageCircle size={20} />
                Criar Minha Loja Agora
              </a>
              <a
                href="#portfolio"
                className="inline-flex items-center gap-2 px-8 py-4 rounded-full glass text-white font-semibold hover:border-gold/40 transition-all duration-300"
              >
                Ver Cases de Sucesso
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
              {[
                { value: "500+", label: "LOJAS CRIADAS" },
                { value: "R$10M+", label: "FATURAMENTO CLIENTES" },
                { value: "98%", label: "SATISFAÇÃO" },
              ].map((stat) => (
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
            <PhoneMockup
              storeName="LUXE STORE"
              category="Fashion & Lifestyle"
              imageUrl="https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=400&h=600&fit=crop&q=80"
              price="R$ 299"
              delay={0}
              className="mt-16"
            />
            <PhoneMockup
              storeName="TECH SHOP"
              category="Eletrônicos"
              imageUrl="https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&h=600&fit=crop&q=80"
              price="R$ 499"
              delay={0.3}
              className="-mt-8"
            />
            <PhoneMockup
              storeName="GLOW BEAUTY"
              category="Cosméticos"
              imageUrl="https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=400&h=600&fit=crop&q=80"
              price="R$ 189"
              delay={0.6}
              className="mt-24"
            />
          </div>
        </div>
      </div>

      {/* Stats Bar */}
      <div className="absolute bottom-0 left-0 right-0 border-t border-white/5 bg-black/40 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 py-6">
            {stats.map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="flex items-center gap-3"
              >
                <stat.icon size={20} className="text-gold shrink-0" />
                <span className="text-xs text-white/60">{stat.label}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
