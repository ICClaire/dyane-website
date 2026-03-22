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
      {/* Mobile: static img (no JS fetch/animation). Desktop: animated draw. */}
      <div className="absolute -left-32 sm:-left-14 top-[18vh] h-[140vh] sm:h-[200vh] w-auto pointer-events-none z-[1] opacity-40 sm:opacity-70 select-none">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/flower-long.svg"
          alt=""
          className="h-full w-auto block md:hidden"
        />
        <div className="hidden md:block h-full">
          <ScrollDrawSVG
            src="/flower-long.svg"
            className="h-full"
            svgStyle="height:100%;width:auto;display:block;"
            autoPlay
            autoPlayDuration={3500}
          />
        </div>
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
