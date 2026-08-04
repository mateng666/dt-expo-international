"use client";

import { useMemo, useState } from "react";
import { useTranslations } from "next-intl";
import { CalendarDays } from "lucide-react";
import { meetings, type MeetingCategory } from "@/data/meetings";
import { MeetingCard } from "@/components/ui/MeetingCard";

const FILTER_KEYS = [
  "all",
  "dataCenter",
  "cloudService",
  "bigData",
  "itTechnology",
  "training",
  "salon",
] as const;

const FILTER_TO_CATEGORY: Record<string, MeetingCategory | null> = {
  all: null,
  dataCenter: "Data center",
  cloudService: "Cloud Service",
  bigData: "Big data",
  itTechnology: "IT Technology",
  training: "Training",
  salon: "Salon",
};

export function LatestMeetings() {
  const t = useTranslations("Home");
  const [active, setActive] = useState<(typeof FILTER_KEYS)[number]>("all");

  const filtered = useMemo(() => {
    const category = FILTER_TO_CATEGORY[active];
    if (!category) return meetings;
    return meetings.filter((item) => item.category === category);
  }, [active]);

  return (
    <section id="latest-meetings" className="bg-white py-[80px]">
      <div className="container-content">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <div className="flex items-center gap-2">
              <CalendarDays className="h-7 w-7 text-brand" strokeWidth={2} />
              <h2 className="text-[32px] font-semibold text-foreground">
                {t("latestMeetings")}
              </h2>
            </div>
            <p className="mt-2 text-[16px] leading-[28px] text-text-muted">
              {t("latestMeetingsDesc")}
            </p>
          </div>

          <div className="flex flex-wrap gap-2">
            {FILTER_KEYS.map((filter) => {
              const isActive = filter === active;
              return (
                <button
                  key={filter}
                  type="button"
                  onClick={() => setActive(filter)}
                  className={`h-9 rounded-full px-4 text-[14px] transition ${
                    isActive
                      ? "bg-brand text-white"
                      : "bg-transparent text-text-body hover:bg-surface-soft hover:text-brand"
                  }`}
                >
                  {t(`filters.${filter}`)}
                </button>
              );
            })}
          </div>
        </div>

        <div className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
          {filtered.map((meeting) => (
            <div key={meeting.id} className="flex justify-center xl:justify-start">
              <MeetingCard meeting={meeting} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
