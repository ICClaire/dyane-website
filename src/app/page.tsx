import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Works from "@/components/Works";
import Process from "@/components/Process";
import Testimonials from "@/components/Testimonials";
import FAQ from "@/components/FAQ";
import Footer from "@/components/Footer";
import ScrollDrawSVG from "@/components/ScrollDrawSVG";

export default function Home() {
  return (
    <main className="relative">
      {/* flower-long stretching from hero through about */}
      <div className="absolute -left-12 sm:-left-14 top-[28vh] h-[80vh] sm:h-[200vh] w-auto pointer-events-none z-10 opacity-40 sm:opacity-70 select-none">
        <ScrollDrawSVG
          src="/flower-long.svg"
          className="h-full"
          svgStyle="height:100%;width:auto;display:block;"
        />
      </div>

      <Navbar />
      <Hero />
      <About />
      <Works />
      <Process />
      <Testimonials />
      <FAQ />
      <Footer />
    </main>
  );
}
