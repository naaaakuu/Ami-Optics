import type { ElementType, ReactNode } from "react";
import { cn } from "@/lib/utils";

const sizes = {
  mega: "text-mega font-display",
  hero: "text-hero font-display",
  display: "text-display font-display",
  title: "text-title font-display",
  lg: "text-4xl sm:text-5xl font-display",
  md: "text-2xl sm:text-3xl font-display",
  sm: "text-xl font-display",
} as const;

type HeadingProps = {
  as?: ElementType;
  size?: keyof typeof sizes;
  className?: string;
  children: ReactNode;
};

export function Heading({
  as: Tag = "h2",
  size = "md",
  className,
  children,
}: HeadingProps) {
  return (
    <Tag className={cn(sizes[size], "tracking-tight text-balance", className)}>
      {children}
    </Tag>
  );
}
