import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

type IconProps = { className?: string };

function S({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.4}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
      className={cn("h-6 w-6", className)}
    >
      {children}
    </svg>
  );
}

export const EyeIcon = (p: IconProps) => (
  <S {...p}>
    <path d="M2 12s3.6-6.5 10-6.5S22 12 22 12s-3.6 6.5-10 6.5S2 12 2 12Z" />
    <circle cx="12" cy="12" r="3" />
  </S>
);

export const FrameIcon = (p: IconProps) => (
  <S {...p}>
    <rect x="2.5" y="9" width="8" height="6.5" rx="3" />
    <rect x="13.5" y="9" width="8" height="6.5" rx="3" />
    <path d="M10.5 11c1-0.7 2-0.7 3 0M2.5 10.5 1 9.5M21.5 10.5 23 9.5" />
  </S>
);

export const LensIcon = (p: IconProps) => (
  <S {...p}>
    <circle cx="12" cy="12" r="8" />
    <path d="M8 12a4 4 0 0 1 4-4" />
  </S>
);

export const CutIcon = (p: IconProps) => (
  <S {...p}>
    <circle cx="6" cy="6" r="2.5" />
    <circle cx="6" cy="18" r="2.5" />
    <path d="M8 7.5 20 17M8 16.5 20 7" />
  </S>
);

export const FitIcon = (p: IconProps) => (
  <S {...p}>
    <path d="M4 8h16M4 16h16" />
    <circle cx="9" cy="8" r="2" />
    <circle cx="15" cy="16" r="2" />
  </S>
);

export const CheckIcon = (p: IconProps) => (
  <S {...p}>
    <circle cx="12" cy="12" r="9" />
    <path d="m8.5 12 2.5 2.5 4.5-5" />
  </S>
);

export const ScreenIcon = (p: IconProps) => (
  <S {...p}>
    <rect x="3" y="4" width="18" height="12" rx="1.5" />
    <path d="M9 20h6M12 16v4" />
  </S>
);

export const RoadIcon = (p: IconProps) => (
  <S {...p}>
    <path d="M9 3 5 21M15 3l4 18M12 6v2M12 12v2M12 18v2" />
  </S>
);

export const SunIcon = (p: IconProps) => (
  <S {...p}>
    <circle cx="12" cy="12" r="4" />
    <path d="M12 2v2M12 20v2M4.2 4.2l1.4 1.4M18.4 18.4l1.4 1.4M2 12h2M20 12h2M4.2 19.8l1.4-1.4M18.4 5.6l1.4-1.4" />
  </S>
);

export const FeatherIcon = (p: IconProps) => (
  <S {...p}>
    <path d="M20 4c-6 0-12 5-13 12l-3 3M19 5 9 15M14 5h5v5" />
  </S>
);

export const ClockIcon = (p: IconProps) => (
  <S {...p}>
    <circle cx="12" cy="12" r="9" />
    <path d="M12 7v5l3 2" />
  </S>
);

export const HomeIcon = (p: IconProps) => (
  <S {...p}>
    <path d="M4 11 12 4l8 7M6 10v9h12v-9" />
  </S>
);

export const WrenchIcon = (p: IconProps) => (
  <S {...p}>
    <path d="M15 4a4 4 0 0 0-1.5 7.7L5 20l-1 1 1 1 1-1 8.3-8.5A4 4 0 1 0 15 4Z" />
  </S>
);

export const HandshakeIcon = (p: IconProps) => (
  <S {...p}>
    <path d="M3 8h4l3 3 2-2 2 2 3-3h1M7 12v5h10v-5M9 17l3 3 3-3" />
  </S>
);

export const UsersIcon = (p: IconProps) => (
  <S {...p}>
    <circle cx="9" cy="8" r="3" />
    <path d="M3 20a6 6 0 0 1 12 0M16 5.5a3 3 0 0 1 0 5M21 20a6 6 0 0 0-4-5.6" />
  </S>
);

export const StarIcon = (p: IconProps) => (
  <S {...p}>
    <path d="m12 3 2.6 5.6 6 .8-4.4 4.2 1.1 6L12 17l-5.3 2.6 1.1-6L3.4 9.4l6-.8L12 3Z" />
  </S>
);

export const QuoteIcon = (p: IconProps) => (
  <S {...p}>
    <path d="M9 7H5a2 2 0 0 0-2 2v3a2 2 0 0 0 2 2h2v3a3 3 0 0 1-3 3M21 7h-4a2 2 0 0 0-2 2v3a2 2 0 0 0 2 2h2v3a3 3 0 0 1-3 3" />
  </S>
);

/** Starburst flare — used for the Anti-Glare exhibit (glare/halo). */
export const GlareIcon = (p: IconProps) => (
  <S {...p}>
    <circle cx="12" cy="12" r="2.5" />
    <path d="M12 2v3.5M12 18.5V22M2 12h3.5M18.5 12H22M5 5l2.4 2.4M16.6 16.6 19 19M19 5l-2.4 2.4M7.4 16.6 5 19" />
  </S>
);

/** Stacked ripples — used for the Polarised exhibit (water/road glare). */
export const WaveIcon = (p: IconProps) => (
  <S {...p}>
    <path d="M3 8q3-3 6 0t6 0 6 0M3 13q3-3 6 0t6 0 6 0M3 18q3-3 6 0t6 0 6 0" />
  </S>
);
