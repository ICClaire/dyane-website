"use client";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SmallLeaf } from "./FlowerDecor";

gsap.registerPlugin(ScrollTrigger);
import DrawSVG from "./DrawSVG";
import PhotoFlip from "./PhotoFlip";

/* ── helper: wrap every character in a span ── */
function splitChars(el: HTMLElement) {
  const text = el.textContent ?? "";
  el.innerHTML = "";
  text.split("").forEach((ch) => {
    const span = document.createElement("span");
    span.style.display = "inline-block";
    span.style.opacity = "0";
    span.style.transform = "translateY(40px) rotate(8deg)";
    span.textContent = ch === " " ? "\u00A0" : ch;
    el.appendChild(span);
  });
  return el.querySelectorAll<HTMLSpanElement>("span");
}

/* ── helper: wrap each line in a clip container ── */
function splitLines(el: HTMLElement) {
  const text = el.innerHTML;
  // Wrap content in a measurer to detect line breaks
  el.style.position = "relative";
  const words = text.split(/\s+/);
  el.innerHTML = words.map((w) => `<span class="about-word" style="display:inline">${w}</span>`).join(" ");

  const wordEls = el.querySelectorAll<HTMLSpanElement>(".about-word");
  const lines: HTMLSpanElement[][] = [];
  let currentLine: HTMLSpanElement[] = [];
  let lastTop = -1;

  wordEls.forEach((w) => {
    const top = w.getBoundingClientRect().top;
    if (lastTop !== -1 && Math.abs(top - lastTop) > 4) {
      lines.push(currentLine);
      currentLine = [];
    }
    currentLine.push(w);
    lastTop = top;
  });
  if (currentLine.length) lines.push(currentLine);

  // Rebuild with line wrappers
  el.innerHTML = "";
  const lineEls: HTMLDivElement[] = [];
  lines.forEach((lineWords) => {
    const clipper = document.createElement("div");
    clipper.style.overflow = "hidden";
    clipper.style.position = "relative";

    const inner = document.createElement("div");
    inner.style.transform = "translateY(100%)";
    inner.style.opacity = "0";
    inner.textContent = lineWords.map((w) => w.textContent).join(" ");

    clipper.appendChild(inner);
    el.appendChild(clipper);
    lineEls.push(inner);
  });

  return lineEls;
}

