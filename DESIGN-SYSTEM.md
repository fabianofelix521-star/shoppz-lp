# Shoppz Digital — Design System & Technical Spec

> Landing Page Premium para plataforma SaaS de lojas online.
> Stack: Next.js 14 (App Router) + Tailwind CSS 3.4 + Framer Motion 11

---

## 1. DESIGN TOKENS

### 1.1 Color Palette

| Token             | Value         | Usage                          |
|-------------------|---------------|--------------------------------|
| `bg-primary`      | `#0A0A0A`     | Page background                |
| `bg-surface`      | `#111111`     | Card backgrounds               |
| `bg-surface-2`    | `#1A1A1A`     | Elevated surfaces              |
| `gold`            | `#D4AF37`     | Primary accent, CTAs           |
| `gold-light`      | `#F5D779`     | Hover states, highlights       |
| `gold-dark`       | `#B8942E`     | Active/pressed states          |
| `navy`            | `#1E3A8A`     | Secondary accent               |
| `navy-light`      | `#2563EB`     | Links, secondary CTAs          |
| `text-primary`    | `#FFFFFF`     | Headlines, primary text        |
| `text-secondary`  | `#A1A1AA`     | Body text, descriptions        |
| `text-muted`      | `#71717A`     | Captions, metadata             |
| `border-glass`    | `rgba(212,175,55,0.15)` | Glass card borders   |
| `border-subtle`   | `rgba(255,255,255,0.06)` | Subtle dividers     |

### 1.2 Gradients

```
gold-gradient:       linear-gradient(135deg, #D4AF37 0%, #F5D779 50%, #D4AF37 100%)
gold-text-gradient:  linear-gradient(135deg, #D4AF37 0%, #F5D779 100%)
gold-radial:         radial-gradient(ellipse at 50% 0%, rgba(212,175,55,0.15) 0%, transparent 60%)
navy-gradient:       linear-gradient(135deg, #1E3A8A 0%, #2563EB 100%)
hero-glow:           radial-gradient(ellipse at 30% 20%, rgba(212,175,55,0.08) 0%, transparent 50%),
                     radial-gradient(ellipse at 70% 80%, rgba(30,58,138,0.06) 0%, transparent 50%)
card-shine:          linear-gradient(135deg, rgba(255,255,255,0.03) 0%, transparent 50%, rgba(212,175,55,0.03) 100%)
```

### 1.3 Shadows & Glows

```
shadow-glass:      0 8px 32px rgba(0,0,0,0.24)
shadow-gold:       0 0 20px rgba(212,175,55,0.20), 0 0 60px rgba(212,175,55,0.08)
shadow-gold-lg:    0 0 40px rgba(212,175,55,0.30), 0 0 80px rgba(212,175,55,0.12)
shadow-card:       0 4px 24px rgba(0,0,0,0.32)
shadow-card-hover: 0 8px 40px rgba(0,0,0,0.40), 0 0 20px rgba(212,175,55,0.10)
shadow-phone:      0 20px 60px rgba(0,0,0,0.50), 0 0 30px rgba(212,175,55,0.08)
```

### 1.4 Typography (Inter)

| Element      | Size        | Weight | Line-Height | Letter-Spacing |
|-------------|-------------|--------|-------------|----------------|
| H1 Hero     | 64px/4rem   | 800    | 1.05        | -0.03em        |
| H2 Section  | 40px/2.5rem | 700    | 1.15        | -0.02em        |
| H3 Card     | 22px/1.375rem| 600   | 1.3         | -0.01em        |
| Body Large  | 18px/1.125rem| 400   | 1.6         | 0              |
| Body        | 16px/1rem   | 400    | 1.6         | 0              |
| Caption     | 14px/0.875rem| 400   | 1.5         | 0.01em         |
| Badge       | 12px/0.75rem | 600   | 1           | 0.05em         |
| Nav Link    | 15px/0.9375rem| 500  | 1           | 0.01em         |
| CTA Button  | 16px/1rem   | 600    | 1           | 0.02em         |
| Price Big   | 48px/3rem   | 800    | 1           | -0.02em        |
| Stat Number | 32px/2rem   | 700    | 1           | -0.01em        |

**Mobile overrides:**
- H1: 36px/2.25rem weight 800
- H2: 28px/1.75rem weight 700
- Price Big: 36px/2.25rem

### 1.5 Spacing System

Base unit: 4px. Sections use `py-24 lg:py-32` (96px / 128px). Cards use `p-6 lg:p-8`.

### 1.6 Border Radius

| Element    | Value           |
|-----------|-----------------|
| Cards      | `rounded-2xl` (16px) |
| Buttons    | `rounded-full` (999px) |
| Phone Mockup| `rounded-[2.5rem]` (40px) |
| Inputs     | `rounded-xl` (12px) |
| Badges     | `rounded-full` |
| Avatars    | `rounded-full` |

---

## 2. TAILWIND CONFIG

