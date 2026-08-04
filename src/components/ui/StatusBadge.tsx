"use client";

import { useTranslations } from "next-intl";
import type { MeetingStatus } from "@/data/meetings";

const STATUS_STYLES: Record<MeetingStatus, string> = {
  "Signing Up": "bg-status-signing",
  "Coming Soon": "bg-status-soon",
  Finished: "bg-status-finished",
};

const STATUS_KEY: Record<MeetingStatus, "signingUp" | "comingSoon" | "finished"> =
  {
    "Signing Up": "signingUp",
    "Coming Soon": "comingSoon",
    Finished: "finished",
  };

interface StatusBadgeProps {
  status: MeetingStatus;
}

export function StatusBadge({ status }: StatusBadgeProps) {
  const t = useTranslations("Status");

  return (
    <span
      className={`absolute right-3 top-3 z-10 inline-flex h-7 items-center rounded-md px-2.5 text-xs font-medium text-white ${STATUS_STYLES[status]}`}
    >
      {t(STATUS_KEY[status])}
    </span>
  );
}
