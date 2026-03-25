"use client";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const BOOKING_URL =
  "https://form.jotform.com/211304498108856?utm_source=ig&utm_medium=social&utm_content=link_in_bio&fbclid=PAZXh0bgNhZW0CMTEAc3J0YwZhcHBfaWQMMjU2MjgxMDQwNTU4AAGnL0VP716BPGocT4es00Yl_uuoMdckS1mTshJx8Uqayk-XrCkdCc6UP_hGLxk_aem_QeuvWN3hCSKCxJHID9HJig";

export default function Footer() {
  const footerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const footer = footerRef.current;
    if (!footer) return;

    const ctx = gsap.context(() => {
      const isMobile = window.innerWidth < 640;
      const st = {
        trigger: footer,
        start: "top bottom",
        end: "bottom top",
        scrub: true,
      };

      // White — back layer, barely drifts
      gsap.fromTo(".cloud-white", { y: isMobile ? 30 : 20 }, { y: isMobile ? -10 : -5, ease: "none", scrollTrigger: st });

      // Pink — mid layer
      gsap.fromTo(".cloud-pink", { y: isMobile ? 320 : 320 }, { y: isMobile ? -280 : -260, ease: "none", scrollTrigger: st });

      // Purple side clouds
      gsap.fromTo(".cloud-purple-side", { y: isMobile ? 600 : 600 }, { y: isMobile ? -520 : -500, ease: "none", scrollTrigger: st });

      // Purple bottom clouds
      gsap.fromTo(".cloud-purple-bottom", { y: isMobile ? 600 : 600 }, { y: isMobile ? -520 : -500, ease: "none", scrollTrigger: st });

      // Title parallax — between pink and purple
      gsap.fromTo(
        ".footer-title",
        { y: isMobile ? 120 : 120 },
        { y: isMobile ? -140 : -140, ease: "none", scrollTrigger: st }
      );

      // Footer content fade-in
      gsap.from(footer.querySelectorAll(".reveal"), {
        y: 25,
        opacity: 0,
        duration: 0.8,
        ease: "power3.out",
        stagger: 0.08,
        scrollTrigger: { trigger: footer, start: "top 80%" },
      });
    }, footer);

    return () => ctx.revert();
  }, []);

  return (
    <footer
      ref={footerRef}
      id="contact"
      className="relative bg-parchment/50 overflow-hidden"
      style={{ minHeight: "clamp(500px, 100vw, 800px)" }}
    >
      {/* ══ LEFT GROUP ══════════════════════════════════════════ */}

      {/* White — back */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src="/clouds/1white.svg" alt="" className="cloud-white absolute pointer-events-none select-none w-[500%] sm:w-[65%] top-[20%] sm:top-[22%]"
        style={{ left: "-18%", zIndex: 1, filter: "saturate(1.8) contrast(1.05)" }} />
      {/* Pink — mid */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src="/clouds/1pink.svg" alt="" className="cloud-pink absolute pointer-events-none select-none w-[250%] sm:w-[56%] top-[16%] sm:top-[30%]"
        style={{ left: "-14%", zIndex: 2 }} />
      {/* Purple — front */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src="/clouds/1purple.svg" alt="" className="cloud-purple-side absolute pointer-events-none select-none w-[400%] sm:w-[80%] bottom-[35%] sm:-bottom-[30%]"
        style={{ left: "-50%", zIndex: 4 }} />

      {/* ══ RIGHT GROUP (mirrored) ══════════════════════════════ */}

      {/* White — back */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src="/clouds/2white.svg" alt="" className="cloud-white absolute pointer-events-none select-none w-[500%] sm:w-[65%] top-[20%] sm:top-[22%]"
        style={{ right: "-18%", zIndex: 1, transform: "scaleX(-1)", filter: "saturate(1.8) contrast(1.05)" }} />
      {/* Pink — mid */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src="/clouds/2 pink.svg" alt="" className="cloud-pink absolute pointer-events-none select-none w-[250%] sm:w-[56%] top-[16%] sm:top-[30%]"
        style={{ right: "-14%", zIndex: 2, transform: "scaleX(-1)" }} />
      {/* Purple — front */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src="/clouds/2purple.svg" alt="" className="cloud-purple-side absolute pointer-events-none select-none w-[400%] sm:w-[80%] bottom-[35%] sm:-bottom-[30%]"
        style={{ right: "-50%", zIndex: 4, transform: "scaleX(-1)" }} />

      {/* ══ BOTTOM PURPLE CLOUDS ════════════════════════════════ */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src="/clouds/1purple.svg" alt="" className="cloud-purple-bottom absolute pointer-events-none select-none w-[150%] sm:w-[60%] bottom-[25%] sm:-bottom-[25%]"
        style={{ left: "-20%", zIndex: 4 }} />
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src="/clouds/2purple.svg" alt="" className="cloud-purple-bottom absolute pointer-events-none select-none w-[150%] sm:w-[60%] bottom-[25%] sm:-bottom-[25%]"
        style={{ right: "-20%", zIndex: 4, transform: "scaleX(-1)" }} />

      {/* ══ CLOUD-COLOUR PANEL (below white clouds) ════════════ */}
      <div
        className="absolute inset-x-0 bottom-0"
        style={{ top: "38%", background: "linear-gradient(to bottom, transparent 0%, #FDF7E6 18%)", zIndex: 0 }}
      />

      {/* ══ BIG TITLE (above clouds) ════════════════════════════ */}
      <div
        className="footer-title absolute inset-x-0 flex items-center justify-center pointer-events-none select-none"
        style={{ top: "38%", zIndex: 3 }}
      >
        <h2
          className="font-heading leading-none text-center whitespace-nowrap"
          style={{
            fontSize: "clamp(2.5rem, 22vw, 26rem)",
            color: "#564436",
            letterSpacing: "0",
          }}
        >
          chan.inked
        </h2>
      </div>

      {/* ══ CONTENT ════════════════════════════════════════════ */}
      <div
        className="relative flex flex-col items-center text-center px-6 pb-20"
        style={{ paddingTop: "max(180px, 43%)", zIndex: 10 }}
      >
        {/* Book button */}
        <a
          href={BOOKING_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="reveal group inline-flex items-center gap-2 px-8 py-3.5 rounded-full border-0 sm:border border-bark/30 text-bark text-sm tracking-[0.2em] uppercase hover:border-rose/50 hover:text-rose transition-all duration-500 bg-white sm:bg-transparent mt-36 sm:mt-0"
        >
          <span>Book a Session</span>
          <svg
            className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={1.5}
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3" />
          </svg>
        </a>

      </div>

      {/* ══ BOTTOM STRIP ═══════════════════════════════════════ */}
      <div
        className="absolute inset-x-0 bottom-0 border-t border-bark/15 py-5 flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-6 text-bark/40 text-xs tracking-wider px-6"
        style={{ zIndex: 10 }}
      >
        <span>© {new Date().getFullYear()} chan.inked</span>
        <span className="hidden sm:block">·</span>
        <a
          href="https://cloverfield.studio/"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-bark/70 transition-colors duration-300"
        >
          built with care by cloverfield
        </a>
      </div>
    </footer>
  );
}
