"use client";
import { useState, useEffect } from "react";
import Image from "next/image";

export default function PhotoFlip() {
  const [isFlipped, setIsFlipped] = useState(false);
  const [delay, setDelay] = useState(3000);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setIsFlipped((prev) => !prev);
      setDelay(8000);
    }, delay);
    return () => clearTimeout(timeout);
  }, [isFlipped, delay]);

  return (
    <div
      className="w-full max-w-[320px] sm:max-w-[360px] md:max-w-[420px] h-[350px] sm:h-[400px] relative cursor-pointer"
      style={{ perspective: "1000px" }}
      onClick={() => {
        setIsFlipped(!isFlipped);
        setDelay(8000);
      }}
    >
      {/* Card A — front by default */}
      <div
        className="absolute inset-0 w-full h-full rounded-[24px] md:rounded-[32px] shadow-xl shadow-black/5 overflow-hidden transition-all duration-700 ease-in-out border border-white/80"
        style={{
          zIndex: isFlipped ? 0 : 10,
          transform: isFlipped
            ? "rotate(6deg) translateX(1rem) translateY(0.5rem)"
            : "rotate(0deg) translateX(0) translateY(0)",
        }}
      >
        <Image
          src="/dyane-portrait1.png"
          alt="Dyane, tattoo artist"
          fill
          className="object-cover"
          sizes="(max-width: 640px) 320px, (max-width: 768px) 360px, 420px"
        />
      </div>

      {/* Card B — back by default */}
      <div
        className="absolute inset-0 w-full h-full rounded-[24px] md:rounded-[32px] shadow-xl shadow-black/5 overflow-hidden transition-all duration-700 ease-in-out border border-white/80"
        style={{
          zIndex: isFlipped ? 10 : 0,
          transform: isFlipped
            ? "rotate(0deg) translateX(0) translateY(0)"
            : "rotate(-6deg) translateX(-1rem) translateY(0.5rem)",
        }}
      >
        <Image
          src="/dyane-portrait3.png"
          alt="Dyane, tattoo artist"
          fill
          className="object-cover"
          sizes="(max-width: 640px) 320px, (max-width: 768px) 360px, 420px"
        />
      </div>
    </div>
  );
}
