"use client";

import type { ElementType, ReactNode } from "react";
import { useInView } from "@/hooks/use-in-view";
import { cn } from "@/lib/utils";

type RevealProps = {
  as?: ElementType;
  /** "rise" (default) · "focus" (blur→sharp signature) · "fade" · "scale" (product cards) */
  variant?: "rise" | "focus" | "fade" | "scale";
  /** stagger delay in ms */
  delay?: number;
  /**
   * Show immediately regardless of scroll position — for content revealed by
   * a user action (e.g. a "Read more" expand) rather than by scrolling into
   * view, where it may sit inside a zero-height collapsed container that an
   * IntersectionObserver can never see as "in view".
   */
  forceVisible?: boolean;
  className?: string;
  children: ReactNode;
};

/**
 * Scroll-reveal wrapper. Pairs with the [data-reveal] rules in globals.css:
 * the element starts hidden and plays its variant when it enters view.
 * Fully reduced-motion aware (the CSS resolves it instantly).
 */
export function Reveal({
  as: Tag = "div",
  variant = "rise",
  delay = 0,
  forceVisible = false,
  className,
  children,
}: RevealProps) {
  const { ref, inView } = useInView<HTMLDivElement>();
  const visible = inView || forceVisible;

  return (
    <Tag
      ref={ref}
      data-reveal=""
      data-variant={variant}
      data-inview={visible ? "true" : "false"}
      style={delay ? ({ "--reveal-delay": `${delay}ms` } as React.CSSProperties) : undefined}
      className={className}
    >
      {children}
    </Tag>
  );
}

/** Convenience: a block whose direct children reveal in sequence. */
export function RevealGroup({
  className,
  children,
}: {
  className?: string;
  children: ReactNode;
}) {
  return <div className={cn(className)}>{children}</div>;
}
