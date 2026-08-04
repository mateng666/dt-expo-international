import type { ReactNode } from "react";

type Props = {
  title: string;
  lastUpdated: string;
  lastUpdatedLabel: string;
  children: ReactNode;
};

export function LegalDocLayout({
  title,
  lastUpdated,
  lastUpdatedLabel,
  children,
}: Props) {
  return (
    <main className="flex-1 bg-white">
      <article className="container-content max-w-[920px] py-14 md:py-16">
        <header className="text-center">
          <h1 className="text-[36px] font-bold text-foreground md:text-[40px]">
            {title}
          </h1>
          <p className="mt-3 text-[14px] text-text-muted">
            {lastUpdatedLabel}: {lastUpdated}
          </p>
        </header>
        <div className="mt-12 space-y-10 text-[15px] leading-7 text-text-body">
          {children}
        </div>
      </article>
    </main>
  );
}

export function LegalSection({
  title,
  children,
}: {
  title: string;
  children: ReactNode;
}) {
  return (
    <section>
      <h2 className="text-[20px] font-semibold text-foreground">{title}</h2>
      <div className="mt-3 space-y-3">{children}</div>
    </section>
  );
}
