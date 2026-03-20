"use client";

import { useEffect, useRef } from "react";
import { useSiteMotion } from "@/components/providers/MotionProvider";
import type { ReactNode } from "react";

export type CursorLayer = {
  id: string;
  depth: number;
  children: ReactNode;
};

export type CursorReactiveParallaxProps = {
  strength?: number;
  layers: CursorLayer[];
  disabledOnTouch?: boolean;
  className?: string;
};

export default function CursorReactiveParallax({
  strength = 0.3,
  layers,
  disabledOnTouch = true,
  className,
}: CursorReactiveParallaxProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const layerRefs = useRef<Map<string, HTMLDivElement>>(new Map());
  type QuickSetter = (value: number | string) => void;
  const quickSetterRef = useRef<Map<string, { x: QuickSetter; y: QuickSetter }>>(
    new Map(),
  );
  const rafRef = useRef<number | null>(null);
  const pointerRef = useRef({ x: 0, y: 0 });
  const currentRef = useRef({ x: 0, y: 0 });
  const { reducedMotion } = useSiteMotion();

  useEffect(() => {
    const container = containerRef.current;
    if (!container || reducedMotion) return;

    if (disabledOnTouch) {
      const coarse = window.matchMedia("(pointer: coarse)").matches;
      if (coarse) return;
    }

    let rect = container.getBoundingClientRect();

    const handlePointerMove = (event: PointerEvent) => {
      rect = container.getBoundingClientRect();
      const x = (event.clientX - rect.left) / rect.width - 0.5;
      const y = (event.clientY - rect.top) / rect.height - 0.5;
      pointerRef.current = { x, y };
      if (!rafRef.current) {
        rafRef.current = requestAnimationFrame(updateLayers);
      }
    };

    const handlePointerLeave = () => {
      pointerRef.current = { x: 0, y: 0 };
      if (!rafRef.current) {
        rafRef.current = requestAnimationFrame(updateLayers);
      }
    };

    const updateLayers = () => {
      const ease = 0.08;
      currentRef.current.x +=
        (pointerRef.current.x - currentRef.current.x) * ease;
      currentRef.current.y +=
        (pointerRef.current.y - currentRef.current.y) * ease;

      layerRefs.current.forEach((el, key) => {
        const depth = Number(el.dataset.depth ?? "0");
        const offsetX = currentRef.current.x * depth * 40 * strength;
        const offsetY = currentRef.current.y * depth * 40 * strength;
        const setter = quickSetterRef.current.get(key);
        if (setter) {
          setter.x(offsetX);
          setter.y(offsetY);
        } else {
          el.style.transform = `translate3d(${offsetX}px, ${offsetY}px, 0)`;
        }
      });

      rafRef.current = null;
    };

    const setupQuickSetter = async () => {
      try {
        const { gsap } = await import("gsap");
        layerRefs.current.forEach((el, key) => {
          quickSetterRef.current.set(key, {
            // GSAP types return Function; cast to our expected signature for TS.
            x: gsap.quickSetter(el, "x", "px") as QuickSetter,
            y: gsap.quickSetter(el, "y", "px") as QuickSetter,
          });
        });
      } catch (error) {
        quickSetterRef.current.clear();
      }
    };

    setupQuickSetter();

    container.addEventListener("pointermove", handlePointerMove);
    container.addEventListener("pointerleave", handlePointerLeave);

    return () => {
      container.removeEventListener("pointermove", handlePointerMove);
      container.removeEventListener("pointerleave", handlePointerLeave);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      quickSetterRef.current.clear();
    };
  }, [disabledOnTouch, reducedMotion, strength]);

  return (
    <div ref={containerRef} className={`parallax ${className ?? ""}`}>
      {layers.map((layer) => (
        <div
          key={layer.id}
          ref={(node) => {
            if (node) {
              layerRefs.current.set(layer.id, node);
            } else {
              layerRefs.current.delete(layer.id);
            }
          }}
          className="parallax-layer"
          data-depth={layer.depth}
        >
          {layer.children}
        </div>
      ))}
    </div>
  );
}