```js
// tailwind.config.js
const { fontFamily } = require("tailwindcss/defaultTheme");

module.exports = {
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Inter", ...fontFamily.sans],
      },
      colors: {
        bg: { DEFAULT: "#0A0A0A", surface: "#111111", "surface-2": "#1A1A1A" },
        gold: { DEFAULT: "#D4AF37", light: "#F5D779", dark: "#B8942E" },
        navy: { DEFAULT: "#1E3A8A", light: "#2563EB" },
      },
      boxShadow: {
        glass: "0 8px 32px rgba(0,0,0,0.24)",
        gold: "0 0 20px rgba(212,175,55,0.20), 0 0 60px rgba(212,175,55,0.08)",
        "gold-lg": "0 0 40px rgba(212,175,55,0.30), 0 0 80px rgba(212,175,55,0.12)",
        card: "0 4px 24px rgba(0,0,0,0.32)",
        "card-hover": "0 8px 40px rgba(0,0,0,0.40), 0 0 20px rgba(212,175,55,0.10)",
        phone: "0 20px 60px rgba(0,0,0,0.50), 0 0 30px rgba(212,175,55,0.08)",
      },
      backgroundImage: {
        "gold-gradient": "linear-gradient(135deg, #D4AF37 0%, #F5D779 50%, #D4AF37 100%)",
        "gold-text": "linear-gradient(135deg, #D4AF37 0%, #F5D779 100%)",
        "navy-gradient": "linear-gradient(135deg, #1E3A8A 0%, #2563EB 100%)",
        "card-shine": "linear-gradient(135deg, rgba(255,255,255,0.03) 0%, transparent 50%, rgba(212,175,55,0.03) 100%)",
      },
      borderColor: {
        glass: "rgba(212,175,55,0.15)",
        subtle: "rgba(255,255,255,0.06)",
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0px) rotate(0deg)" },
          "50%": { transform: "translateY(-20px) rotate(1deg)" },
        },
        "float-delayed": {
          "0%, 100%": { transform: "translateY(0px) rotate(0deg)" },
          "50%": { transform: "translateY(-14px) rotate(-1deg)" },
        },
        shimmer: {
          "0%": { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
        },
        "glow-pulse": {
          "0%, 100%": { opacity: 0.4, transform: "scale(1)" },
          "50%": { opacity: 1, transform: "scale(1.05)" },
        },
        marquee: {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" },
        },
      },
      animation: {
        float: "float 6s ease-in-out infinite",
        "float-delayed": "float-delayed 7s ease-in-out infinite 1s",
        shimmer: "shimmer 3s linear infinite",
        "glow-pulse": "glow-pulse 3s ease-in-out infinite",
        marquee: "marquee 30s linear infinite",
      },
    },
  },
  plugins: [],
};
```

---

## 3. GLOBAL CSS

```css
/* src/app/globals.css */
@tailwind base;
@tailwind components;
@tailwind utilities;

@import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&display=swap');

@layer base {
  body {
    @apply bg-bg text-white font-sans antialiased;
  }
  ::selection {
    @apply bg-gold/30 text-white;
  }
  /* Custom scrollbar */
  ::-webkit-scrollbar { width: 6px; }
  ::-webkit-scrollbar-track { background: #0A0A0A; }
  ::-webkit-scrollbar-thumb { background: #333; border-radius: 3px; }
  ::-webkit-scrollbar-thumb:hover { background: #D4AF37; }
}

@layer utilities {
  .text-gold-gradient {
    @apply bg-clip-text text-transparent bg-gold-text;
  }
  .glass {
    @apply bg-white/[0.04] backdrop-blur-xl border border-glass rounded-2xl shadow-glass;
  }
  .glass-hover {
    @apply hover:bg-white/[0.07] hover:border-gold/25 hover:shadow-card-hover
           hover:scale-[1.02] hover:-translate-y-1 transition-all duration-300;
  }
  .glass-strong {
    @apply bg-white/[0.08] backdrop-blur-2xl border border-glass rounded-2xl shadow-glass;
  }
  .shimmer-bg {
    background: linear-gradient(90deg, transparent, rgba(212,175,55,0.06), transparent);
    background-size: 200% 100%;
    @apply animate-shimmer;
  }
  .glow-gold {
    @apply shadow-gold;
  }
  .btn-gold {
    @apply bg-gold-gradient text-bg font-semibold px-8 py-3.5 rounded-full
           shadow-gold hover:shadow-gold-lg hover:scale-105
           active:scale-[0.98] transition-all duration-300;
  }
  .btn-gold-outline {
    @apply border border-gold/40 text-gold font-semibold px-8 py-3.5 rounded-full
           hover:bg-gold/10 hover:border-gold/60 hover:shadow-gold
           active:scale-[0.98] transition-all duration-300;
  }
  .section-container {
    @apply max-w-7xl mx-auto px-4 sm:px-6 lg:px-8;
  }
}
```

---

## 4. FRAMER MOTION VARIANTS

```ts
// src/lib/animations.ts

export const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } },
};

export const fadeInDown = {
  hidden: { opacity: 0, y: -20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] } },
};

export const fadeInLeft = {
  hidden: { opacity: 0, x: -30 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } },
};

export const fadeInRight = {
  hidden: { opacity: 0, x: 30 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } },
};

export const scaleIn = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] } },
};

export const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.08, delayChildren: 0.1 },
  },
};

export const staggerContainerSlow = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15, delayChildren: 0.2 },
  },
};

// Phone mockup float variants (each phone has an offset)
export const phoneFloat = (delay: number) => ({
  animate: {
    y: [0, -20, 0],
    rotate: [0, 1, 0],
    transition: { duration: 6, ease: "easeInOut", repeat: Infinity, delay },
  },
});

// Gold shimmer on text
export const shimmerText = {
  animate: {
    backgroundPosition: ["200% 0", "-200% 0"],
    transition: { duration: 4, ease: "linear", repeat: Infinity },
  },
};

// Stats counter spring
export const springIn = {
  hidden: { opacity: 0, scale: 0.5 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { type: "spring", stiffness: 400, damping: 17 },
  },
};

// Navbar scroll transform
export const navbarVariants = {
  top: { backgroundColor: "rgba(10,10,10,0)", backdropFilter: "blur(0px)" },
  scrolled: { backgroundColor: "rgba(10,10,10,0.85)", backdropFilter: "blur(20px)" },
};
```

