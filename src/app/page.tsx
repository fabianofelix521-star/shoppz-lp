import Navbar from "@/components/Navbar"
import Hero from "@/components/Hero"
import Features from "@/components/Features"
import StoresShowcase from "@/components/StoresShowcase"
import Testimonials from "@/components/Testimonials"
import Integrations from "@/components/Integrations"
import CTAFinal from "@/components/CTAFinal"
import Footer from "@/components/Footer"

export default function Home() {
  return (
    <main className="min-h-screen overflow-x-hidden">
      <Navbar />
      <Hero />
      <Features />
      <StoresShowcase />
      <Testimonials />
      <Integrations />
      <CTAFinal />
      <Footer />
    </main>
  )
}
