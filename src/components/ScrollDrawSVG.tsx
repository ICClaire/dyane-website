"use client";
import { useEffect, useRef, useState } from "react";

interface Props {
  src: string;
  className?: string;
  style?: React.CSSProperties;
  svgStyle?: string;
  /** Animate on load instead of on scroll */
  autoPlay?: boolean;
  /** Duration in ms for autoPlay animation (default 3000) */
  autoPlayDuration?: number;
}

const STEM_FILLS = new Set(["#637A39", "#8D957E"]);

function isStem(el: Element) {
  const fill = el.getAttribute("fill") ?? "";
  return STEM_FILLS.has(fill);
}

export default function ScrollDrawSVG({ src, className, style, svgStyle, autoPlay = false, autoPlayDuration = 3000 }: Props) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [svgContent, setSvgContent] = useState("");

  useEffect(() => {
    fetch(src)
      .then((r) => r.text())
      .then((text) => {
        const parser = new DOMParser();
        const doc = parser.parseFromString(text, "image/svg+xml");
        const svgEl = doc.documentElement;
        if (svgStyle) svgEl.setAttribute("style", svgStyle);

        svgEl
          .querySelectorAll("path, circle, ellipse, polyline, polygon, line")
          .forEach((el) => {
            if (isStem(el)) {
              // Stems: convert to stroked paths and hide for scroll animation
              const fill = el.getAttribute("fill")!;
              el.setAttribute("stroke", fill);
              el.setAttribute("fill", "none");
              el.setAttribute("stroke-width", "1.5");
              el.setAttribute("stroke-dasharray", "1");
              el.setAttribute("stroke-dashoffset", "1");
            }
            // Petals: leave fill intact, show immediately (no changes needed)
          });

        setSvgContent(new XMLSerializer().serializeToString(svgEl));
      });
  }, [src, svgStyle]);

  useEffect(() => {
    if (!svgContent || !containerRef.current) return;

    const allEls = Array.from(
      containerRef.current.querySelectorAll<SVGGeometryElement>(
        "path, circle, ellipse, polyline, polygon, line"
      )
    );

    // Only animate stem elements
    type StemEntry = { el: SVGGeometryElement; length: number; yPos: number };
    const stems: StemEntry[] = allEls
      .filter((el) => el.getAttribute("fill") === "none" && el.getAttribute("stroke") !== null)
      .map((el) => {
        let length = 0;
        let yPos = 0;
        try {
          length = el.getTotalLength();
          yPos = el.getBBox().y;
        } catch { /* skip */ }
        el.setAttribute("stroke-dasharray", String(length));
        el.setAttribute("stroke-dashoffset", String(length));
        return { el, length, yPos };
      });

    stems.sort((a, b) => a.yPos - b.yPos);

    const n = stems.length;
    const overlap = 0.7;

    if (autoPlay) {
      // Animate on load with requestAnimationFrame
      const startTime = performance.now();
      let rafId: number;

      const tick = (now: number) => {
        const global = Math.min(1, (now - startTime) / autoPlayDuration);

        stems.forEach(({ el, length }, i) => {
          if (!length) return;
          const start = i / (n + n * overlap);
          const end = (i + n * overlap) / (n + n * overlap);
          const p = Math.min(1, Math.max(0, (global - start) / (end - start)));
          el.setAttribute("stroke-dashoffset", String(length * (1 - p)));
        });

        if (global < 1) rafId = requestAnimationFrame(tick);
      };

      rafId = requestAnimationFrame(tick);
      return () => cancelAnimationFrame(rafId);
    }

    const handleScroll = () => {
      const container = containerRef.current;
      if (!container) return;
      const rect = container.getBoundingClientRect();
      const winH = window.innerHeight;

      const global = Math.min(
        1,
        Math.max(0, (-rect.top + winH * 0.3) / (rect.height * 0.9))
      );

      stems.forEach(({ el, length }, i) => {
        if (!length) return;
        const start = i / (n + n * overlap);
        const end = (i + n * overlap) / (n + n * overlap);
        const p = Math.min(1, Math.max(0, (global - start) / (end - start)));
        el.setAttribute("stroke-dashoffset", String(length * (1 - p)));
      });
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, [svgContent, autoPlay, autoPlayDuration]);

  return (
    <div
      ref={containerRef}
      className={className}
      style={style}
      dangerouslySetInnerHTML={svgContent ? { __html: svgContent } : undefined}
    />
  );
}