---

## 5. COMPONENT ARCHITECTURE

```
src/
├── app/
│   ├── globals.css
│   ├── layout.tsx          # <html lang="pt-BR">, font Inter, metadata
│   └── page.tsx            # Landing page (assembles all sections)
├── components/
│   ├── navbar.tsx           # Sticky navbar with glass scroll effect
│   ├── hero.tsx             # Hero section + phone mockups + stats
│   ├── logos-marquee.tsx    # Infinite logos carousel
│   ├── features.tsx         # 6 feature cards grid
│   ├── stores-showcase.tsx  # 3 store preview cards
│   ├── how-it-works.tsx     # 3-step process
│   ├── pricing.tsx          # 3 pricing plans
│   ├── testimonials.tsx     # 3 testimonial cards
│   ├── cta-final.tsx        # Full-width final CTA
│   ├── footer.tsx           # Footer with links + socials
│   ├── ui/
│   │   ├── glass-card.tsx      # Reusable glass card wrapper
│   │   ├── gold-button.tsx     # CTA button (gold gradient)
│   │   ├── section-heading.tsx # H2 + subtitle pattern
│   │   ├── badge.tsx           # Status badge component
│   │   └── phone-mockup.tsx    # Phone frame with screen content
│   └── icons/
│       └── shoppz-logo.tsx     # SVG logo component
└── lib/
    ├── animations.ts        # Framer Motion variants (above)
    └── cn.ts                # clsx + tailwind-merge utility
```

---

## 6. SECTION SPECS

---

### 6.1 NAVBAR — `navbar.tsx`

**Behavior**: Fixed top, transparent on top → glass on scroll (60px threshold). Z-50.

```
┌─────────────────────────────────────────────────────────┐
│  [S] Shoppz    Recursos  Lojas  Preços  Contato   [Criar Loja Grátis] │
└─────────────────────────────────────────────────────────┘
```

**Structure:**
```tsx
<motion.nav
  className="fixed top-0 w-full z-50 transition-all duration-500"
  // toggled class on scroll:
  // scrolled: "bg-bg/85 backdrop-blur-xl border-b border-subtle shadow-glass"
  // top: "bg-transparent"
>
  <div className="section-container flex items-center justify-between h-16 lg:h-20">
    {/* Logo */}
    <a className="flex items-center gap-2">
      <span className="text-gold text-2xl font-black">S</span>
      <span className="text-white text-xl font-bold tracking-tight">hoppz</span>
    </a>

    {/* Nav Links — hidden mobile, flex desktop */}
    <div className="hidden lg:flex items-center gap-8">
      {["Recursos", "Lojas", "Preços", "Contato"].map(link => (
        <a className="text-[15px] font-medium text-zinc-400
                       hover:text-gold transition-colors duration-200">{link}</a>
      ))}
    </div>

    {/* CTA */}
    <button className="btn-gold text-sm hidden sm:block">
      Criar Loja Grátis
    </button>

    {/* Mobile hamburger — sm:block lg:hidden */}
    <button className="lg:hidden text-white">
      <Menu size={24} />
    </button>
  </div>
</motion.nav>
```

**Scroll detection**: `useEffect` + `useState(scrolled)` at 60px.

---

### 6.2 HERO — `hero.tsx`

**Layout**: 2-column on desktop. Left = text + stats. Right = 3 phone mockups stacked/overlapping.

```
┌──────────────────────────────────────────────────────────────┐
│                                                              │
│  [🟢 +500 lojas ativas]                    ╭──────╮         │
│                                             │ PHONE│ ╭────╮  │
│  Venda Mais com uma                    ╭────│  1   │ │ PH │  │
│  Loja Online                           │ PH │      │ │ 3  │  │
│  Premium                               │ 2  │      │ │    │  │
│                                        │    ╰──────╯ │    │  │
│  Descrição texto cinza...              ╰────╯        ╰────╯  │
│                                                              │
│  [Criar Loja Grátis]  [Ver Demonstração]                     │
│                                                              │
│  R$12M vendas  •  500+ lojistas  •  98% satisfação           │
│                                                              │
│  ─── gradient divider gold ────────────────────              │
└──────────────────────────────────────────────────────────────┘
```

