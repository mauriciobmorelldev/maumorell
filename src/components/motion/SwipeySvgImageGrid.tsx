"use client";

import { useEffect, useId, useMemo, useRef, useState } from "react";
import { useSiteMotion } from "@/components/providers/MotionProvider";

export type SwipeyItem = {
  src: string;
  alt: string;
  x: number;
  y: number;
  w: number;
  h: number;
};

export type SwipeySvgImageGridProps = {
  items: SwipeyItem[];
  revealOn?: "hover" | "mount" | "scroll";
  aspectMode?: "slice" | "meet";
  className?: string;
};

export default function SwipeySvgImageGrid({
  items,
  revealOn = "scroll",
  aspectMode = "slice",
  className,
}: SwipeySvgImageGridProps) {
  const clipPrefix = useId();
  const { reducedMotion } = useSiteMotion();
  const [revealed, setRevealed] = useState(revealOn === "mount");
  const [useSvg, setUseSvg] = useState(true);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (!("SVGClipPathElement" in window)) {
      setUseSvg(false);
    }
  }, []);

  useEffect(() => {
    if (reducedMotion) {
      setRevealed(true);
      return;
    }

    if (revealOn === "mount") {
      const timer = window.setTimeout(() => setRevealed(true), 200);
      return () => window.clearTimeout(timer);
    }

    if (revealOn === "scroll") {
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              setRevealed(true);
              observer.disconnect();
            }
          });
        },
        { threshold: 0.4 }
      );
      if (containerRef.current) observer.observe(containerRef.current);
      return () => observer.disconnect();
    }
  }, [reducedMotion, revealOn]);

  const fallback = useMemo(
    () => (
      <div className="swipey-fallback">
        {items.map((item) => (
          <div key={item.src} className="swipey-fallback__item">
            <img src={item.src} alt={item.alt} />
          </div>
        ))}
      </div>
    ),
    [items]
  );

  if (!useSvg) {
    return <div className={className}>{fallback}</div>;
  }

  return (
    <div
      className={`swipey ${className ?? ""}`}
      data-swipey
      ref={containerRef}
      onMouseEnter={revealOn === "hover" ? () => setRevealed(true) : undefined}
      onMouseLeave={revealOn === "hover" ? () => setRevealed(false) : undefined}
    >
      <svg viewBox="0 0 100 100" className="swipey__svg" aria-hidden="true">
        <defs>
          {items.map((item, index) => (
            <clipPath id={`${clipPrefix}-${index}`} key={`${clipPrefix}-${index}`}>
              <rect
                x={item.x}
                y={item.y}
                width={item.w}
                height={item.h}
                className="swipey__clip"
                style={{
                  transform: revealed ? "scaleX(1)" : "scaleX(0)",
                  transitionDelay: `${index * 140}ms`,
                }}
              />
            </clipPath>
          ))}
        </defs>
        {items.map((item, index) => (
          <g
            key={`${item.src}-${index}`}
            clipPath={`url(#${clipPrefix}-${index})`}
          >
            <image
              href={item.src}
              x={item.x}
              y={item.y}
              width={item.w}
              height={item.h}
              preserveAspectRatio={`xMidYMid ${aspectMode}`}
            />
          </g>
        ))}
      </svg>
      {fallback}
    </div>
  );
}
