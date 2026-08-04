"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import type { TicketTier } from "@/data/tickets";
import { Link } from "@/i18n/navigation";
import { TicketCard } from "./TicketCard";

interface TicketPlansProps {
  meetingId: string;
  tiers: TicketTier[];
}

export function TicketPlans({ meetingId, tiers }: TicketPlansProps) {
  const t = useTranslations("Tickets");
  const defaultId =
    tiers.find((tier) => tier.badge || tier.highlighted)?.id ?? tiers[0]?.id ?? null;
  const [selectedId, setSelectedId] = useState<string | null>(defaultId);

  const registerHref = selectedId
    ? `/meetings/${meetingId}/register?plan=${selectedId}`
    : null;

  return (
    <section className="bg-[#F5F8FC] py-[80px]">
      <div className="container-content">
        <p className="mb-8 text-center text-[15px] text-text-muted">
          {t("selectHint")}
        </p>

        <div className="flex flex-col items-center justify-center gap-8 md:flex-row md:items-stretch md:gap-6 xl:gap-8">
          {tiers.map((tier) => (
            <TicketCard
              key={tier.id}
              tier={tier}
              selected={selectedId === tier.id}
              onSelect={() => setSelectedId(tier.id)}
            />
          ))}
        </div>

        <div className="mt-10 flex flex-col items-center gap-3">
          {registerHref ? (
            <Link
              href={registerHref}
              className="inline-flex h-12 min-w-[200px] items-center justify-center rounded-[6px] bg-brand px-8 text-[16px] font-medium text-white transition hover:bg-[#0052db]"
            >
              {t("continue")}
            </Link>
          ) : (
            <button
              type="button"
              disabled
              className="inline-flex h-12 min-w-[200px] cursor-not-allowed items-center justify-center rounded-[6px] bg-brand/40 px-8 text-[16px] font-medium text-white"
            >
              {t("continue")}
            </button>
          )}
          {!selectedId ? (
            <p className="text-[13px] text-text-muted">{t("selectRequired")}</p>
          ) : null}
        </div>
      </div>
    </section>
  );
}
