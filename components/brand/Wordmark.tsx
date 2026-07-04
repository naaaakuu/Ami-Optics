import { cn } from "@/lib/utils";

type WordmarkProps = {
  className?: string;
  /** size/utility classes for the logo image itself (callers tune the height) */
  imgClassName?: string;
  /** kept for API compatibility — the real logo already carries "Since 1996" */
  showSince?: boolean;
  /** kept for API compatibility with previous call sites */
  frameVariant?: "duo" | "mono";
};

/**
 * The real Ami Optics logo — the split red / royal-blue wayfarer with the
 * wordmark, exported as SVG. It is full-colour and transparent, so it reads
 * correctly on both the dark hero/footer and the light, scrolled navbar.
 * Used in the navbar and footer.
 *
 * (Drop the file at /public/images/brand/ami-optics-logo.svg — the importer
 * script copies "01 Branding/AMI OPTICS LOGO.svg" there.)
 */
export function Wordmark({
  className,
  imgClassName = "h-14 w-auto lg:h-16",
}: WordmarkProps) {
  return (
    <span className={cn("inline-flex items-center", className)}>
      {/* eslint-disable-next-line @next/next/no-img-element -- first-party SVG logo; no image optimization needed */}
      <img
        src="/images/brand/ami-optics-logo.svg"
        alt="Ami Optics — family opticians in Virar since 1996"
        className={imgClassName}
      />
    </span>
  );
}