**Classes & Structure:**
```tsx
<section className="relative min-h-screen flex items-center pt-20 overflow-hidden">
  {/* Background glow orbs */}
  <div className="absolute inset-0 pointer-events-none">
    <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-gold/5 rounded-full blur-[120px]" />
    <div className="absolute bottom-1/3 right-1/4 w-80 h-80 bg-navy/8 rounded-full blur-[100px]" />
  </div>

  <div className="section-container relative z-10">
    <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
      {/* LEFT — Text */}
      <motion.div variants={staggerContainer} initial="hidden" animate="visible">

        {/* Badge */}
        <motion.div variants={fadeInUp}
          className="inline-flex items-center gap-2 glass px-4 py-2 rounded-full mb-6">
          <span className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse" />
          <span className="text-xs font-semibold text-zinc-300 tracking-wide uppercase">
            +500 lojas ativas
          </span>
        </motion.div>

        {/* H1 */}
        <motion.h1 variants={fadeInUp}
          className="text-4xl sm:text-5xl lg:text-[64px] font-extrabold leading-[1.05]
                     tracking-[-0.03em]">
          Venda Mais com uma{" "}
          <span className="text-gold-gradient">Loja Online Premium</span>
        </motion.h1>

        {/* Subtitle */}
        <motion.p variants={fadeInUp}
          className="mt-6 text-lg text-zinc-400 leading-relaxed max-w-lg">
          Crie sua loja online em minutos. Design premium, checkout rápido
          e tudo que você precisa para vender mais.
        </motion.p>

        {/* CTAs */}
        <motion.div variants={fadeInUp} className="flex flex-wrap gap-4 mt-8">
          <button className="btn-gold">Criar Loja Grátis</button>
          <button className="btn-gold-outline">Ver Demonstração</button>
        </motion.div>

        {/* Stats row */}
        <motion.div variants={fadeInUp}
          className="flex flex-wrap gap-8 mt-10 pt-8 border-t border-subtle">
          {[
            { value: "R$12M", label: "em vendas" },
            { value: "500+", label: "lojistas" },
            { value: "98%", label: "satisfação" },
          ].map(stat => (
            <div key={stat.label}>
              <span className="text-2xl lg:text-3xl font-bold text-gold">{stat.value}</span>
              <p className="text-sm text-zinc-500 mt-1">{stat.label}</p>
            </div>
          ))}
        </motion.div>
      </motion.div>

      {/* RIGHT — Phone Mockups */}
      <div className="relative h-[500px] lg:h-[600px] hidden sm:block">
        {/* Phone mockups positioned absolutely, overlapping */}
        <PhoneMockup
          className="absolute left-0 top-8 z-20"
          store="moda" delay={0}
        />
        <PhoneMockup
          className="absolute left-[140px] lg:left-[160px] top-0 z-30"
          store="cosmeticos" delay={0.5}
        />
        <PhoneMockup
          className="absolute left-[260px] lg:left-[300px] top-16 z-10"
          store="eletronicos" delay={1}
        />
      </div>
    </div>
  </div>
</section>
```

---

### 6.3 PHONE MOCKUP — `ui/phone-mockup.tsx`

**Pure CSS phone with notch:**

```tsx
<motion.div
  variants={phoneFloat(delay)}
  animate="animate"
  className={cn("w-[200px] lg:w-[240px] shadow-phone", className)}
>
  {/* Phone Frame */}
  <div className="relative bg-bg-surface rounded-[2.5rem] p-2 border border-white/10">
    {/* Notch */}
    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-28 h-6
                    bg-bg-surface rounded-b-2xl z-10 flex items-center justify-center">
      <div className="w-16 h-1 bg-zinc-800 rounded-full" />
    </div>

    {/* Screen */}
    <div className="relative bg-bg-surface-2 rounded-[2rem] overflow-hidden aspect-[9/19.5]">
      {/* Store header bar */}
      <div className="h-12 bg-gradient-to-r from-gold/20 to-navy/20
                      flex items-center justify-center">
        <span className="text-xs font-bold text-white/80">{storeName}</span>
      </div>

      {/* Product placeholder grid */}
      <div className="p-3 grid grid-cols-2 gap-2">
        {[1,2,3,4].map(i => (
          <div key={i} className="aspect-square rounded-xl bg-white/5 shimmer-bg" />
        ))}
      </div>

      {/* Price tag */}
      <div className="px-3 mt-1">
        <div className="h-3 w-20 bg-gold/20 rounded-full" />
        <div className="h-2 w-14 bg-white/10 rounded-full mt-1.5" />
      </div>

      {/* Bottom CTA bar */}
      <div className="absolute bottom-0 inset-x-0 p-3">
        <div className="h-8 bg-gold-gradient rounded-full flex items-center justify-center">
          <span className="text-[10px] font-bold text-bg">Comprar Agora</span>
        </div>
      </div>
    </div>
  </div>
</motion.div>
```

**Variações por store:**
- **moda**: header gradient `from-rose-500/20 to-pink-500/20`, product placeholders com aspect-[3/4]
- **cosmeticos**: header gradient `from-violet-500/20 to-fuchsia-500/20`, circular product shapes
- **eletronicos**: header gradient `from-blue-500/20 to-cyan-500/20`, landscape product shapes

---

### 6.4 LOGOS MARQUEE — `logos-marquee.tsx`

**Infinite horizontal scroll marquee, duplicated for seamless loop.**

```tsx
<section className="py-16 border-y border-subtle overflow-hidden">
  <div className="section-container mb-8">
    <p className="text-center text-sm font-medium text-zinc-500 uppercase tracking-widest">
      Confiado por marcas como
    </p>
  </div>

  <div className="relative">
    {/* Fade edges */}
    <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-bg to-transparent z-10" />
    <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-bg to-transparent z-10" />

    <div className="flex animate-marquee">
      {/* 2x logos array for seamless loop */}
      {[...logos, ...logos].map((logo, i) => (
        <div key={i} className="flex-shrink-0 mx-12 flex items-center justify-center
                                 w-28 h-10 opacity-30 hover:opacity-70 transition-opacity">
          {/* Placeholder: pills with brand name text */}
          <span className="text-sm font-semibold text-zinc-500">{logo}</span>
        </div>
      ))}
    </div>
  </div>
</section>
```

**Logos placeholder**: `["Nike", "Apple", "Zara", "Samsung", "Adidas", "Shein", "Amazon", "Magalu"]`

---

### 6.5 FEATURES — `features.tsx`

