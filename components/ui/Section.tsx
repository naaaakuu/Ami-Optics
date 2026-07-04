import { cn } from "@/lib/utils";

type SectionProps = {
  id?: string;
  className?: string;
  children: React.ReactNode;
};

export function Section({ id, className, children }: SectionProps) {
  return (
    <section
      id={id}
      className={cn(
        "py-[var(--section-py-mobile)] md:py-[var(--section-py-desktop)]",
        className,
      )}
    >
      {children}
    </section>
  );
}
