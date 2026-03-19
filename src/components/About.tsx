"use client";
import { useEffect, useRef } from "react";
import Image from "next/image";
import { FloralDivider, SmallLeaf } from "./FlowerDecor";

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

  const tags = ["Fine Line", "Botanical", "Minimalist", "Floral", "Watercolour"];

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
            className="relative"
          >
            <div className="relative aspect-[3/4] rounded-2xl overflow-hidden shadow-sm">
              <Image
                src="/dyane-portrait1.png"
                alt="Dyane, tattoo artist"
                fill
                className="object-cover object-top"
                priority
              />
            </div>
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

            <FloralDivider className="w-48 mb-8 opacity-70" />

            <div className="space-y-4 text-base text-bark-light/80 leading-relaxed">
              <p>
                I&rsquo;m a fine-line tattoo artist based in Fleetwood, B.C. at Ink House.
                Every session I do is treated as a baptism moment, something sacred,
                meaningful, and entirely your own. From the first sketch to the final
                line, each piece is special to me.
              </p>
              <p>
                I love getting to know the people who sit in my chair, not just
                why you&rsquo;re getting the tattoo, but who you are and where you&rsquo;re
                headed. That energy shapes everything. My sessions are therapeutic,
                calm, and creatively collaborative.
              </p>
              <p>
                I sketch every design from scratch, draft by draft, until it&rsquo;s
                perfect. No templates, no flash. Just art made specifically for
                you, your body, and your story.
              </p>
            </div>

            {/* Tags */}
            <div className="flex flex-wrap gap-2 mt-8">
              {tags.map((tag, i) => (
                <span
                  key={tag}
                  ref={(el) => { tagRefs.current[i] = el; }}
                  style={{
                    opacity: 0,
                    transform: "translateY(16px)",
                    transition: `opacity 0.6s ease ${300 + i * 80}ms, transform 0.6s ease ${300 + i * 80}ms`,
                  }}
                  className="text-xs tracking-wider uppercase px-3 py-1.5 rounded-full bg-sage-pale/60 text-sage border border-sage-light/50"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
