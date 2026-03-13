"use client"

import { motion } from "framer-motion"

interface PhoneMockupProps {
  storeName: string
  category: string
  imageUrl: string
  price: string
  className?: string
  delay?: number
}

export default function PhoneMockup({
  storeName,
  category,
  imageUrl,
  price,
  className = "",
  delay = 0,
}: PhoneMockupProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay }}
      className={`relative ${className}`}
    >
      <motion.div
        animate={{ y: [0, -12, 0] }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay }}
        className="w-[200px] h-[400px] rounded-[2.5rem] border-2 border-white/20 bg-black overflow-hidden shadow-phone relative"
      >
        {/* Notch */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-24 h-6 bg-black rounded-b-2xl z-20" />

        {/* Store name */}
        <div className="absolute top-8 left-0 right-0 z-10 text-center">
          <p className="text-[10px] font-bold tracking-widest text-white/90 uppercase">
            {storeName}
          </p>
          <p className="text-[8px] text-white/50 uppercase tracking-wider">
            {category}
          </p>
        </div>

        {/* Product Image */}
        <img
          src={imageUrl}
          alt={storeName}
          loading="lazy"
          className="w-full h-full object-cover"
        />

        {/* Bottom overlay */}
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent p-4 z-10">
          <p className="text-xs text-white/70">A partir de</p>
          <p className="text-lg font-bold text-white">{price}</p>
          <button className="mt-2 w-full py-2 rounded-full bg-gold-gradient text-black text-xs font-bold uppercase tracking-wider">
            Comprar
          </button>
        </div>
      </motion.div>
    </motion.div>
  )
}
