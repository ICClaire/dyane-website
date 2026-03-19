"use client";
import { useEffect, useRef } from "react";
import Image from "next/image";
import { FloralDivider, SmallFlower } from "./FlowerDecor";

const navLinks = [
  { label: "Works", href: "#works" },
  { label: "About", href: "#about" },
  { label: "Process", href: "#process" },
  { label: "Reviews", href: "#testimonials" },
];

const socials = [
  {
    label: "Instagram",
    href: "https://www.instagram.com/chan.inkedd/",
    icon: (
      <svg viewBox="0 0 24 24" className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="1.5">
        <rect x="2" y="2" width="20" height="20" rx="5" />
        <circle cx="12" cy="12" r="5" />
        <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
      </svg>
    ),
  },
];

export default function Footer() {
  const ctaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            (entry.target as HTMLElement).style.opacity = "1";
            (entry.target as HTMLElement).style.transform = "translateY(0)";
            obs.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.2 }
    );
    if (ctaRef.current) obs.observe(ctaRef.current);
    return () => obs.disconnect();
  }, []);

  return (
    <footer id="contact" className="relative overflow-hidden" style={{ backgroundColor: "#6F866A" }}>
      {/* Background texture */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(143,166,140,0.08)_0%,transparent_60%)] pointer-events-none" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,rgba(194,133,143,0.08)_0%,transparent_60%)] pointer-events-none" />

      {/* Botanical decorations */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src="/flower-long.svg" alt="" className="absolute left-0 bottom-0 h-64 w-auto opacity-20 pointer-events-none select-none" />
      <Image src="/two-flower.svg" alt="" width={140} height={140} className="absolute right-6 top-10 w-32 h-auto opacity-15 pointer-events-none select-none rotate-6" />

      {/* CTA Banner */}
      <div className="border-b border-cream/10">
        <div
          ref={ctaRef}
          style={{
            opacity: 0,
            transform: "translateY(32px)",
            transition: "opacity 0.9s cubic-bezier(.22,1,.36,1), transform 0.9s cubic-bezier(.22,1,.36,1)",
          }}
          className="max-w-6xl mx-auto px-6 py-16 text-center"
        >
          <SmallFlower className="w-10 h-10 mx-auto mb-6 opacity-40" />
          <h2 className="font-heading text-4xl md:text-5xl text-cream mb-3">
            Ready to wear a little garden?
          </h2>
          <p className="text-cream/50 text-sm mb-8 max-w-md mx-auto leading-relaxed">
            I take on a limited number of bookings each month to give each client
            the care and attention they deserve.
          </p>
          <a
            href="https://form.jotform.com/211304498108856?utm_source=ig&utm_medium=social&utm_content=link_in_bio&fbclid=PAZXh0bgNhZW0CMTEAc3J0YwZhcHBfaWQMMjU2MjgxMDQwNTU4AAGnL0VP716BPGocT4es00Yl_uuoMdckS1mTshJx8Uqayk-XrCkdCc6UP_hGLxk_aem_QeuvWN3hCSKCxJHID9HJig"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 px-8 py-3.5 bg-white text-bark text-xs tracking-[0.2em] uppercase rounded-full hover:bg-cream transition-all duration-300"
          >
            Book a Session
          </a>
        </div>
      </div>

      {/* Main footer body */}
      <div className="max-w-6xl mx-auto px-6 py-14">
        <div className="grid md:grid-cols-3 gap-10 md:gap-6 text-center md:text-left">
          {/* Brand */}
          <div className="flex flex-col items-center md:items-start">
            <p className="font-heading text-4xl text-cream mb-3">chan.inked</p>
            <FloralDivider className="w-40 mb-4 opacity-20" />
            <p className="text-cream/40 text-xs leading-relaxed max-w-[220px]">
              Fine line tattoo art rooted in botanical beauty, minimalism, and
              the stories we carry on our skin.
            </p>
          </div>

          {/* Navigation */}
          <div className="flex flex-col items-center md:items-start">
            <p className="text-xs tracking-[0.25em] uppercase text-cream/60 mb-5">Navigation</p>
            <ul className="space-y-3">
              {navLinks.map((l) => (
                <li key={l.label}>
                  <a
                    href={l.href}
                    className="text-cream/50 hover:text-cream text-sm transition-colors tracking-wide"
                  >
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact & socials */}
          <div className="flex flex-col items-center md:items-start">
            <p className="text-xs tracking-[0.25em] uppercase text-cream/60 mb-5">Get in Touch</p>
            <a
              href="mailto:hello@chan.inked"
              className="text-cream/60 hover:text-cream text-sm transition-colors block mb-2"
            >
              hello@chan.inked
            </a>
            <p className="text-cream/30 text-xs mb-6">Fleetwood B.C · Worldwide</p>
            <div className="flex gap-4">
              {socials.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={s.label}
                  className="w-9 h-9 rounded-full border border-cream/15 flex items-center justify-center text-cream/50 hover:text-cream hover:border-cream/40 transition-all"
                >
                  {s.icon}
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-14 pt-6 border-t border-cream/10 flex flex-col items-center md:flex-row md:justify-between gap-3 text-center">
          <p className="text-cream/25 text-xs tracking-wider">
            © {new Date().getFullYear()} chan.inked. All rights reserved.
          </p>
          <a
            href="https://cloverfield.studio/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-cream/20 hover:text-cream/40 text-xs transition-colors tracking-wider"
          >
            built with care by cloverfield
          </a>
        </div>
      </div>
    </footer>
  );
}