export default function About() {
  const imageRef   = useRef<HTMLDivElement>(null);
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const labelRef   = useRef<HTMLParagraphElement>(null);
  const para1Ref   = useRef<HTMLParagraphElement>(null);
  const para2Ref   = useRef<HTMLParagraphElement>(null);
  const statsRef   = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    let triggered = false;

    const isMobile = window.matchMedia("(max-width: 768px)").matches;

    const obs = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting || triggered) return;
        triggered = true;
        obs.disconnect();

        if (isMobile) {
          // Mobile: show image immediately, simple fade-in for text
          if (imageRef.current) {
            imageRef.current.style.opacity = "1";
            imageRef.current.style.transform = "none";
          }
          [labelRef, headingRef, para1Ref, para2Ref].forEach((ref) => {
            if (ref.current) {
              ref.current.style.transition = "opacity 0.6s ease, transform 0.6s ease";
              ref.current.style.opacity = "1";
              ref.current.style.transform = "none";
            }
          });
          if (statsRef.current) {
            Array.from(statsRef.current.children).forEach((child, i) => {
              const el = child as HTMLElement;
              setTimeout(() => {
                el.style.transition = "opacity 0.5s ease, transform 0.5s ease";
                el.style.opacity = "1";
                el.style.transform = "none";
              }, i * 80);
            });
          }
          return;
        }

        const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

        /* ── Image slide in ── */
        if (imageRef.current) {
          tl.fromTo(
            imageRef.current,
            { opacity: 0, x: -60 },
            { opacity: 1, x: 0, duration: 1 },
            0
          );
        }

        /* ── "About Me" label ── */
        if (labelRef.current) {
          tl.fromTo(
            labelRef.current,
            { opacity: 0, y: 12 },
            { opacity: 1, y: 0, duration: 0.6 },
            0.2
          );
        }

        /* ── Heading: fade + slide up ── */
        if (headingRef.current) {
          tl.fromTo(
            headingRef.current,
            { opacity: 0, y: 30 },
            { opacity: 1, y: 0, duration: 0.8 },
            0.35
          );
        }

        /* ── Paragraphs: line-by-line clip reveal ── */
        const paraDelay = 0.8;
        [para1Ref, para2Ref].forEach((ref, pi) => {
          if (!ref.current) return;
          ref.current.style.opacity = "1";
          ref.current.style.transform = "none";
          const lineEls = splitLines(ref.current);
          tl.to(
            lineEls,
            {
              y: 0,
              opacity: 1,
              duration: 0.7,
              stagger: 0.08,
              ease: "power2.out",
            },
            paraDelay + pi * 0.3
          );
        });

        /* ── Stats: bounce up ── */
        if (statsRef.current) {
          const statItems = statsRef.current.children;
          tl.fromTo(
            statItems,
            { opacity: 0, y: 30, scale: 0.9 },
            {
              opacity: 1,
              y: 0,
              scale: 1,
              duration: 0.7,
              stagger: 0.12,
              ease: "back.out(2)",
            },
            1.3
          );
        }
      },
      { threshold: 0.15 }
    );

    obs.observe(section);

    /* ── Sparkle entrance animation ── */
    const sparkles = section.querySelectorAll<HTMLElement>(".about-sparkle");
    gsap.set(sparkles, { autoAlpha: 0, scale: 0, rotation: -45 });
    gsap.to(sparkles, {
      autoAlpha: 1,
      scale: 1,
      rotation: 0,
      duration: 0.8,
      ease: "back.out(1.7)",
      stagger: 0.12,
      scrollTrigger: {
        trigger: section,
        start: "top 80%",
        toggleActions: "play none none reverse",
      },
    });

    return () => {
      obs.disconnect();
      ScrollTrigger.getAll().forEach(t => t.kill());
    };
  }, []);

  const stats = [
    { value: "500+", label: "Tattoos Done" },
    { value: "4+", label: "Years Experience" },
    { value: "100%", label: "Custom Designs" },
  ];

  return (
    <section ref={sectionRef} id="about" className="py-12 md:py-28 bg-parchment/50 relative overflow-hidden">
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid md:grid-cols-2 gap-16 items-center">

          {/* Image side */}
          <div
            ref={imageRef}
            style={{ opacity: 0, transform: "translateY(20px)" }}
            className="relative z-[2] flex items-center justify-center"
          >
            <PhotoFlip />
            <SmallLeaf className="absolute -top-4 -left-4 w-10 h-10 opacity-60 rotate-12" />
          </div>

          {/* Text side */}
          <div className="flex flex-col">
            <p ref={labelRef} className="hidden md:block text-xs tracking-[0.3em] uppercase text-bark/50 mb-4" style={{ opacity: 0, transform: "translateY(12px)" }}>
              About Me
            </p>

            <div className="relative inline-block mb-6">
              {/* Top: medium sparkle */}
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/sparkle/sparkle.svg"
                alt=""
                className="about-sparkle absolute pointer-events-none w-5 md:w-8"
                style={{ top: "-20%", right: "20%" }}
              />
              {/* Small outline sparkle */}
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/sparkle/outline-sparkle.svg"
                alt=""
                className="about-sparkle absolute pointer-events-none w-1.5 md:w-3"
                style={{ top: "-8%", right: "14%" }}
              />
              {/* Tiny dot */}
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/sparkle/full-sparkle.svg"
                alt=""
                className="about-sparkle absolute pointer-events-none w-1 md:w-1.5"
                style={{ top: "5%", right: "12%" }}
              />
              {/* Bottom: smaller sparkle */}
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/sparkle/sparkle.svg"
                alt=""
                className="about-sparkle absolute pointer-events-none w-4 md:w-6"
                style={{ bottom: "-15%", right: "10%" }}
              />
              {/* Tiny dot near bottom sparkle */}
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/sparkle/full-sparkle.svg"
                alt=""
                className="about-sparkle absolute pointer-events-none w-1 md:w-1.5"
                style={{ bottom: "-5%", right: "16%" }}
              />

              <h2 ref={headingRef} className="font-heading text-[2.8rem] md:text-6xl text-bark leading-tight whitespace-nowrap" style={{ opacity: 0, transform: "translateY(20px)" }}>
                Hello, I&rsquo;m Dyane.
              </h2>
            </div>

            <div className="space-y-4 text-lg font-medium text-bark-light leading-relaxed">
              <p ref={para1Ref} style={{ opacity: 0, transform: "translateY(16px)" }}>
                Fine-line tattoo artist based in Fleetwood, B.C. at Ink House.
                Every piece is sketched from scratch. No templates, no flash. Just
                art made specifically for you, your body, and your story.
              </p>
              <p ref={para2Ref} style={{ opacity: 0, transform: "translateY(16px)" }}>
                My sessions are calm, collaborative, and treated like a baptism
                moment. Something sacred, meaningful, and entirely your own.
              </p>
            </div>

            {/* Stats */}
            <div ref={statsRef} className="flex gap-8 mt-10">
              {stats.map((stat) => (
                <div key={stat.label} style={{ opacity: 0, transform: "translateY(16px)" }}>
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
