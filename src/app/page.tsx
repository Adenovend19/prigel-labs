import Header from "@/components/Header";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Products from "@/components/Products";
import Vision from "@/components/Vision";
import Features from "@/components/Features";
import Testimonials from "@/components/Testimonials";
import Cta from "@/components/Cta";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import { getContent } from "@/lib/contentService";

export const dynamic = "force-dynamic";

export default async function Home() {
  const content = await getContent();

  return (
    <>
      <Header />
      <main>
        <Hero content={content.hero} />
        <About content={content.about} />
        <Products content={content.products} />
        <Vision content={content.vision} />
        <Features content={content.features} />
        <Testimonials content={content.testimonials} />
        <Cta content={content.cta} />
        <Contact content={content.contact} />
      </main>
      <Footer content={content.footer} />
    </>
  );
}
