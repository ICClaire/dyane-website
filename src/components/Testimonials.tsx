"use client";
import { useEffect, useRef } from "react";
import Image from "next/image";
import { FloralDivider, SmallFlower } from "./FlowerDecor";

const reviews = [
  {
    name: "Sophie L.",
    location: "Paris",
    rating: 5,
    text: "Dyane transformed my rough idea into the most delicate little fern on my wrist. I get compliments every single day. Her attention to detail and gentle touch made the whole experience so special.",
    tattoo: "Botanical Fern · Wrist",
  },
  {
    name: "Margot B.",
    location: "Lyon",
    rating: 5,
    text: "I was nervous about my first tattoo but Dyane made me feel completely at ease. The rose she designed for me is beyond anything I imagined, so soft, so fine, so perfectly placed.",
    tattoo: "Wild Rose · Collarbone",
  },
  {
    name: "Amara K.",
    location: "Amsterdam",
    rating: 5,
    text: "Worth every bit of the wait. The consultation was thorough and warm, and the tattoo itself is just stunning. Dyane truly has a gift for making art that feels like it belongs on your skin.",
    tattoo: "Minimalist Branch · Ankle",
  },
];

export default function Testimonials() {
  const headerRef = useRef<HTMLDivElement>(null);
  const cardRefs  = useRef<(HTMLDivElement | null)[]>([]);
  const ratingRef = useRef<HTMLDivElement>(null);

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
      { threshold: 0.15 }
    );
    if (headerRef.current) obs.observe(headerRef.current);
    if (ratingRef.current)  obs.observe(ratingRef.current);
    cardRefs.current.forEach((el) => el && obs.observe(el));
    return () => obs.disconnect();
  }, []);

  return (
    <section id="testimonials" className="pt-28 pb-4 md:py-28 bg-blush/25 overflow-hidden relative">
      {/* one-flower-pink decoration */}
      <Image
        src="/one-flower-pink.png"
        alt=""
        width={160}
        height={160}
        className="absolute bottom-10 right-8 w-16 md:w-36 h-auto opacity-40 pointer-events-none select-none -rotate-6"
      />

      <div className="max-w-6xl mx-auto px-6">
        {/* Header */}
        <div
          ref={headerRef}
          style={{
            opacity: 0,
            transform: "translateY(30px)",
            transition: "opacity 0.8s cubic-bezier(.22,1,.36,1), transform 0.8s cubic-bezier(.22,1,.36,1)",
          }}
          className="text-center mb-16"
        >
          <p className="text-xs tracking-[0.3em] uppercase text-bark/50 mb-4">Kind Words</p>
          <h2 className="font-heading text-5xl md:text-6xl text-bark">
            What Clients Say
          </h2>
          {/* Overall rating */}
          <div
            ref={ratingRef}
            style={{
              opacity: 0,
              transform: "translateY(24px)",
              transition: "opacity 0.8s cubic-bezier(.22,1,.36,1) 300ms, transform 0.8s cubic-bezier(.22,1,.36,1) 300ms",
            }}
            className="mt-6 flex flex-col items-center gap-2"
          >
            <div className="flex gap-1">
              {[1,2,3,4,5].map(s => (
                <svg key={s} viewBox="0 0 16 16" className="w-4 h-4 fill-rose">
                  <path d="M8 0l2 5.5H15l-4.5 3.5 1.5 5.5L8 11l-4 3.5 1.5-5.5L1 5.5h5L8 0z" />
                </svg>
              ))}
            </div>
            <p className="text-sm text-bark-light/60">
              <span className="font-body font-bold text-bark text-xl">5.0</span>
              {" "}· Over 200 reviews
            </p>
          </div>
        </div>

        {/* Cards */}
        <div className="grid md:grid-cols-3 gap-6 md:gap-8">
          {reviews.map((r, i) => (
            <div
              key={i}
              ref={(el) => { cardRefs.current[i] = el; }}
              style={{
                opacity: 0,
                transform: "translateY(40px)",
                transition: `opacity 0.75s cubic-bezier(.22,1,.36,1) ${i * 150}ms, transform 0.75s cubic-bezier(.22,1,.36,1) ${i * 150}ms`,
              }}
              className="bg-cream/80 backdrop-blur-sm rounded-2xl p-7 border border-blush-deep/20 hover:border-rose/30 transition-all duration-300 hover:shadow-md group flex flex-col"
            >
              {/* Quote mark */}
              <div className="font-heading text-6xl text-rose/20 leading-none mb-4 group-hover:text-rose/30 transition-colors select-none">
                &ldquo;
              </div>

              {/* Review text */}
              <p className="font-body text-base text-bark-light/75 leading-relaxed flex-1 mb-6">
                {r.text}
              </p>

              {/* Divider */}
              <div className="h-px bg-blush/60 mb-5" />

              {/* Stars */}
              <div className="flex gap-0.5 mb-3">
                {Array.from({ length: r.rating }).map((_, si) => (
                  <svg key={si} viewBox="0 0 12 12" className="w-3 h-3 fill-rose">
                    <path d="M6 0l1.5 3.5L11 4l-2.5 2.5.5 3.5L6 8.5 3 10l.5-3.5L1 4l3.5-.5L6 0z" />
                  </svg>
                ))}
              </div>

              {/* Author */}
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-body font-semibold text-base text-bark">{r.name}</p>
                  <p className="text-xs text-bark-light/50 tracking-wider">{r.location}</p>
                </div>
                <SmallFlower className="w-8 h-8 opacity-30 group-hover:opacity-50 transition-opacity" />
              </div>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
