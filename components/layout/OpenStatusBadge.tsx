"use client";

import { useEffect, useState } from "react";
import { siteConfig } from "@/content/site";
import { getOpenStatus } from "@/lib/hours";
import { cn } from "@/lib/utils";

export function OpenStatusBadge({ className }: { className?: string }) {
  const [label, setLabel] = useState<string | null>(null);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const update = () => {
      const status = getOpenStatus(new Date(), siteConfig.hours);
      setIsOpen(status.isOpen);
      setLabel(
        status.isOpen
          ? `Open now · closes ${status.closesAt}`
          : status.opensAt
            ? `Closed now · opens ${status.opensAt}`
            : "Closed today",
      );
    };

    update();
    const interval = setInterval(update, 60_000);
    return () => clearInterval(interval);
  }, []);

  if (!label) return null;

  return (
    <span
      className={cn(
        "inline-flex items-center gap-2 text-sm font-medium",
        className,
      )}
    >
      <span
        className={cn(
          "relative h-2 w-2 rounded-full",
          isOpen ? "bg-emerald-500" : "bg-spark",
        )}
      >
        {isOpen ? (
          <span className="absolute inset-0 animate-[pulse-ring_2.4s_ease-out_infinite] rounded-full bg-emerald-500" />
        ) : null}
      </span>
      {label}
    </span>
  );
}
