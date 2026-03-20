"use client";

import { useEffect, useId, useRef, useState } from "react";
import { useSiteMotion } from "@/components/providers/MotionProvider";
import type { ReactNode } from "react";

export type AnimatedLogoSVGProps = {
  svg?: ReactNode;
  animateOn?: "mount" | "hover" | "inView";
  tone?: "duotone" | "mono";
  duration?: number;
  useGSAP?: boolean;
  className?: string;
};

export default function AnimatedLogoSVG({
  svg,
  animateOn = "mount",
  tone = "duotone",
  duration = 1.4,
  useGSAP = true,
  className,
}: AnimatedLogoSVGProps) {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const [ready, setReady] = useState(false);
  const { reducedMotion } = useSiteMotion();
  const clipId = useId();
  const gradientId = useId();

  useEffect(() => {
    if (reducedMotion) return;
    const root = wrapperRef.current;
    if (!root) return;

    const paths = Array.from(
      root.querySelectorAll<SVGPathElement>("[data-logo-path]")
    );
    if (paths.length === 0) return;

    paths.forEach((path) => {
      const length = path.getTotalLength();
      path.style.strokeDasharray = `${length}`;
      path.style.strokeDashoffset = `${length}`;
    });

    let observer: IntersectionObserver | null = null;
    let cleanupHover: (() => void) | null = null;
    let tl: { kill: () => void; restart: () => void; play: () => void } | null = null;

    const runAnimation = async () => {
      if (!useGSAP) {
        paths.forEach((path, index) => {
          path.style.transition = `stroke-dashoffset ${duration}s ease ${
            index * 0.1
          }s`;
          path.style.strokeDashoffset = "0";
        });
        setReady(true);
        return;
      }

      try {
        const { gsap } = await import("gsap");
        const timeline = gsap.timeline({ paused: animateOn !== "mount" });
        timeline.to(paths, {
          strokeDashoffset: 0,
          duration,
          ease: "power3.out",
          stagger: 0.12,
        });

        const dot = root.querySelector<SVGCircleElement>("[data-logo-dot]");
        if (dot) {
          timeline.to(
            dot,
            {
              y: -8,
              duration: 0.4,
              ease: "power3.out",
              yoyo: true,
              repeat: 1,
            },
            "-=0.6"
          );
        }

        tl = timeline;
        setReady(true);

        if (animateOn === "mount") {
          timeline.play(0);
        }

        if (animateOn === "hover") {
          const handleEnter = () => timeline.restart();
          const handleLeave = () => timeline.play();
          root.addEventListener("pointerenter", handleEnter);
          root.addEventListener("pointerleave", handleLeave);
          cleanupHover = () => {
            root.removeEventListener("pointerenter", handleEnter);
            root.removeEventListener("pointerleave", handleLeave);
          };
        }

        if (animateOn === "inView") {
          observer = new IntersectionObserver(
            (entries) => {
              entries.forEach((entry) => {
                if (entry.isIntersecting) {
                  timeline.restart();
                }
              });
            },
            { threshold: 0.4 }
          );
          observer.observe(root);
        }
      } catch (error) {
        paths.forEach((path, index) => {
          path.style.transition = `stroke-dashoffset ${duration}s ease ${
            index * 0.1
          }s`;
          path.style.strokeDashoffset = "0";
        });
        setReady(true);
      }
    };

    runAnimation();

    return () => {
      if (observer) observer.disconnect();
      if (cleanupHover) cleanupHover();
      if (tl) tl.kill();
    };
  }, [animateOn, duration, reducedMotion, useGSAP]);

  if (svg) {
    return (
      <div ref={wrapperRef} className={`animated-logo ${className ?? ""}`}>
        {svg}
      </div>
    );
  }

  const strokeColor = tone === "mono" ? "var(--foreground)" : "url(#" + gradientId + ")";

  return (
    <div
      ref={wrapperRef}
      className={`animated-logo ${ready ? "is-ready" : ""} ${className ?? ""}`}
      aria-hidden="true"
    >
      <svg
        viewBox="0 0 240 240"
        role="img"
        aria-label="Logo animado"
        className="animated-logo__svg"
      >
        <defs>
          <linearGradient id={gradientId} x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="var(--accent)" />
            <stop offset="50%" stopColor="var(--accent-2)" />
            <stop offset="100%" stopColor="var(--accent-3)" />
          </linearGradient>
          <clipPath id={clipId}>
            <circle cx="120" cy="120" r="92" />
          </clipPath>
        </defs>
        <g clipPath={`url(#${clipId})`}>
          <rect
            x="0"
            y="0"
            width="240"
            height="240"
            fill="var(--surface)"
            opacity="0.6"
          />
          <rect x="0" y="0" width="240" height="240" fill={strokeColor} opacity="0.15" />
        </g>
        <path
          data-logo-path
          d="M45 170 V70 L95 130 L145 70 V170"
          fill="none"
          stroke={strokeColor}
          strokeWidth="12"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          data-logo-path
          d="M150 170 V90 L195 140 V70"
          fill="none"
          stroke={strokeColor}
          strokeWidth="12"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <circle
          data-logo-dot
          cx="195"
          cy="70"
          r="7"
          fill="var(--accent-2)"
        />
      </svg>
    </div>
  );
}
