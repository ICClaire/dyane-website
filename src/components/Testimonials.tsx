"use client";
import { useEffect, useRef } from "react";
import Image from "next/image";
import { gsap } from "gsap";

const topRow = [
  {
    name: "Sophie L.",
    text: "Dyane transformed my rough idea into the most delicate little fern on my wrist. I get compliments every single day.",
    tattoo: "Botanical Fern · Wrist",
    img: "/tattoos/tattoo-flower.jpeg",
  },
  {
    name: "Margot B.",
    text: "I was nervous about my first tattoo but Dyane made me feel completely at ease. The rose she designed is beyond anything I imagined.",
    tattoo: "Wild Rose · Collarbone",
    img: "/tattoos/tattoo-lotus.jpeg",
  },
  {
    name: "Amara K.",
    text: "Worth every bit of the wait. Dyane truly has a gift for making art that feels like it belongs on your skin.",
    tattoo: "Minimalist Branch · Ankle",
    img: "/tattoos/tattoo-wavy.jpeg",
  },
  {
    name: "Lena T.",
    text: "She listened to everything I wanted and then elevated it. The fine lines are so crisp and elegant. A true artist.",
    tattoo: "Floral Sleeve · Forearm",
    img: "/tattoos/tattoo-japanese-inspo.jpeg",
  },
];

const bottomRow = [
  {
    name: "Ava M.",
    text: "The most calming tattoo experience I have ever had. Dyane's energy is so warm and her work is incredibly precise.",
    tattoo: "Lavender Sprig · Ribcage",
    img: "/tattoos/reach-out.jpg",
  },
  {
    name: "Chloe R.",
    text: "I drove three hours for this appointment and I would do it again in a heartbeat. Absolutely stunning fine line work.",
    tattoo: "Butterfly · Shoulder",
    img: "/tattoos/placeholder1.jpg",
  },
  {
    name: "Nina W.",
    text: "Dyane made my memorial tattoo feel so personal and sacred. I cried happy tears when I saw the final design.",
    tattoo: "Forget-Me-Not · Inner Arm",
    img: "/tattoos/placeholder3.jpg",
  },
  {
    name: "Jade P.",
    text: "Her sketches alone are works of art. The final tattoo exceeded every expectation I had. Can not wait to go back.",
    tattoo: "Peony · Upper Arm",
    img: "/tattoos/placeholder-4.jpg",
  },
];