**6 cards in responsive grid: 1col mobile → 2col tablet → 3col desktop.**

```
┌──────────────────────────────────────────────────────┐
│                                                      │
│      Por que escolher a Shoppz?                      │
│      Tudo que você precisa em um só lugar             │
│                                                      │
│  ┌─────────┐  ┌─────────┐  ┌─────────┐              │
│  │ ⚡ icon  │  │ 📱 icon  │  │ 📦 icon  │              │
│  │ Checkout │  │ Design   │  │ Gestão   │              │
│  │ Rápido   │  │ Responsivo│ │ Estoque  │              │
│  │ desc...  │  │ desc...  │  │ desc...  │              │
│  └─────────┘  └─────────┘  └─────────┘              │
│  ┌─────────┐  ┌─────────┐  ┌─────────┐              │
│  │ 📊 icon  │  │ 💳 icon  │  │ 🎧 icon  │              │
│  │ Analytics│  │ Pagamentos│ │ Suporte  │              │
│  │ realtime │  │ integrados│ │ 24/7     │              │
│  │ desc...  │  │ desc...  │  │ desc...  │              │
│  └─────────┘  └─────────┘  └─────────┘              │
│                                                      │
└──────────────────────────────────────────────────────┘
```

**Feature card pattern:**
```tsx
<motion.div variants={fadeInUp}
  className="glass glass-hover group p-6 lg:p-8">
  {/* Icon container */}
  <div className="w-12 h-12 rounded-xl bg-gold/10 border border-gold/20
                  flex items-center justify-center mb-5
                  group-hover:bg-gold/20 group-hover:shadow-gold transition-all duration-300">
    <Icon className="w-6 h-6 text-gold" />
  </div>

  <h3 className="text-lg font-semibold text-white mb-2">{title}</h3>
  <p className="text-sm text-zinc-400 leading-relaxed">{description}</p>
</motion.div>
```

**Feature data:**
| Icon (lucide) | Title | Description |
|---|---|---|
| `Zap` | Checkout Rápido | Processo de compra em 2 cliques. Conversão até 3x maior. |
| `Smartphone` | Design Responsivo | Sua loja perfeita em qualquer tela. Mobile-first. |
| `Package` | Gestão de Estoque | Controle total do seu inventário em tempo real. |
| `BarChart3` | Analytics em Tempo Real | Dados de vendas, visitantes e conversão ao vivo. |
| `CreditCard` | Pagamentos Integrados | Pix, cartão e boleto. Receba em até 1 dia útil. |
| `Headphones` | Suporte 24/7 | Time dedicado para ajudar sua loja a crescer. |

---

### 6.6 STORES SHOWCASE — `stores-showcase.tsx`

**3 cards with phone preview + metrics. Horizontal scroll mobile, grid desktop.**

```tsx
<motion.div variants={fadeInUp}
  className="glass glass-hover overflow-hidden group">
  {/* Preview image area */}
  <div className="relative h-48 bg-gradient-to-br from-{storeColor}/10 to-{storeColor}/5
                  flex items-center justify-center overflow-hidden">
    {/* Mini phone mockup centered */}
    <div className="w-24 h-44 bg-bg rounded-2xl border border-white/10 p-1
                    group-hover:scale-110 transition-transform duration-500">
      <div className="w-full h-full bg-bg-surface-2 rounded-[14px] overflow-hidden">
        {/* Mini product grid placeholder */}
        <div className="grid grid-cols-2 gap-0.5 p-1.5">
          {[1,2,3,4].map(i => (
            <div key={i} className="aspect-square bg-white/5 rounded-md" />
          ))}
        </div>
      </div>
    </div>

    {/* Category badge */}
    <div className="absolute top-3 left-3">
      <span className="text-xs font-semibold bg-gold/20 text-gold px-3 py-1 rounded-full">
        {category}
      </span>
    </div>
  </div>

  {/* Info */}
  <div className="p-6">
    <h3 className="text-lg font-semibold text-white">{storeName}</h3>
    <p className="text-sm text-zinc-400 mt-1">{description}</p>

    {/* Metrics row */}
    <div className="flex gap-6 mt-4 pt-4 border-t border-subtle">
      <div>
        <span className="text-sm font-bold text-gold">{revenue}</span>
        <p className="text-xs text-zinc-500">faturamento</p>
      </div>
      <div>
        <span className="text-sm font-bold text-white">{products}</span>
        <p className="text-xs text-zinc-500">produtos</p>
      </div>
      <div>
        <span className="text-sm font-bold text-emerald-400">{rating}</span>
        <p className="text-xs text-zinc-500">avaliação</p>
      </div>
    </div>
  </div>
</motion.div>
```

**Store data:**
| Store | Category | Color | Revenue | Products | Rating |
|---|---|---|---|---|---|
| Moda Luxo | Moda | rose | R$890K/mês | 1.2K | 4.9★ |
| Beauty Store | Cosméticos | violet | R$450K/mês | 800 | 4.8★ |
| Tech Shop | Eletrônicos | blue | R$1.2M/mês | 2.5K | 4.7★ |

---

### 6.7 HOW IT WORKS — `how-it-works.tsx`

**3 steps connected by a gold dashed line.**

```
      ①─────────────②─────────────③
   Crie sua       Configure       Comece a
    conta         sua loja         vender
```

