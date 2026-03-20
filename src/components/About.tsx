"use client";
import { useEffect, useRef } from "react";
import { FloralDivider, SmallLeaf } from "./FlowerDecor";
import DrawSVG from "./DrawSVG";
import PhotoFlip from "./PhotoFlip";

export default function About() {
  const imageRef = useRef<HTMLDivElement>(null);
  const textRef  = useRef<HTMLDivElement>(null);
  const tagRefs  = useRef<(HTMLSpanElement | null)[]>([]);

  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            (entry.target as HTMLElement).style.opacity = "1";
            (entry.target as HTMLElement).style.transform = "none";
            obs.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15 }
    );
    if (imageRef.current) obs.observe(imageRef.current);
    if (textRef.current)  obs.observe(textRef.current);
    tagRefs.current.forEach((el) => el && obs.observe(el));
    return () => obs.disconnect();
  }, []);

  const stats = [
    { value: "500+", label: "Tattoos Done" },
    { value: "4+", label: "Years Experience" },
    { value: "100%", label: "Custom Designs" },
  ];

  return (
    <section id="about" className="py-28 bg-parchment/50 relative overflow-hidden">
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid md:grid-cols-2 gap-16 items-center">

          {/* Image side */}
          <div
            ref={imageRef}
            style={{
              opacity: 0,
              transform: "translateX(-50px)",
              transition: "opacity 0.95s cubic-bezier(.22,1,.36,1), transform 0.95s cubic-bezier(.22,1,.36,1)",
            }}
            className="relative z-[2] flex items-center justify-center"
          >
            <PhotoFlip />
            <SmallLeaf className="absolute -top-4 -left-4 w-10 h-10 opacity-60 rotate-12" />
          </div>

          {/* Text side */}
          <div
            ref={textRef}
            style={{
              opacity: 0,
              transform: "translateX(50px)",
              transition: "opacity 0.95s cubic-bezier(.22,1,.36,1) 150ms, transform 0.95s cubic-bezier(.22,1,.36,1) 150ms",
            }}
            className="flex flex-col"
          >
            <p className="text-xs tracking-[0.3em] uppercase text-bark/50 mb-4">About Me</p>

            <h2 className="font-heading text-5xl md:text-6xl text-bark leading-tight mb-6">
              Hello, I&rsquo;m Dyane.
            </h2>

            <div className="space-y-4 text-lg font-medium text-bark-light leading-relaxed">
              <p>
                Fine-line tattoo artist based in Fleetwood, B.C. at Ink House.
                Every piece is sketched from scratch. No templates, no flash. Just
                art made specifically for you, your body, and your story.
              </p>
              <p>
                My sessions are calm, collaborative, and treated like a baptism
                moment. Something sacred, meaningful, and entirely your own.
              </p>
            </div>

            {/* Stats */}
            <div className="flex gap-8 mt-10">
              {stats.map((stat, i) => (
                <div
                  key={stat.label}
                  ref={(el) => { tagRefs.current[i] = el; }}
                  style={{
                    opacity: 0,
                    transform: "translateY(16px)",
                    transition: `opacity 0.6s ease ${300 + i * 100}ms, transform 0.6s ease ${300 + i * 100}ms`,
                  }}
                >
                  <p className="text-2xl font-semibold text-bark">{stat.value}</p>
                  <p className="text-xs tracking-wider uppercase text-bark-light/50 mt-1">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>

      {/* Two-flower decoration — bottom right */}
      <DrawSVG
        src="/two-flower.svg"
        className="absolute pointer-events-none select-none"
        style={{ width: 280, right: -40, bottom: -20, opacity: 0.3, zIndex: 1 }}
        svgStyle="width:100%;height:auto;display:block;"
        triggerOnView
        delayPerStroke={30}
      />
    </section>
  );
}
