"use client";

import Image from "next/image";
import { useTranslations } from "next-intl";
import { CalendarDays, MapPin, Users } from "lucide-react";
import type { Meeting } from "@/data/meetings";
import { Link } from "@/i18n/navigation";
import { StatusBadge } from "./StatusBadge";

const CATEGORY_STYLES: Record<string, string> = {
  "Data center": "bg-[#E8F1FF] text-brand",
  "Cloud Service": "bg-[#EEF2FF] text-[#4F46E5]",
  "Big data": "bg-[#ECFDF5] text-[#059669]",
  "IT Technology": "bg-[#F5F3FF] text-[#7C3AED]",
  Training: "bg-[#FFF7ED] text-[#EA580C]",
  Salon: "bg-[#FDF2F8] text-[#DB2777]",
};

const CATEGORY_FILTER_KEY: Record<string, string> = {
  "Data center": "dataCenter",
  "Cloud Service": "cloudService",
  "Big data": "bigData",
  "IT Technology": "itTechnology",
  Training: "training",
  Salon: "salon",
};

interface MeetingCardProps {
  meeting: Meeting;
}

export function MeetingCard({ meeting }: MeetingCardProps) {
  const t = useTranslations("Home");

  return (
    <Link
      href={`/meetings/${meeting.id}`}
      className="block w-full max-w-[400px] transition-transform hover:-translate-y-0.5"
    >
      <article className="flex h-[330px] w-full flex-col overflow-hidden rounded-[12px] bg-white shadow-[0_4px_20px_rgba(0,0,0,0.06)] transition-shadow hover:shadow-[0_8px_32px_rgba(0,0,0,0.12)]">
        <div className="relative h-[180px] w-full overflow-hidden">
          <Image
            src={meeting.image}
            alt={meeting.title}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 400px"
          />
          <StatusBadge status={meeting.status} />
        </div>

        <div className="flex flex-1 flex-col px-4 pb-4 pt-3">
          <h3 className="line-clamp-2 text-[18px] font-semibold leading-snug text-foreground">
            {meeting.title}
          </h3>

          <div className="mt-2 space-y-1.5 text-[14px] text-text-muted">
            <div className="flex items-center gap-1.5">
              <CalendarDays className="h-4 w-4 shrink-0 text-brand" strokeWidth={2} />
              <span>{meeting.date}</span>
            </div>
            <div className="flex items-center gap-1.5">
              <MapPin className="h-4 w-4 shrink-0 text-brand" strokeWidth={2} />
              <span>{meeting.location}</span>
            </div>
          </div>

          <div className="mt-auto flex items-center justify-between pt-3">
            <span
              className={`inline-flex h-7 items-center rounded-[14px] px-3 text-[12px] font-medium ${CATEGORY_STYLES[meeting.category] ?? "bg-surface-soft text-brand"}`}
            >
              {t(`filters.${CATEGORY_FILTER_KEY[meeting.category] ?? "all"}`)}
            </span>
            <span className="inline-flex items-center gap-1 text-[14px] text-text-muted">
              <Users className="h-4 w-4" strokeWidth={2} />
              {meeting.attendees}
            </span>
          </div>
        </div>
      </article>
    </Link>
  );
}