function MarqueeRow({
  reviews,
  direction,
  rowRef,
}: {
  reviews: typeof topRow;
  direction: "left" | "right";
  rowRef: React.RefObject<HTMLDivElement | null>;
}) {
  // Duplicate for seamless loop
  const items = [...reviews, ...reviews];

  return (
    <div className="overflow-hidden">
      <div
        ref={rowRef}
        className="flex gap-5 md:gap-6 w-max"
        style={{ willChange: "transform" }}
      >
        {items.map((r, i) => (
          <div
            key={`${r.name}-${i}`}
            className="group relative flex-shrink-0 w-[260px] sm:w-[380px] md:w-[420px] h-[220px] sm:h-[280px] rounded-2xl overflow-hidden cursor-pointer"
          >
            {/* Default card content */}
            <div className="absolute inset-0 bg-cream/80 border border-blush-deep/15 rounded-2xl p-5 sm:p-8 flex flex-col justify-between transition-opacity duration-500 group-hover:opacity-0">
              {/* Quote mark */}
              <div className="text-rose/25 mb-2 sm:mb-3">
                <svg width="22" height="16" viewBox="0 0 28 20" fill="currentColor" className="sm:w-7 sm:h-5">
                  <path d="M0 20V11.5C0 4.5 3.5 1 10.5 0l1.5 3C8 4.2 6 6.5 5.8 10H11v10H0zm16.5 0V11.5C16.5 4.5 20 1 27 0l1.5 3C24.5 4.2 22.5 6.5 22.3 10H27.5v10h-11z" />
                </svg>
              </div>

              {/* Review text */}
              <p className="text-[13px] sm:text-base text-bark-light leading-relaxed mb-3 sm:mb-6 flex-1 line-clamp-4 sm:line-clamp-none">
                {r.text}
              </p>

              {/* Author + tattoo photo */}
              <div className="flex items-center gap-2 sm:gap-3">
                <div className="relative w-8 h-8 sm:w-10 sm:h-10 rounded-full overflow-hidden flex-shrink-0 border border-blush-deep/20">
                  <Image
                    src={r.img}
                    alt={r.tattoo}
                    fill
                    className="object-cover"
                    sizes="40px"
                  />
                </div>
                <div>
                  <p className="text-sm font-semibold text-bark">{r.name}</p>
                  <p className="text-xs text-bark-light/50 tracking-wide">{r.tattoo}</p>
                </div>
              </div>
            </div>

            {/* Tattoo image revealed on hover */}
            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
              <Image
                src={r.img}
                alt={r.tattoo}
                fill
                className="object-cover rounded-2xl scale-105 group-hover:scale-100 transition-transform duration-700"
                sizes="420px"
              />
              {/* Name overlay */}
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/60 to-transparent p-6 pt-16 rounded-b-2xl">
                <p className="text-sm font-semibold text-white">{r.name}</p>
                <p className="text-xs text-white/60 tracking-wide">{r.tattoo}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function Testimonials() {
  const topRef = useRef<HTMLDivElement>(null);
  const bottomRef = useRef<HTMLDivElement>(null);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const topTrack = topRef.current;
    const bottomTrack = bottomRef.current;
    if (!topTrack || !bottomTrack) return;

    // Calculate half width (one set of cards)
    const topHalf = topTrack.scrollWidth / 2;
    const bottomHalf = bottomTrack.scrollWidth / 2;

    const isMobile = window.matchMedia("(max-width: 768px)").matches;
    const speed = isMobile ? 60 : 40;

    const ctx = gsap.context(() => {
      // Top row: moves left
      gsap.set(topTrack, { x: 0 });
      gsap.to(topTrack, {
        x: -topHalf,
        duration: speed,
        ease: "none",
        repeat: -1,
      });

      // Bottom row: starts offset, moves right
      gsap.set(bottomTrack, { x: -bottomHalf });
      gsap.to(bottomTrack, {
        x: 0,
        duration: speed,
        ease: "none",
        repeat: -1,
      });
    });

    // Pause on hover
    const section = sectionRef.current;
    const handleEnter = () => {
      gsap.to([topTrack, bottomTrack], { timeScale: 0.3, duration: 0.6 });
    };
    const handleLeave = () => {
      gsap.to([topTrack, bottomTrack], { timeScale: 1, duration: 0.6 });
    };

    // Use gsap tweens for speed control instead
    const allTweens = gsap.getTweensOf([topTrack, bottomTrack]);

    const pauseEnter = () => {
      allTweens.forEach((t) => gsap.to(t, { timeScale: 0.2, duration: 0.8 }));
    };
    const pauseLeave = () => {
      allTweens.forEach((t) => gsap.to(t, { timeScale: 1, duration: 0.8 }));
    };

    section?.addEventListener("mouseenter", pauseEnter);
    section?.addEventListener("mouseleave", pauseLeave);

    return () => {
      section?.removeEventListener("mouseenter", pauseEnter);
      section?.removeEventListener("mouseleave", pauseLeave);
      ctx.revert();
    };
  }, []);

  // Entrance animation
  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            gsap.from(section.querySelectorAll(".reveal"), {
              opacity: 0,
              y: 40,
              duration: 0.8,
              ease: "power3.out",
              stagger: 0.1,
            });
            obs.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 }
    );
    obs.observe(section);
    return () => obs.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="testimonials"
      className="py-24 md:py-32 bg-parchment/50 relative overflow-hidden"
    >
      {/* Header */}
      <div className="max-w-6xl mx-auto px-6 text-center mb-14">
        <h2 className="reveal font-heading text-5xl md:text-6xl text-bark leading-tight">
          What clients are saying
        </h2>
        <div className="reveal mt-5 flex items-center justify-center gap-3">
          <div className="flex gap-1">
            {[1, 2, 3, 4, 5].map((s) => (
              <svg key={s} viewBox="0 0 16 16" className="w-3.5 h-3.5 fill-rose">
                <path d="M8 0l2 5.5H15l-4.5 3.5 1.5 5.5L8 11l-4 3.5 1.5-5.5L1 5.5h5L8 0z" />
              </svg>
            ))}
          </div>
          <span className="text-sm text-bark-light/50">5.0 · 200+ reviews</span>
        </div>
      </div>

      {/* Marquee rows */}
      <div className="space-y-5 md:space-y-6">
        <MarqueeRow reviews={topRow} direction="left" rowRef={topRef} />
        <MarqueeRow reviews={bottomRow} direction="right" rowRef={bottomRef} />
      </div>

      {/* Fade edges */}
      <div className="pointer-events-none absolute inset-y-0 left-0 w-20 md:w-40 bg-gradient-to-r from-parchment/80 to-transparent z-10" />
      <div className="pointer-events-none absolute inset-y-0 right-0 w-20 md:w-40 bg-gradient-to-l from-parchment/80 to-transparent z-10" />
    </section>
  );
}
