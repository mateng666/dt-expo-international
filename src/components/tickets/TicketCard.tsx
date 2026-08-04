"use client";

import { useTranslations } from "next-intl";
import type { TicketTier } from "@/data/tickets";
import { Link } from "@/i18n/navigation";

interface TicketCardProps {
  tier: TicketTier;
  registerHref: string;
}

export function TicketCard({ tier, registerHref }: TicketCardProps) {
  const t = useTranslations("Tickets");

  const nameKey =
    tier.id === "standard" || tier.id === "pro" || tier.id === "vip"
      ? tier.id
      : null;

  return (
    <article
      className={`relative flex w-full max-w-[320px] flex-col rounded-[16px] bg-white p-8 shadow-[0_4px_20px_rgba(0,0,0,0.06)] ${
        tier.highlighted
          ? "border-2 border-[#7DD3FC] shadow-[0_8px_32px_rgba(2,97,255,0.12)]"
          : "border border-transparent"
      }`}
    >
      {tier.badge ? (
        <span className="absolute right-5 top-5 inline-flex h-7 items-center rounded-full bg-[#E0F2FE] px-3 text-[12px] font-medium text-[#0284C7]">
          {t("bestValue")}
        </span>
      ) : null}

      <h3 className="text-[22px] font-semibold text-foreground">
        {nameKey ? t(nameKey) : tier.name}
      </h3>
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

      <Link
        href={registerHref}
        className={`mt-8 inline-flex h-12 items-center justify-center rounded-[6px] text-[16px] font-medium transition ${
          tier.highlighted
            ? "bg-brand text-white hover:bg-[#0052db]"
            : "border border-border-soft bg-white text-foreground hover:border-brand hover:text-brand"
        }`}
      >
        {t("register")}
      </Link>
    </article>
  );
}
