const brands = [
  'MODAHUB',
  'BEAUTYLUX',
  'TECHVERSE',
  'STILO',
  'GLOWUP',
  'SHOPNOW',
  'LUXSTORE',
  'TRENDIFY',
]

export default function Marquee() {
  return (
    <section className="py-16 border-y border-white/5">
      <p className="text-center text-sm text-white/30 uppercase tracking-widest mb-8">
        Confiado por marcas que crescem
      </p>

      <div
        className="relative overflow-hidden"
        style={{
          maskImage:
            'linear-gradient(to right, transparent, black 10%, black 90%, transparent)',
          WebkitMaskImage:
            'linear-gradient(to right, transparent, black 10%, black 90%, transparent)',
        }}
      >
        <div className="flex animate-marquee w-max">
          {[...brands, ...brands].map((brand, i) => (
            <div
              key={`${brand}-${i}`}
              className="mx-4 px-8 py-3 rounded-full glass text-white/40 text-sm font-medium tracking-wider whitespace-nowrap"
            >
              {brand}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
