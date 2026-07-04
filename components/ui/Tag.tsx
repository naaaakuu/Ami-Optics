import { cn } from "@/lib/utils";

type TagProps = {
  className?: string;
  children: React.ReactNode;
};

export function Tag({ className, children }: TagProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full border border-line-strong px-3 py-1 font-mono text-[0.68rem] uppercase tracking-[0.18em] text-muted",
        className,
      )}
    >
      {children}
    </span>
  );
}
