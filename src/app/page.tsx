import { getContent } from "@/lib/storage";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Features from "@/components/Features";
import StoresShowcase from "@/components/StoresShowcase";
import Testimonials from "@/components/Testimonials";
import Integrations from "@/components/Integrations";
import CTAFinal from "@/components/CTAFinal";
import Footer from "@/components/Footer";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export default async function Home() {
  const content = await getContent();

  return (
    <main className="min-h-screen overflow-x-hidden">
      <Navbar data={content.navbar} />
      <Hero data={content.hero} />
      <Features data={content.features} />
      <StoresShowcase data={content.portfolio} />
      <Testimonials data={content.testimonials} />
      <Integrations data={content.integrations} />
      <CTAFinal data={content.ctaFinal} />
      <Footer data={content.footer} />
    </main>
  );
}