```tsx
<section className="py-24 lg:py-32 relative">
  <div className="section-container">
    <SectionHeading
      title="Como Funciona"
      subtitle="3 passos simples para começar a vender online"
    />

    <div className="grid md:grid-cols-3 gap-8 lg:gap-12 mt-16 relative">
      {/* Connecting line (desktop only) */}
      <div className="hidden md:block absolute top-16 left-[16%] right-[16%]
                      h-px border-t-2 border-dashed border-gold/30" />

      {steps.map((step, i) => (
        <motion.div key={i} variants={fadeInUp}
          className="text-center relative">
          {/* Number circle */}
          <div className="w-14 h-14 mx-auto rounded-full bg-gold/10 border-2 border-gold/30
                          flex items-center justify-center mb-6 relative z-10
                          bg-bg"> {/* bg-bg to mask the line behind */}
            <span className="text-xl font-bold text-gold">{i + 1}</span>
          </div>

          {/* Icon */}
          <div className="w-16 h-16 mx-auto rounded-2xl bg-white/[0.04] border border-subtle
                          flex items-center justify-center mb-4">
            <step.icon className="w-7 h-7 text-gold" />
          </div>

          <h3 className="text-lg font-semibold text-white mb-2">{step.title}</h3>
          <p className="text-sm text-zinc-400 max-w-xs mx-auto">{step.description}</p>
        </motion.div>
      ))}
    </div>
  </div>
</section>
```

**Steps data:**
| # | Icon (lucide) | Title | Description |
|---|---|---|---|
| 1 | `UserPlus` | Crie sua conta | Cadastro gratuito em menos de 1 minuto. Sem cartão de crédito. |
| 2 | `Palette` | Configure sua loja | Escolha um template, adicione produtos e personalize. |
| 3 | `Rocket` | Comece a vender | Publique e receba pedidos. Comece a faturar hoje. |

---

### 6.8 PRICING — `pricing.tsx`

**3 columns. Middle card (Pro) elevated + gold border + POPULAR badge.**

```
┌─────────────┐  ┌═══════════════════┐  ┌─────────────┐
│   Starter   │  ║   ✦ POPULAR ✦     ║  │  Enterprise │
│             │  ║                   ║  │             │
│   R$97      │  ║     R$197         ║  │   R$397     │
│   /mês      │  ║     /mês          ║  │   /mês      │
│             │  ║                   ║  │             │
│  5 produtos │  ║  Ilimitado        ║  │  Ilimitado  │
│  1 admin    │  ║  5 admins         ║  │  Ilimitado  │
│  Templates  │  ║  Templates premium║  │  Tudo + API │
│  básicos    │  ║  Analytics avançado║  │  Gerente    │
│             │  ║  Domínio próprio  ║  │  dedicado   │
│  [Começar]  │  ║  [Começar Agora]  ║  │  [Falar]    │
└─────────────┘  ╚═══════════════════╝  └─────────────┘
```

**Card structure:**
```tsx
<motion.div variants={fadeInUp}
  className={cn(
    "glass p-8 flex flex-col",
    isPopular && "border-gold/40 scale-[1.03] lg:scale-105 shadow-gold relative"
  )}>
  {/* POPULAR badge */}
  {isPopular && (
    <div className="absolute -top-4 left-1/2 -translate-x-1/2">
      <span className="bg-gold-gradient text-bg text-xs font-bold px-6 py-1.5
                       rounded-full shadow-gold uppercase tracking-wider">
        Popular
      </span>
    </div>
  )}

  <h3 className="text-xl font-bold text-white">{name}</h3>
  <p className="text-sm text-zinc-400 mt-1">{description}</p>

  {/* Price */}
  <div className="mt-6 mb-6">
    <span className="text-4xl lg:text-5xl font-extrabold text-white">R${price}</span>
    <span className="text-zinc-500 text-sm ml-1">/mês</span>
  </div>

  {/* Divider */}
  <div className="h-px bg-subtle mb-6" />

  {/* Features list */}
  <ul className="flex-1 space-y-3 mb-8">
    {features.map(f => (
      <li className="flex items-start gap-3 text-sm">
        <Check className="w-4 h-4 text-gold flex-shrink-0 mt-0.5" />
        <span className="text-zinc-300">{f}</span>
      </li>
    ))}
  </ul>

  {/* CTA */}
  <button className={cn(
    isPopular ? "btn-gold w-full" : "btn-gold-outline w-full"
  )}>
    {ctaText}
  </button>
</motion.div>
```

**Plan data:**

| Plan | Price | CTA | Features |
|---|---|---|---|
| Starter | 97 | Começar Grátis | Até 50 produtos, 1 admin, Templates básicos, Checkout padrão, Relatórios básicos |
| Pro ★ | 197 | Começar Agora | Produtos ilimitados, 5 admins, Templates premium, Analytics avançado, Domínio próprio, Suporte prioritário |
| Enterprise | 397 | Falar com Vendas | Tudo do Pro, Admins ilimitados, API completa, Gerente dedicado, SLA 99.9%, Integrações custom |

---

### 6.9 TESTIMONIALS — `testimonials.tsx`

**3 cards with avatar, stars, quote.**

```tsx
<motion.div variants={fadeInUp}
  className="glass p-6 lg:p-8">
  {/* Stars */}
  <div className="flex gap-1 mb-4">
    {[1,2,3,4,5].map(i => (
      <Star key={i} className="w-4 h-4 fill-gold text-gold" />
    ))}
  </div>

  {/* Quote */}
  <p className="text-zinc-300 text-sm leading-relaxed mb-6 italic">
    "{quote}"
  </p>

  {/* Author */}
  <div className="flex items-center gap-3">
    {/* Avatar placeholder */}
    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-gold/30 to-navy/30
                    flex items-center justify-center">
      <span className="text-sm font-bold text-white">
        {name.charAt(0)}
      </span>
    </div>
    <div>
      <p className="text-sm font-semibold text-white">{name}</p>
      <p className="text-xs text-zinc-500">{store}</p>
    </div>
  </div>
</motion.div>
```

