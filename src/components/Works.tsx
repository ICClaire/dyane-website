"use client";
import { useEffect, useRef } from "react";
import Image from "next/image";
import { FloralDivider } from "./FlowerDecor";
import DrawSVG from "./DrawSVG";

const photos = [
  { id: 1, src: "/tattoos/tattoo-flower.jpeg",         title: "Flower Bloom",    category: "Floral",     left: "calc(50% - 680px)", top: 40,   w: 420, h: 560, speed: 0.14 },
  { id: 2, src: "/tattoos/tattoo-lotus.jpeg",           title: "Lotus",           category: "Botanical",  left: "calc(50% + 260px)", top: 0,    w: 440, h: 587, speed: 0.24 },
  { id: 3, src: "/tattoos/tattoo-wavy.jpeg",            title: "Wavy Line",       category: "Fine Line",  left: "calc(50% - 230px)", top: 340,  w: 380, h: 380, speed: 0.09 },
  { id: 4, src: "/tattoos/tattoo-japanese-inspo.jpeg",  title: "Japanese Inspo",  category: "Floral",     left: "calc(50% + 320px)", top: 620,  w: 410, h: 547, speed: 0.20 },
  { id: 5, src: "/tattoos/placeholder1.jpg",            title: "Study I",         category: "Minimalist", left: "calc(50% - 650px)", top: 720,  w: 400, h: 533, speed: 0.30 },
  { id: 6, src: "/tattoos/placeholder3.jpg",            title: "Study II",        category: "Botanical",  left: "calc(50% - 190px)", top: 760,  w: 440, h: 587, speed: 0.17 },
  { id: 7, src: "/tattoos/placeholder-4.jpg",           title: "Study III",       category: "Fine Line",  left: "calc(50% - 185px)", top: 1240, w: 370, h: 493, speed: 0.26 },
];

