import type { ReactNode } from "react";

interface DecorBackgroundProps {
  children: ReactNode;
  className?: string;
}

/** Soft digital-globe style background used by register / payment result pages. */
export function DecorBackground({ children, className = "" }: DecorBackgroundProps) {
  return (
    <section
      className={`relative overflow-hidden bg-gradient-to-br from-[#EAF3FF] via-[#F5F9FF] to-[#EEF6FF] ${className}`}
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.35]"
        style={{
          backgroundImage:
            "radial-gradient(circle at 18% 42%, rgba(2,97,255,0.12) 0, transparent 28%), radial-gradient(circle at 82% 48%, rgba(56,189,248,0.18) 0, transparent 32%), radial-gradient(rgba(2,97,255,0.18) 1px, transparent 1px)",
          backgroundSize: "auto, auto, 28px 28px",
        }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -left-24 top-1/2 h-[420px] w-[420px] -translate-y-1/2 rounded-full border border-[#93C5FD]/40"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -right-16 top-[18%] h-[360px] w-[360px] rounded-full bg-[radial-gradient(circle,rgba(56,189,248,0.28)_0%,rgba(2,97,255,0.08)_45%,transparent_70%)]"
      />
      <div className="relative z-10">{children}</div>
    </section>
  );
}
