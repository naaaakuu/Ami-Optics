import Link from "next/link";
import { cn } from "@/lib/utils";

type ButtonProps = {
  href: string;
  variant?: "primary" | "secondary" | "outline-light" | "spark" | "ghost";
  size?: "md" | "lg";
  arrow?: boolean;
  className?: string;
  children: React.ReactNode;
};

const base =
  "group/btn relative inline-flex items-center justify-center gap-2 overflow-hidden rounded-full font-medium transition-[transform,background-color,border-color,color] duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] active:scale-[0.98]";

const sizes = {
  md: "px-6 py-3 text-sm",
  lg: "px-8 py-4 text-[0.95rem]",
};

const variants = {
  primary: "bg-royal text-paper-bright hover:bg-ink",
  spark: "bg-spark text-paper-bright hover:bg-spark-deep",
  secondary:
    "border border-ink/20 text-ink hover:border-ink hover:bg-ink hover:text-paper",
  "outline-light": "border border-paper/30 text-paper hover:bg-paper hover:text-ink",
  ghost: "text-ink hover:text-royal px-0",
};

function Inner({ children, arrow }: { children: React.ReactNode; arrow?: boolean }) {
  return (
    <>
      <span className="relative z-10 inline-flex items-center gap-2">
        {children}
        {arrow ? (
          <span
            aria-hidden
            className="transition-transform duration-300 ease-out group-hover/btn:translate-x-1"
          >
            →
          </span>
        ) : null}
      </span>
    </>
  );
}

export function Button({
  href,
  variant = "primary",
  size = "md",
  arrow = false,
  className,
  children,
}: ButtonProps) {
  const classes = cn(base, variant !== "ghost" && sizes[size], variants[variant], className);
  const inner = <Inner arrow={arrow}>{children}</Inner>;
  const isProtocolLink = /^(tel:|mailto:)/.test(href);
  const isExternal = /^https?:\/\//.test(href);

  if (isProtocolLink) {
    return (
      <a href={href} className={classes}>
        {inner}
      </a>
    );
  }

  if (isExternal) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" className={classes}>
        {inner}
      </a>
    );
  }

  return (
    <Link href={href} className={classes}>
      {inner}
    </Link>
  );
}
