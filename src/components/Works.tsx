"use client";
import { useEffect, useRef, useCallback } from "react";
import { gsap } from "gsap";
import Image from "next/image";
import { FloralDivider } from "./FlowerDecor";
import DrawSVG from "./DrawSVG";

const photos = [
  { id: 1, src: "/tattoos/tattoo-flower.jpeg",         title: "Flower Bloom",    category: "Floral",     left: "calc(50% - 620px)", top: 40,   w: 340, h: 453, speed: 0.14 },
  { id: 2, src: "/tattoos/tattoo-lotus.jpeg",           title: "Lotus",           category: "Botanical",  left: "calc(50% + 230px)", top: 0,    w: 410, h: 547, speed: 0.24 },
  { id: 3, src: "/tattoos/tattoo-wavy.jpeg",            title: "Wavy Line",       category: "Fine Line",  left: "calc(50% - 210px)", top: 200,  w: 430, h: 537, speed: 0.09 },
  { id: 4, src: "/tattoos/tattoo-japanese-inspo.jpeg",  title: "Japanese Inspo",  category: "Floral",     left: "calc(50% + 290px)", top: 740,  w: 330, h: 440, speed: 0.20 },
  { id: 8, src: "/tattoos/tattoo-small-fill.jpeg",      title: "Flash",           category: "Flash",      left: "calc(50% - 570px)", top: 510,  w: 185, h: 185, speed: 0.18 },
  { id: 5, src: "/tattoos/placeholder1.jpg",            title: "Study I",         category: "Minimalist", left: "calc(50% - 600px)", top: 700,  w: 370, h: 493, speed: 0.30 },
  { id: 6, src: "/tattoos/placeholder3.jpg",            title: "Study II",        category: "Botanical",  left: "calc(50% - 175px)", top: 760,  w: 350, h: 467, speed: 0.17 },
  { id: 7, src: "/tattoos/placeholder-4.jpg",           title: "Study III",       category: "Fine Line",  left: "calc(50% - 170px)", top: 1200, w: 350, h: 467, speed: 0.26 },
];

function InstagramButton() {
  const btnRef = useRef<HTMLAnchorElement>(null);
  const fillRef = useRef<HTMLSpanElement>(null);
  const textRef = useRef<HTMLSpanElement>(null);
  const arrowRef = useRef<HTMLSpanElement>(null);

  const handleEnter = useCallback((e: React.MouseEvent<HTMLAnchorElement>) => {
    const btn = btnRef.current;
    const fill = fillRef.current;
    if (!btn || !fill) return;

    const rect = btn.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    gsap.set(fill, { x, y, xPercent: -50, yPercent: -50, scale: 0 });
    gsap.to(fill, { scale: 2.5, duration: 0.5, ease: "power2.out" });
    if (textRef.current) gsap.to(textRef.current, { color: "#FAF8F2", duration: 0.3 });
    if (arrowRef.current) {
      gsap.to(arrowRef.current, { x: 4, color: "#FAF8F2", duration: 0.3 });
    }
  }, []);

  const handleLeave = useCallback((e: React.MouseEvent<HTMLAnchorElement>) => {
    const btn = btnRef.current;
    const fill = fillRef.current;
    if (!btn || !fill) return;

    const rect = btn.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    gsap.to(fill, {
      x, y, xPercent: -50, yPercent: -50,
      scale: 0, duration: 0.4, ease: "power2.in",
    });
    if (textRef.current) gsap.to(textRef.current, { color: "#FAF8F2", duration: 0.3 });
    if (arrowRef.current) {
      gsap.to(arrowRef.current, { x: 0, color: "#FAF8F2", duration: 0.3 });
    }
  }, []);

  const handleMove = useCallback((e: React.MouseEvent<HTMLAnchorElement>) => {
    const btn = btnRef.current;
    if (!btn) return;
    const rect = btn.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width - 0.5) * 8;
    const y = ((e.clientY - rect.top) / rect.height - 0.5) * 4;
    gsap.to(btn, { x, y, duration: 0.3, ease: "power2.out" });
  }, []);

  const handleMoveLeave = useCallback(() => {
    if (btnRef.current) gsap.to(btnRef.current, { x: 0, y: 0, duration: 0.5, ease: "elastic.out(1, 0.4)" });
  }, []);

  return (
    <a
      ref={btnRef}
      href="https://www.instagram.com/chan.inkedd/"
      target="_blank"
      rel="noopener noreferrer"
      onMouseEnter={handleEnter}
      onMouseLeave={(e) => { handleLeave(e); handleMoveLeave(); }}
      onMouseMove={handleMove}
      className="relative inline-flex items-center gap-3 px-10 py-4 rounded-full overflow-hidden cursor-pointer"
      style={{ willChange: "transform", background: "#bcc1a1" }}
    >
      <span
        ref={fillRef}
        className="absolute w-[300px] h-[300px] rounded-full pointer-events-none"
        style={{ background: "#BF8090", top: 0, left: 0, transform: "scale(0)" }}
      />
      <span
        ref={textRef}
        className="relative z-10 text-sm tracking-[0.18em] uppercase font-medium"
        style={{ color: "#FAF8F2" }}
      >
        See more on Instagram
      </span>
      <span ref={arrowRef} className="relative z-10" style={{ color: "#FAF8F2" }}>
        <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <path d="M5 12h14M12 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </span>
    </a>
  );
}

export default function Works() {
  const sectionRef = useRef<HTMLElement>(null);
  const photoRefs = useRef<(HTMLDivElement | null)[]>([]);
  const headerRef = useRef<HTMLDivElement>(null);
  const mobileLeftRef = useRef<HTMLDivElement>(null);
  const mobileRightRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Parallax (desktop + mobile columns)
    let rafId = 0;
    let ticking = false;

    const updateParallax = () => {
      const section = sectionRef.current;
      if (!section) return;
      const scrolled = -section.getBoundingClientRect().top;

      // Desktop floating parallax
      photos.forEach((photo, i) => {
        const el = photoRefs.current[i];
        if (el) {
          el.style.transform = `translate3d(0,${scrolled * photo.speed}px,0)`;
        }
      });

      // Mobile two-column parallax
      if (mobileLeftRef.current) {
        mobileLeftRef.current.style.transform = `translate3d(0,${scrolled * 0.05}px,0)`;
      }
      if (mobileRightRef.current) {
        mobileRightRef.current.style.transform = `translate3d(0,${scrolled * 0.12}px,0)`;
      }
      ticking = false;
    };

    const handleScroll = () => {
      if (!ticking) {
        rafId = requestAnimationFrame(updateParallax);
        ticking = true;
      }
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    updateParallax();

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
      cancelAnimationFrame(rafId);
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
        style={{ width: "clamp(280px, 50vw, 700px)", right: -120, bottom: -60, top: "auto", opacity: 0.55, transform: "scaleX(-1)", zIndex: 0 }}
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
            </div>
          </div>
        ))}
      </div>

      {/* CTA */}
      <div className="hidden md:block text-center pb-20 relative z-10">
        <InstagramButton />
      </div>
    </section>
  );
}
