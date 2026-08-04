"use client";

import { useTranslations } from "next-intl";
import type { TicketTier } from "@/data/tickets";

interface TicketCardProps {
  tier: TicketTier;
  selected: boolean;
  onSelect: () => void;
}

export function TicketCard({ tier, selected, onSelect }: TicketCardProps) {
  const t = useTranslations("Tickets");

  const nameKey =
    tier.id === "standard" || tier.id === "pro" || tier.id === "vip"
      ? tier.id
      : null;

  return (
    <button
      type="button"
      onClick={onSelect}
      aria-pressed={selected}
      className={`relative flex w-full max-w-[320px] flex-col rounded-[16px] bg-white p-8 text-left shadow-[0_4px_20px_rgba(0,0,0,0.06)] transition ${
        selected
          ? "border-2 border-brand shadow-[0_8px_32px_rgba(2,97,255,0.16)] ring-2 ring-brand/20"
          : "border-2 border-transparent hover:border-brand/40"
      }`}
    >
      {tier.badge ? (
        <span className="absolute right-5 top-5 inline-flex h-7 items-center rounded-full bg-[#E0F2FE] px-3 text-[12px] font-medium text-[#0284C7]">
          {t("bestValue")}
        </span>
      ) : null}

      <div className="flex items-start justify-between gap-3">
        <h3 className="text-[22px] font-semibold text-foreground">
          {nameKey ? t(nameKey) : tier.name}
        </h3>
        <span
          aria-hidden
          className={`mt-1 flex h-5 w-5 shrink-0 items-center justify-center rounded-full border-2 ${
            selected
              ? "border-brand bg-brand"
              : "border-border-soft bg-white"
          }`}
        >
          {selected ? (
            <span className="h-2 w-2 rounded-full bg-white" />
          ) : null}
        </span>
      </div>

      <p className="mt-4 text-[40px] font-bold leading-none text-foreground">
        {tier.price}
      </p>

      <ul className="mt-8 flex-1 space-y-3 text-[15px] leading-6 text-text-body">
        {tier.features.map((feature) => (
          <li key={feature} className="flex gap-2">
            <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-text-muted" />
            <span>{feature}</span>
          </li>
        ))}
      </ul>
    </button>
  );
}
