interface SectionTitleProps {
  title: string;
  english: string;
}

export function SectionTitle({ title, english }: SectionTitleProps) {
  return (
    <div className="mb-10 text-center">
      <h2 className="text-[32px] font-semibold text-foreground">{title}</h2>
      <div className="mx-auto mt-4 flex max-w-[520px] items-center gap-4">
        <span className="h-px flex-1 bg-[#D1D5DB]" />
        <span className="text-[12px] tracking-[0.18em] text-text-muted">
          {english}
        </span>
        <span className="h-px flex-1 bg-[#D1D5DB]" />
      </div>
    </div>
  );
}
