"use client";
import { useEffect, useRef } from "react";
import { HeroTitle } from "./HeroTitle";
import gsap from "gsap";

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    // Mobile: CSS handles visibility (no animation). Desktop: run GSAP.
    const isMobile = window.matchMedia("(max-width: 768px)").matches;
    if (isMobile) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ delay: 0.15 });

      tl.fromTo(
        ".hero-blob",
        { scale: 0.3, opacity: 0 },
        { scale: 1, opacity: 1, duration: 2.4, stagger: 0.3, ease: "power2.out" },
        0
      );

      tl.fromTo(
        ".hero-rule-line",
        { scaleX: 0, opacity: 0 },
        { scaleX: 1, opacity: 1, duration: 0.8, ease: "power3.inOut" },
        1.0
      );

      tl.fromTo(
        ".hero-diamond",
        { scale: 0, rotation: 180, opacity: 0 },
        { scale: 1, rotation: 0, opacity: 0.7, duration: 0.6, ease: "back.out(2.5)" },
        1.15
      );

      tl.fromTo(
        ".hero-subtitle",
        { y: 28, opacity: 0 },
        { y: 0, opacity: 1, duration: 1, ease: "power3.out" },
        1.15
      );

      tl.fromTo(
        ".hero-cta",
        { y: 24, opacity: 0, scale: 0.92 },
        { y: 0, opacity: 1, scale: 1, duration: 0.85, stagger: 0.14, ease: "power3.out" },
        1.4
      );

      tl.fromTo(
        ".hero-scroll",
        { opacity: 0, y: -15 },
        { opacity: 1, y: 0, duration: 0.9, ease: "power2.out" },
        2.0
      );

      tl.add(() => {
        gsap.utils.toArray<HTMLElement>(".hero-blob").forEach((blob, i) => {
          gsap.to(blob, {
            y: "-=12",
            duration: 2.5,
            repeat: -1,
            yoyo: true,
            ease: "sine.inOut",
            delay: i * 0.8,
          });
        });
      }, 2.2);
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden bg-parchment/50 pt-40">
      {/* Soft gradient blobs */}
      <div className="hero-blob absolute top-0 left-0 w-96 h-96 rounded-full bg-blush/30 blur-3xl -translate-x-1/2 -translate-y-1/4 pointer-events-none md:opacity-0" />
      <div className="hero-blob absolute bottom-0 right-0 w-80 h-80 rounded-full bg-sage-pale/40 blur-3xl translate-x-1/3 translate-y-1/4 pointer-events-none md:opacity-0" />
      <div className="hero-blob absolute top-1/3 right-1/4 w-64 h-64 rounded-full bg-mint/20 blur-3xl pointer-events-none md:opacity-0" />

      {/* Main content */}
      <div className="relative z-10 flex flex-col items-center text-center px-6 max-w-3xl">

        {/* Main heading — SVG stroke draw animation */}
        <div className="w-full max-w-2xl mb-2">
          <HeroTitle />
        </div>

        {/* Decorative line */}
        <div className="flex items-center gap-3 my-6">
          <div className="hero-rule-line w-12 h-px bg-sage-light origin-right opacity-100 md:opacity-0" />
          <svg viewBox="0 0 24 24" className="hero-diamond w-3 h-3 fill-sage opacity-70 md:opacity-0">
            <path d="M12 2C8 8 4 10 2 12c2 2 6 4 10 10 4-6 8-8 10-10-2-2-6-4-10-10z" />
          </svg>
          <div className="hero-rule-line w-12 h-px bg-sage-light origin-left opacity-100 md:opacity-0" />
        </div>

        {/* Eyebrow */}
        <p className="hero-subtitle text-lg tracking-[0.18em] text-bark-light mb-6 opacity-100 md:opacity-0">
          Tattoo Artist in Fleetwood B.C @ Ink House
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 items-stretch sm:items-center w-full sm:w-auto">
          <a
            href="#works"
            className="hero-cta px-8 py-3.5 bg-rose text-cream text-xs tracking-[0.2em] uppercase rounded-full hover:bg-bark transition-all duration-300 hover:shadow-lg text-center opacity-100 md:opacity-0"
          >
            View My Work
          </a>
          <a
            href="https://form.jotform.com/211304498108856?utm_source=ig&utm_medium=social&utm_content=link_in_bio&fbclid=PAZXh0bgNhZW0CMTEAc3J0YwZhcHBfaWQMMjU2MjgxMDQwNTU4AAGnL0VP716BPGocT4es00Yl_uuoMdckS1mTshJx8Uqayk-XrCkdCc6UP_hGLxk_aem_QeuvWN3hCSKCxJHID9HJig"
            target="_blank"
            rel="noopener noreferrer"
            className="hero-cta px-8 py-3.5 border border-bark/25 text-bark text-xs tracking-[0.2em] uppercase rounded-full hover:border-rose hover:text-rose transition-all duration-300 text-center opacity-100 md:opacity-0"
          >
            Book a Session
          </a>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="hero-scroll absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 animate-bounce opacity-100 md:opacity-0">
        <div className="w-px h-10 bg-gradient-to-b from-sage-light to-transparent" />
      </div>
    </section>
  );
}