**Testimonial data:**
| Name | Store | Quote |
|---|---|---|
| Ana Silva | Moda Luxo Store | "Em 3 meses triplicamos nossas vendas. A plataforma é incrível e o suporte não me deixa na mão." |
| Carlos Santos | TechBR | "Migrei de outra plataforma e o resultado foi imediato. Checkout rápido fez toda a diferença." |
| Marina Costa | Beauty Premium | "O design das lojas é de outro nível. Meus clientes sempre elogiam a experiência de compra." |

---

### 6.10 CTA FINAL — `cta-final.tsx`

**Full-width, centered, gradient background, big gold CTA.**

```tsx
<section className="py-24 lg:py-32 relative overflow-hidden">
  {/* Background effects */}
  <div className="absolute inset-0">
    <div className="absolute inset-0 bg-gradient-to-b from-bg via-gold/[0.03] to-bg" />
    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2
                    w-[600px] h-[600px] bg-gold/5 rounded-full blur-[150px]" />
  </div>

  <div className="section-container relative z-10 text-center">
    <motion.div variants={staggerContainer} initial="hidden" whileInView="visible"
                viewport={{ once: true, margin: "-100px" }}>

      <motion.h2 variants={fadeInUp}
        className="text-3xl sm:text-4xl lg:text-5xl font-extrabold leading-tight">
        Comece Hoje{" "}
        <span className="text-gold-gradient">Gratuitamente</span>
      </motion.h2>

      <motion.p variants={fadeInUp}
        className="text-zinc-400 text-lg mt-4 max-w-lg mx-auto">
        Junte-se a mais de 500 lojistas que já faturam com a Shoppz.
        Sem cartão de crédito. Sem compromisso.
      </motion.p>

      <motion.div variants={fadeInUp} className="mt-8">
        <button className="btn-gold text-lg px-12 py-4 shadow-gold-lg">
          Criar Minha Loja Grátis
        </button>
      </motion.div>

      <motion.p variants={fadeInUp}
        className="text-xs text-zinc-600 mt-4">
        ✓ Grátis por 14 dias  ✓ Sem cartão  ✓ Cancele quando quiser
      </motion.p>
    </motion.div>
  </div>
</section>
```

---

### 6.11 FOOTER — `footer.tsx`

```
┌──────────────────────────────────────────────────────────────┐
│                                                              │
│  [S] Shoppz                                                  │
│  A plataforma #1 para lojas online premium.                  │
│                                                              │
│  Produto         Empresa        Legal            Redes       │
│  Recursos        Sobre          Privacidade      Instagram   │
│  Preços          Blog           Termos           Twitter     │
│  Templates       Carreiras      Cookies          LinkedIn    │
│  Integrações     Contato                         YouTube     │
│                                                              │
│  ────────────────────────────────────────────────            │
│  © 2026 Shoppz Digital. Todos os direitos reservados.       │
└──────────────────────────────────────────────────────────────┘
```

```tsx
<footer className="border-t border-subtle py-16">
  <div className="section-container">
    <div className="grid grid-cols-2 md:grid-cols-5 gap-8">
      {/* Brand column — col-span-2 on mobile */}
      <div className="col-span-2">
        <div className="flex items-center gap-2 mb-4">
          <span className="text-gold text-2xl font-black">S</span>
          <span className="text-white text-xl font-bold">hoppz</span>
        </div>
        <p className="text-sm text-zinc-500 max-w-xs leading-relaxed">
          A plataforma #1 para criar lojas online premium no Brasil.
        </p>
      </div>

      {/* Link columns */}
      {linkGroups.map(group => (
        <div key={group.title}>
          <h4 className="text-sm font-semibold text-white mb-4">{group.title}</h4>
          <ul className="space-y-2">
            {group.links.map(link => (
              <li key={link}>
                <a className="text-sm text-zinc-500 hover:text-gold transition-colors">
                  {link}
                </a>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>

    {/* Bottom bar */}
    <div className="mt-12 pt-8 border-t border-subtle flex flex-col sm:flex-row
                    items-center justify-between gap-4">
      <p className="text-xs text-zinc-600">
        © 2026 Shoppz Digital. Todos os direitos reservados.
      </p>
      <div className="flex gap-4">
        {/* Social icons */}
        {[Instagram, Twitter, Linkedin, Youtube].map((Icon, i) => (
          <a key={i} className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center
                                hover:bg-gold/20 hover:text-gold transition-all">
            <Icon className="w-4 h-4 text-zinc-500" />
          </a>
        ))}
      </div>
    </div>
  </div>
</footer>
```

---

## 7. REUSABLE UI COMPONENTS

### 7.1 `ui/glass-card.tsx`
```tsx
interface GlassCardProps {
  children: React.ReactNode;
  className?: string;
  hover?: boolean;
}

export function GlassCard({ children, className, hover = true }: GlassCardProps) {
  return (
    <motion.div
      variants={fadeInUp}
      className={cn("glass", hover && "glass-hover", className)}
    >
      {children}
    </motion.div>
  );
}
```

