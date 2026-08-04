import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { setRequestLocale } from "next-intl/server";
import { TicketHero } from "@/components/tickets/TicketHero";
import { TicketPlans } from "@/components/tickets/TicketPlans";
import { getAllMeetingIds, getMeetingById } from "@/data/meetings";
import { DEFAULT_TICKET_TIERS, TICKET_HERO_BY_MEETING } from "@/data/tickets";

interface TicketPageProps {
  params: Promise<{ locale: string; id: string }>;
}

export function generateStaticParams() {
  return getAllMeetingIds().map((id) => ({ id }));
}

export async function generateMetadata({
  params,
}: TicketPageProps): Promise<Metadata> {
  const { id } = await params;
  const meeting = getMeetingById(id);
  if (!meeting) return { title: "Tickets Not Found" };
  const hero = TICKET_HERO_BY_MEETING[id];
  const title = hero?.title ?? meeting.title;
  return {
    title: `Tickets — ${title}`,
    description: hero?.description ?? meeting.detail.introduction[0],
  };
}

export default async function TicketPage({ params }: TicketPageProps) {
  const { locale, id } = await params;
  setRequestLocale(locale);
  const meeting = getMeetingById(id);
  if (!meeting) notFound();

  const hero = TICKET_HERO_BY_MEETING[id] ?? {
    title: meeting.title,
    description: meeting.detail.introduction[0],
    date: meeting.date,
    region: meeting.location,
  };

  return (
    <main className="flex-1">
      <TicketHero {...hero} />
      <TicketPlans meetingId={id} tiers={DEFAULT_TICKET_TIERS} />
    </main>
  );
}
