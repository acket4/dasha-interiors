import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Manifesto from "@/components/Manifesto";
import Stats from "@/components/Stats";
import About from "@/components/About";
import Services from "@/components/Services";
import WhyTechProject from "@/components/WhyTechProject";
import Process from "@/components/Process";
import Gallery from "@/components/Gallery";
import Testimonial from "@/components/Testimonial";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Header />
      <main className="flex-1">
        <Hero />
        <Manifesto />
        <Stats />
        <About />
        <Services />
        <WhyTechProject />
        <Process />
        <Gallery />
        <Testimonial />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
