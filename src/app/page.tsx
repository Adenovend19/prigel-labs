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

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <About />
        <Products />
        <Vision />
        <Features />
        <Testimonials />
        <Cta />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
