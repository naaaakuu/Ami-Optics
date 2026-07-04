import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";
import type { Collection } from "@/types/content";

type CollectionCardProps = {
  collection: Collection;
  tone?: "light" | "dark";
};

export function CollectionCard({ collection, tone = "light" }: CollectionCardProps) {
  const isDark = tone === "dark";

  return (
    <Link href="/collections" className="group block h-full">
      {collection.image ? (
        <>
          <div className="relative aspect-[4/5] overflow-hidden rounded-2xl bg-border">
            <Image
              src={collection.image.src}
              alt={collection.image.alt}
              fill
              sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 90vw"
              className="object-cover transition-transform duration-500 group-hover:scale-105"
            />
          </div>
          <h3 className="mt-5 font-display text-xl">{collection.name}</h3>
        </>
      ) : (
        <div
          className={cn(
            "flex aspect-[4/5] flex-col justify-between rounded-2xl border p-6 transition-colors duration-300",
            isDark
              ? "border-paper/20 bg-ink-700 group-hover:border-paper/50"
              : "border-line bg-paper-dim group-hover:border-line-strong",
          )}
        >
          <span
            className={cn(
              "self-center my-auto text-xs font-medium tracking-widest uppercase",
              isDark ? "text-paper/30" : "text-muted-light",
            )}
          >
            Photo coming soon
          </span>
          <h3 className="font-display text-xl">{collection.name}</h3>
        </div>
      )}
      <p
        className={cn(
          "mt-2 text-sm",
          isDark ? "text-paper/70" : "text-muted",
        )}
      >
        {collection.summary}
      </p>
    </Link>
  );
}
