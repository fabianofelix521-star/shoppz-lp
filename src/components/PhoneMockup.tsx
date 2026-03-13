interface PhoneMockupProps {
  variant: 'fashion' | 'beauty' | 'tech'
  delay?: number
  className?: string
}

const variantStyles = {
  fashion: {
    bg: 'bg-gradient-to-br from-[#1a1a3e] to-[#0d0d2b]',
    accent: 'bg-gold/20 border-gold/30',
    items: (
      <>
        <div className="h-24 rounded-xl bg-gradient-to-br from-gold/20 to-gold/5 border border-gold/20" />
        <div className="flex gap-2">
          <div className="h-16 flex-1 rounded-lg bg-gold/10 border border-gold/15" />
          <div className="h-16 flex-1 rounded-lg bg-gold/10 border border-gold/15" />
        </div>
        <div className="h-8 w-full rounded-full bg-gold-gradient opacity-80" />
      </>
    ),
  },
  beauty: {
    bg: 'bg-gradient-to-br from-[#2d1a2e] to-[#1a0d1e]',
    accent: 'bg-pink-500/20 border-pink-500/30',
    items: (
      <>
        <div className="flex justify-center gap-3">
          <div className="w-14 h-14 rounded-full bg-pink-500/20 border border-pink-500/25" />
          <div className="w-14 h-14 rounded-full bg-pink-400/20 border border-pink-400/25" />
          <div className="w-14 h-14 rounded-full bg-pink-300/20 border border-pink-300/25" />
        </div>
        <div className="h-20 rounded-xl bg-gradient-to-br from-pink-500/15 to-pink-600/5 border border-pink-500/15" />
        <div className="h-8 w-full rounded-full bg-gradient-to-r from-pink-500 to-pink-400 opacity-70" />
      </>
    ),
  },
  tech: {
    bg: 'bg-gradient-to-br from-[#0d2818] to-[#0a1a10]',
    accent: 'bg-emerald-500/20 border-emerald-500/30',
    items: (
      <>
        <div className="h-28 rounded-xl bg-gradient-to-br from-emerald-500/15 to-emerald-700/5 border border-emerald-500/15" />
        <div className="flex gap-2">
          <div className="h-12 flex-1 rounded-lg bg-emerald-500/10 border border-emerald-500/10" />
          <div className="h-12 flex-1 rounded-lg bg-emerald-500/10 border border-emerald-500/10" />
        </div>
        <div className="h-8 w-full rounded-full bg-gradient-to-r from-emerald-500 to-emerald-400 opacity-70" />
      </>
    ),
  },
}

export default function PhoneMockup({
  variant,
  delay = 0,
  className = '',
}: PhoneMockupProps) {
  const style = variantStyles[variant]

  return (
    <div
      className={`w-[200px] rounded-[32px] border border-gold/20 shadow-phone overflow-hidden ${className}`}
      style={{ animation: `float 6s ease-in-out ${delay}s infinite` }}
    >
      {/* Notch */}
      <div className={`relative ${style.bg} p-3 pt-0`}>
        <div className="flex justify-center pt-2 pb-3">
          <div className="w-20 h-5 bg-black rounded-b-2xl" />
        </div>

        {/* Screen Content */}
        <div className="flex flex-col gap-3 pb-4">{style.items}</div>

        {/* Bottom Bar */}
        <div className="flex justify-center pb-2">
          <div className="w-24 h-1 rounded-full bg-white/20" />
        </div>
      </div>
    </div>
  )
}