export default function Works() {
  const sectionRef = useRef<HTMLElement>(null);
  const photoRefs = useRef<(HTMLDivElement | null)[]>([]);
  const headerRef = useRef<HTMLDivElement>(null);
  const mobileLeftRef = useRef<HTMLDivElement>(null);
  const mobileRightRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Parallax (desktop + mobile columns)
    const handleScroll = () => {
      const section = sectionRef.current;
      if (!section) return;
      const scrolled = -section.getBoundingClientRect().top;

      // Desktop floating parallax
      photos.forEach((photo, i) => {
        const el = photoRefs.current[i];
        if (el) {
          el.style.transform = `translateY(${scrolled * photo.speed}px)`;
        }
      });

      // Mobile two-column parallax
      if (mobileLeftRef.current) {
        mobileLeftRef.current.style.transform = `translateY(${scrolled * 0.05}px)`;
      }
      if (mobileRightRef.current) {
        mobileRightRef.current.style.transform = `translateY(${scrolled * 0.12}px)`;
      }
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    // Entrance fade
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            // Header
            if (headerRef.current) {
              headerRef.current.style.opacity = "1";
              headerRef.current.style.transform = "translateY(0)";
            }
            // Desktop photos staggered
            photoRefs.current.forEach((el, i) => {
              if (el) {
                setTimeout(() => {
                  el.style.opacity = "1";
                }, i * 120);
              }
            });
            // Mobile columns fade in
            if (mobileLeftRef.current) mobileLeftRef.current.style.opacity = "1";
            if (mobileRightRef.current) mobileRightRef.current.style.opacity = "1";
            obs.disconnect();
          }
        });
      },
      { threshold: 0.05 }
    );
    if (sectionRef.current) obs.observe(sectionRef.current);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      obs.disconnect();
    };
  }, []);

  const leftPhotos  = photos.filter((_, i) => i % 2 === 0);
  const rightPhotos = photos.filter((_, i) => i % 2 === 1);

  return (
    <section ref={sectionRef} id="works" className="bg-parchment/50 overflow-hidden relative">
      {/* Header */}
      <div className="relative z-10 pt-28 pb-6 md:pb-10 px-6 md:px-16">
        <div
          ref={headerRef}
          style={{
            opacity: 0,
            transform: "translateY(28px)",
            transition: "opacity 0.85s cubic-bezier(.22,1,.36,1), transform 0.85s cubic-bezier(.22,1,.36,1)",
          }}
        >
          <h2 className="font-heading text-[4rem] leading-[0.85] md:text-[10rem] lg:text-[13rem] text-rose -ml-1 md:-ml-3">
            My Work
          </h2>
          <FloralDivider className="w-48 mt-6 opacity-50" />
        </div>
      </div>

      {/* Two-flower decoration */}
      <DrawSVG
        src="/two-flower.svg"
        className="absolute pointer-events-none select-none"
        style={{ width: "clamp(280px, 50vw, 700px)", right: -120, bottom: 60, top: "auto", opacity: 0.55, transform: "scaleX(-1)", zIndex: 1 }}
        svgStyle="width:100%;height:auto;display:block;"
        triggerOnView
        delayPerStroke={30}
      />

      {/* Mobile two-column parallax */}
      <div className="md:hidden flex gap-3 px-4 pb-16">
        {/* Left column — slower */}
        <div
          ref={mobileLeftRef}
          className="flex-1 flex flex-col gap-3"
          style={{ willChange: "transform", opacity: 0, transition: "opacity 0.8s ease" }}
        >
          {leftPhotos.map((photo) => (
            <div key={photo.id} className="overflow-hidden shadow-md cursor-pointer group">
              <div className="relative aspect-[3/4]">
                <Image src={photo.src} alt={photo.title} fill className="object-cover" sizes="50vw" />
                <div className="absolute inset-0 bg-bark/0 group-hover:bg-bark/25 transition-colors duration-300" />
                <div className="absolute bottom-0 left-0 right-0 p-2 bg-gradient-to-t from-bark/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <p className="font-heading text-cream text-sm">{photo.title}</p>
                  <p className="text-cream/70 text-[9px] tracking-widest uppercase">{photo.category}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
        {/* Right column — faster + offset start */}
        <div
          ref={mobileRightRef}
          className="flex-1 flex flex-col gap-3 mt-10"
          style={{ willChange: "transform", opacity: 0, transition: "opacity 0.8s ease 150ms" }}
        >
          {rightPhotos.map((photo) => (
            <div key={photo.id} className="overflow-hidden shadow-md cursor-pointer group">
              <div className="relative aspect-[3/4]">
                <Image src={photo.src} alt={photo.title} fill className="object-cover" sizes="50vw" />
                <div className="absolute inset-0 bg-bark/0 group-hover:bg-bark/25 transition-colors duration-300" />
                <div className="absolute bottom-0 left-0 right-0 p-2 bg-gradient-to-t from-bark/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <p className="font-heading text-cream text-sm">{photo.title}</p>
                  <p className="text-cream/70 text-[9px] tracking-widest uppercase">{photo.category}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Desktop floating photos */}
      <div className="hidden md:block relative h-[2400px]">
        {photos.map((photo, i) => (
          <div
            key={photo.id}
            ref={el => { photoRefs.current[i] = el; }}
            style={{
              position: "absolute",
              left: photo.left,
              top: photo.top,
              width: photo.w,
              zIndex: i % 2 === 0 ? 3 : 2,
              opacity: 0,
              transform: `translateY(0px)`,
              willChange: "transform",
              transition: "opacity 0.8s ease",
            }}
            className="overflow-hidden shadow-lg cursor-pointer group"
          >
            <div className="relative" style={{ width: photo.w, height: photo.h }}>
              <Image
                src={photo.src}
                alt={photo.title}
                fill
                className="object-cover"
                sizes="450px"
              />
              <div className="absolute inset-0 bg-bark/0 group-hover:bg-bark/25 transition-colors duration-300" />
              <div className="absolute bottom-0 left-0 right-0 p-3 bg-gradient-to-t from-bark/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <p className="font-heading text-cream text-lg">{photo.title}</p>
                <p className="text-cream/70 text-[10px] tracking-widest uppercase">{photo.category}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* CTA */}
      <div className="text-center pb-20 relative z-10">
        <a
          href="https://www.instagram.com/chan.inkedd/"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-3 text-xs tracking-[0.2em] uppercase text-bark-light hover:text-rose transition-colors group"
        >
          <span>See more on Instagram</span>
          <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
            <path d="M5 12h14M12 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </a>
      </div>
    </section>
  );
}
