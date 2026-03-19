"use client";
import { useEffect, useRef, useState } from "react";

interface Props {
  src: string;
  className?: string;
  style?: React.CSSProperties;
  /** Style string applied to the root <svg> element (e.g. sizing) */
  svgStyle?: string;
  /** Wait until the element scrolls into view before drawing */
  triggerOnView?: boolean;
  /** ms between each stroke appearing */
  delayPerStroke?: number;
  /** ms before the first stroke appears */
  initialDelay?: number;
}

export default function DrawSVG({
  src,
  className,
  style,
  svgStyle,
  triggerOnView = false,
  delayPerStroke = 80,
  initialDelay = 0,
}: Props) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [svgContent, setSvgContent] = useState<string>("");
  const [drawing, setDrawing] = useState(!triggerOnView);

  // Fetch + pre-hide all strokes
  useEffect(() => {
    fetch(src)
      .then((r) => r.text())
      .then((text) => {
        const parser = new DOMParser();
        const doc = parser.parseFromString(text, "image/svg+xml");
        const svgEl = doc.documentElement;

        // Apply sizing to the root SVG element
        if (svgStyle) svgEl.setAttribute("style", svgStyle);

        // Hide every drawable element so there's no flash before animation
        svgEl
          .querySelectorAll("path, circle, ellipse, rect, polygon, polyline")
          .forEach((el) => el.setAttribute("opacity", "0"));

        setSvgContent(new XMLSerializer().serializeToString(svgEl));
      });
  }, [src, svgStyle]);

  // IntersectionObserver for scroll-triggered drawing
  // Depends on svgContent so the ref is mounted before we try to observe
  useEffect(() => {
    if (!triggerOnView || !svgContent) return;
    const el = containerRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setDrawing(true);
          obs.disconnect();
        }
      },
      { threshold: 0.05 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [triggerOnView, svgContent]);

  // Stagger each stroke into view
  useEffect(() => {
    if (!svgContent || !drawing || !containerRef.current) return;

    const strokes = Array.from(
      containerRef.current.querySelectorAll<SVGElement>(
        "path, circle, ellipse, rect, polygon, polyline"
      )
    );

    strokes.forEach((el, i) => {
      setTimeout(() => {
        el.style.transition = "opacity 0.2s ease";
        el.removeAttribute("opacity");
        el.style.opacity = "";
      }, initialDelay + i * delayPerStroke);
    });
  }, [svgContent, drawing, delayPerStroke, initialDelay]);

  return (
    <div
      ref={containerRef}
      className={className}
      style={style}
      dangerouslySetInnerHTML={svgContent ? { __html: svgContent } : undefined}
    />
  );
}
