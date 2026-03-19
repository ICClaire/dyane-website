"use client";
import { useState, useRef, useEffect } from "react";
import { FloralDivider } from "./FlowerDecor";

const faqs = [
  {
    q: "Does getting a tattoo hurt?",
    a: "It depends on placement and your personal tolerance. Bony areas like ribs, spine, and feet tend to be more sensitive, while fleshy spots like the outer arm or thigh are generally easier. Most people describe it as a scratching or burning sensation, very manageable, especially for smaller pieces.",
  },
  {
    q: "How much does a tattoo cost?",
    a: "Pricing is based on size, placement, and complexity. Every piece is quoted individually after we discuss your idea. I'll always be transparent about cost before anything is confirmed. No surprises.",
  },
  {
    q: "How should I prepare for my appointment?",
    a: "Eat a full meal beforehand, stay hydrated, and avoid alcohol for at least 24 hours prior. Wear comfortable clothing that gives easy access to the placement area. That's really all you need to show up ready.",
  },
  {
    q: "Do you do walk-ins?",
    a: "I work by appointment only so I can give every client proper time and attention. No walk-ins, but the booking process is simple and worth the wait.",
  },
  {
    q: "Can you tattoo over scars or stretch marks?",
    a: "In many cases, yes, it depends on the age, texture, and location of the scar. Reach out with a photo and I'll let you know what's possible. Healed scars (typically 1–2 years old) tend to work best.",
  },
  {
    q: "How long does a tattoo take to heal?",
    a: "The surface heals in about 2–3 weeks. Full skin-deep healing takes closer to 3 months. I'll walk you through aftercare before you leave so you know exactly how to protect your new piece.",
  },
];

function Item({ q, a, delay }: { q: string; a: string; delay: number }) {
  const [open, setOpen] = useState(false);
  const bodyRef = useRef<HTMLDivElement>(null);
  const itemRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          (entry.target as HTMLElement).style.opacity = "1";
          (entry.target as HTMLElement).style.transform = "translateY(0)";
          obs.unobserve(entry.target);
        }
      },
      { threshold: 0.1 }
    );
    if (itemRef.current) obs.observe(itemRef.current);
    return () => obs.disconnect();
  }, []);

  return (
    <div
      ref={itemRef}
      style={{
        opacity: 0,
        transform: "translateY(20px)",
        transition: `opacity 0.65s cubic-bezier(.22,1,.36,1) ${delay}ms, transform 0.65s cubic-bezier(.22,1,.36,1) ${delay}ms`,
      }}
      className="border-b border-blush/50 last:border-none"
    >
      <button
        onClick={() => setOpen((o) => !o)}
        className="w-full flex items-center justify-between gap-6 py-6 text-left group"
      >
        <span className="font-body text-base text-bark group-hover:text-rose transition-colors duration-200">
          {q}
        </span>
        <span
          className="shrink-0 w-7 h-7 rounded-full border border-blush-deep/40 flex items-center justify-center text-rose transition-transform duration-300"
          style={{ transform: open ? "rotate(45deg)" : "rotate(0deg)" }}
        >
          <svg viewBox="0 0 14 14" className="w-3 h-3 fill-none stroke-current stroke-2">
            <line x1="7" y1="1" x2="7" y2="13" />
            <line x1="1" y1="7" x2="13" y2="7" />
          </svg>
        </span>
      </button>

      <div
        ref={bodyRef}
        style={{
          maxHeight: open ? `${bodyRef.current?.scrollHeight ?? 300}px` : "0px",
          overflow: "hidden",
          transition: "max-height 0.4s cubic-bezier(.22,1,.36,1)",
        }}
      >
        <p className="font-body pb-6 text-base text-bark-light/70 leading-relaxed pr-12">
          {a}
        </p>
      </div>
    </div>
  );
}

export default function FAQ() {
  const headerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          (entry.target as HTMLElement).style.opacity = "1";
          (entry.target as HTMLElement).style.transform = "translateY(0)";
          obs.unobserve(entry.target);
        }
      },
      { threshold: 0.2 }
    );
    if (headerRef.current) obs.observe(headerRef.current);
    return () => obs.disconnect();
  }, []);

  return (
    <section id="faq" className="py-28 bg-cream relative overflow-hidden">
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid md:grid-cols-[1fr_1.6fr] gap-16 md:gap-40 items-start">

          {/* Left — title */}
          <div
            ref={headerRef}
            style={{
              opacity: 0,
              transform: "translateY(30px)",
              transition: "opacity 0.8s cubic-bezier(.22,1,.36,1), transform 0.8s cubic-bezier(.22,1,.36,1)",
            }}
            className="md:sticky md:top-32 text-center md:text-left"
          >
            <p className="text-xs tracking-[0.3em] uppercase text-bark/50 mb-4">Got Questions</p>
            <h2 className="font-heading text-4xl md:text-5xl text-bark leading-tight">
              Frequently Asked
            </h2>
            <FloralDivider className="w-48 mt-6 opacity-70 mx-auto md:mx-0" />
          </div>

          {/* Right — accordion */}
          <div className="bg-petal/60 rounded-3xl px-8 md:px-10 py-2 border border-blush/30 shadow-sm">
            {faqs.map((item, i) => (
              <Item key={i} q={item.q} a={item.a} delay={i * 80} />
            ))}
          </div>

        </div>
      </div>
    </section>
  );
}
