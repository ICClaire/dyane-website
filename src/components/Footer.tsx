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
      // Flowers drift up
      gsap.from(".footer-flower-left", {
        y: 100,
        opacity: 0,
        duration: 1.8,
        ease: "power2.out",
        scrollTrigger: { trigger: footer, start: "top 85%" },
      });
      gsap.from(".footer-flower-right", {
        y: 100,
        opacity: 0,
        duration: 1.8,
        delay: 0.15,
        ease: "power2.out",
        scrollTrigger: { trigger: footer, start: "top 85%" },
      });

      // Gentle sway
      gsap.to(".footer-flower-left", {
        rotate: 1.5,
        duration: 5,
        ease: "sine.inOut",
        repeat: -1,
        yoyo: true,
        transformOrigin: "bottom center",
      });

      // Content reveal
      gsap.from(footer.querySelectorAll(".reveal"), {
        y: 25,
        opacity: 0,
        duration: 0.8,
        ease: "power3.out",
        stagger: 0.08,
        scrollTrigger: { trigger: footer, start: "top 75%" },
      });
    }, footer);

    return () => ctx.revert();
  }, []);

  return (
    <footer
      ref={footerRef}
      id="contact"
      className="relative overflow-hidden bg-parchment/50"
    >
      {/* Warm glow from center */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(191,128,144,0.08)_0%,transparent_60%)] pointer-events-none" />

      {/* two-flower — left, anchored at bottom */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/two-flower.svg"
        alt=""
        className="footer-flower-left absolute bottom-0 -left-12 sm:left-0 h-[50%] sm:h-[60%] md:h-[70%] w-auto pointer-events-none select-none"
      />

      {/* flower-long — right, anchored at bottom, flipped */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/flower-long.svg"
        alt=""
        className="footer-flower-right absolute bottom-0 -right-10 sm:right-0 h-[55%] sm:h-[65%] md:h-[75%] w-auto pointer-events-none select-none"
        style={{ transform: "scaleX(-1)" }}
      />

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center text-center px-6 pt-28 sm:pt-32 pb-10">
        {/* Big name */}
        <h2 className="reveal font-heading text-7xl sm:text-8xl md:text-9xl text-bark leading-none mb-5">
          chan.inked
        </h2>

        {/* Tagline */}
        <p className="reveal text-bark/70 text-base sm:text-lg tracking-wide max-w-md leading-relaxed mb-10">
          Fine line tattoos rooted in botanical beauty and the stories we carry on our skin.
        </p>

        {/* Book button */}
        <a
          href={BOOKING_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="reveal group inline-flex items-center gap-2 px-8 py-3.5 rounded-full border border-bark/30 text-bark text-sm tracking-[0.2em] uppercase hover:border-rose/50 hover:text-rose transition-all duration-500"
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

        {/* Social + location */}
        <div className="reveal mt-16 flex flex-col sm:flex-row items-center gap-6 sm:gap-10 text-bark/60 text-sm tracking-wider">
          <a
            href="https://www.instagram.com/chan.inkedd/"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 hover:text-rose transition-colors duration-300"
          >
            <svg viewBox="0 0 24 24" className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="1.5">
              <rect x="2" y="2" width="20" height="20" rx="5" />
              <circle cx="12" cy="12" r="5" />
              <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
            </svg>
            <span>@chan.inkedd</span>
          </a>

          <span className="hidden sm:block w-1 h-1 rounded-full bg-bark/30" />
          <span>Fleetwood, B.C.</span>
          <span className="hidden sm:block w-1 h-1 rounded-full bg-bark/30" />

          <a
            href="mailto:hello@chan.inked"
            className="hover:text-rose transition-colors duration-300"
          >
            hello@chan.inked
          </a>
        </div>
      </div>

      {/* Bottom strip */}
      <div className="relative z-10 border-t border-bark/15 py-5 flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-6 text-bark/40 text-xs tracking-wider px-6">
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
