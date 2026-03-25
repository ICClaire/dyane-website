"use client";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);


export default function Footer() {
  const footerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const footer = footerRef.current;
    if (!footer) return;

    /* ── Detect in-app WebViews (Instagram, Facebook, TikTok, etc.) ── */
    const ua = navigator.userAgent || (navigator as any).vendor || "";
    const isInAppWebView =
      /Instagram|FBAN|FBAV|Line\/|Twitter|MicroMessenger|TikTok|Snapchat|Pinterest/i.test(ua);

    /* In WebViews, skip scroll-driven parallax entirely — place clouds
       at their midpoint positions statically. Zero JS scroll overhead. */
    if (isInAppWebView) {
      gsap.set(".cloud-white",         { y: 10 });
      gsap.set(".cloud-pink",          { y: 20 });
      gsap.set(".cloud-purple-side",   { y: 40 });
      gsap.set(".cloud-purple-bottom", { y: 40 });
      gsap.set(".footer-title",        { y: -10 });
      return;
    }

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

      {/* ══ CONTENT SPACER ═════════════════════════════════════ */}
      <div
        className="relative px-6 pb-20"
        style={{ paddingTop: "max(180px, 43%)", zIndex: 10 }}
      />

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
