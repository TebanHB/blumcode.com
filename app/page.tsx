import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Services from "@/components/Services";
import Solutions from "@/components/Solutions";
import Process from "@/components/Process";
import Testimonials from "@/components/Testimonials";
import Footer from "@/components/Footer";

export default function HomePage() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <Services />
        <Solutions />
        <Process />
        <Testimonials />
      </main>
      <Footer />
    </>
  );
}