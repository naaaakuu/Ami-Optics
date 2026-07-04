import Image from "next/image";
import { cn } from "@/lib/utils";

type PhotoProps = {
  src: string;
  alt: string;
  /** wrapper classes (control aspect ratio / rounding here) */
  className?: string;
  imgClassName?: string;
  sizes?: string;
  priority?: boolean;
  /** true = royal duotone · "warm" = champagne duotone */
  duotone?: boolean | "warm";
  /** dark gradient from the bottom for legible overlaid text */
  overlay?: boolean;
};

/**
 * Image wrapper with a branded base layer (so a not-yet-imported photo never
 * looks like a broken box) and the optional duotone treatment that unifies
 * the shop's inconsistent source photography into one editorial language.
 */
export function Photo({
  src,
  alt,
  className,
  imgClassName,
  sizes = "100vw",
  priority = false,
  duotone = false,
  overlay = false,
}: PhotoProps) {
  return (
    <div
      className={cn(
        "relative overflow-hidden bg-paper-dim",
        duotone && "duotone-wrap",
        duotone === "warm" && "duotone-wrap--warm",
        className,
      )}
    >
      {/* branded base — visible until/if the photo loads */}
      <div
        aria-hidden
        className="absolute inset-0 bg-[radial-gradient(120%_120%_at_30%_20%,var(--color-paper-dim),var(--color-line-strong))]"
      />
      <Image
        src={src}
        alt={alt}
        fill
        priority={priority}
        sizes={sizes}
        className={cn("object-cover", duotone && "duotone", imgClassName)}
      />
      {overlay ? (
        <div className="absolute inset-0 z-[4] bg-gradient-to-t from-ink/75 via-ink/15 to-transparent" />
      ) : null}
    </div>
  );
}