### 7.2 `ui/gold-button.tsx`
```tsx
interface GoldButtonProps {
  children: React.ReactNode;
  variant?: "solid" | "outline";
  size?: "sm" | "md" | "lg";
  className?: string;
  onClick?: () => void;
}

// Size map:
// sm: px-5 py-2 text-sm
// md: px-8 py-3.5 text-base (default)
// lg: px-12 py-4 text-lg

export function GoldButton({ variant = "solid", size = "md", ... }: GoldButtonProps) {
  return (
    <button className={cn(
      variant === "solid" ? "btn-gold" : "btn-gold-outline",
      sizeClasses[size],
      className
    )}>
      {children}
    </button>
  );
}
```

### 7.3 `ui/section-heading.tsx`
```tsx
export function SectionHeading({ title, highlight, subtitle }: Props) {
  return (
    <div className="text-center max-w-2xl mx-auto mb-16">
      <motion.h2 variants={fadeInUp}
        className="text-3xl sm:text-4xl lg:text-[40px] font-bold leading-tight tracking-[-0.02em]">
        {title}{" "}
        {highlight && <span className="text-gold-gradient">{highlight}</span>}
      </motion.h2>
      {subtitle && (
        <motion.p variants={fadeInUp}
          className="text-zinc-400 text-lg mt-4">
          {subtitle}
        </motion.p>
      )}
    </div>
  );
}
```

### 7.4 `ui/badge.tsx`
```tsx
export function Badge({ children, variant = "gold" }: Props) {
  const styles = {
    gold: "bg-gold/10 text-gold border-gold/20",
    green: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20",
    navy: "bg-navy/10 text-navy-light border-navy/20",
  };

  return (
    <span className={cn(
      "inline-flex items-center gap-1.5 text-xs font-semibold px-3 py-1",
      "rounded-full border", styles[variant]
    )}>
      {children}
    </span>
  );
}
```

---

## 8. `lib/cn.ts`

```ts
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
```

---

## 9. PAGE ASSEMBLY — `app/page.tsx`

```tsx
import { Navbar } from "@/components/navbar";
import { Hero } from "@/components/hero";
import { LogosMarquee } from "@/components/logos-marquee";
import { Features } from "@/components/features";
import { StoresShowcase } from "@/components/stores-showcase";
import { HowItWorks } from "@/components/how-it-works";
import { Pricing } from "@/components/pricing";
import { Testimonials } from "@/components/testimonials";
import { CTAFinal } from "@/components/cta-final";
import { Footer } from "@/components/footer";

export default function Home() {
  return (
    <>
      <Navbar />
      <Hero />
      <LogosMarquee />
      <Features />
      <StoresShowcase />
      <HowItWorks />
      <Pricing />
      <Testimonials />
      <CTAFinal />
      <Footer />
    </>
  );
}
```

---

## 10. LAYOUT — `app/layout.tsx`

```tsx
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], weight: ["300","400","500","600","700","800","900"] });

export const metadata: Metadata = {
  title: "Shoppz Digital — Lojas Online Premium",
  description: "Crie sua loja online premium em minutos. Design de alto nível, checkout rápido e tudo que você precisa para vender mais.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR" className="dark">
      <body className={inter.className}>{children}</body>
    </html>
  );
}
```

---

## 11. ANIMATION STRATEGY

| Section | Trigger | Effect |
|---|---|---|
| Navbar | scroll > 60px | glass bg + border-b fade in |
| Hero badge | page load | fadeInUp delay 0 |
| Hero H1 | page load | fadeInUp delay 0.08 |
| Hero subtitle | page load | fadeInUp delay 0.16 |
| Hero CTAs | page load | fadeInUp delay 0.24 |
| Hero stats | page load | fadeInUp delay 0.32 |
| Phone mockups | page load | fadeIn + infinite float (6s, 7s, 8s offsets) |
| Logos | always | CSS marquee 30s linear infinite |
| Feature cards | `whileInView` | stagger fadeInUp 0.08s each |
| Store cards | `whileInView` | stagger fadeInUp 0.15s each |
| How It Works | `whileInView` | stagger fadeInUp + number springIn |
| Pricing cards | `whileInView` | stagger fadeInUp, Pro card scaleIn |
| Testimonials | `whileInView` | stagger fadeInUp 0.1s |
| CTA Final | `whileInView` | fadeInUp heading, then subtitle, then button |
| All sections | viewport | `once: true, margin: "-100px"` |

---

## 12. RESPONSIVE BREAKPOINTS

| Breakpoint | Layout |
|---|---|
| `<640px` (mobile) | 1col everything, H1 36px, no phone mockups, bottom CTA sticky optional |
| `640-1024px` (tablet) | 2col features, 2col pricing, phone mockups 2 visible |
| `>1024px` (desktop) | 3col features, 3col pricing, 3 phone mockups, full hero 2-col |

---

## 13. PERFORMANCE NOTES

- Use `next/font/google` for Inter (no FOUT)
- Phone mockup images: pure CSS/divs (no images needed)
- `whileInView` with `once: true` to avoid re-triggering
- `will-change: transform` on floating elements
- Marquee uses CSS animation (not JS)
- Lazy sections below fold with dynamic import if needed

---

## HANDOFF

> **@Coder**: Implementar esta spec em Next.js + Tailwind dentro de `/Users/biosecrets/MeusApps/lpshoppz/`.
> Criar todos os arquivos listados na seção 5 (Component Architecture).
> Usar as classes exatas descritas. Framer Motion variants do `lib/animations.ts`.
> Dev server: `npm run dev` → porta 3077.
