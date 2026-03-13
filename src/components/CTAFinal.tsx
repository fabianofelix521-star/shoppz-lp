"use client";

import { motion } from "framer-motion";
import { MessageCircle } from "lucide-react";
import { SiteContent } from "@/lib/types";

interface CTAFinalProps {
  data: SiteContent["ctaFinal"];
}

export default function CTAFinal({ data }: CTAFinalProps) {
  return (
    <section id="contact" className="py-24 relative overflow-hidden">
      {/* Glow orb */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gold/10 rounded-full blur-[150px]" />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="glass rounded-3xl p-12 md:p-16 text-center"
        >
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6">
            {data.titleLine1}
            <br />
            <span className="text-gold-gradient">{data.titleLine2}</span>
          </h2>
          <p className="text-white/50 max-w-xl mx-auto mb-10 text-lg">
            {data.subtitle}
          </p>
          <a
            href={data.whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 px-10 py-5 rounded-full bg-gold-gradient text-black font-bold text-lg hover:shadow-gold-lg transition-all duration-300 hover:scale-105"
          >
            <MessageCircle size={24} />
            {data.buttonText}
          </a>
        </motion.div>
      </div>
    </section>
  );
}
