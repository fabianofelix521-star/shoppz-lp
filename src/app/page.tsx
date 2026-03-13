import Navbar from '@/components/Navbar'
import Hero from '@/components/Hero'
import Marquee from '@/components/Marquee'
import Features from '@/components/Features'
import StoresShowcase from '@/components/StoresShowcase'
import HowItWorks from '@/components/HowItWorks'
import Pricing from '@/components/Pricing'
import Testimonials from '@/components/Testimonials'
import CTAFinal from '@/components/CTAFinal'
import Footer from '@/components/Footer'

export default function Home() {
  return (
    <main className="min-h-screen overflow-x-hidden">
      <Navbar />
      <Hero />
      <Marquee />
      <Features />
      <StoresShowcase />
      <HowItWorks />
      <Pricing />
      <Testimonials />
      <CTAFinal />
      <Footer />
    </main>
  )
}
