import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { setRequestLocale } from "next-intl/server";
import { ExhibitionIntro } from "@/components/meeting/ExhibitionIntro";
import { MeetingBanner } from "@/components/meeting/MeetingBanner";
import { OrganizationStructure } from "@/components/meeting/OrganizationStructure";
import { getAllMeetingIds, getMeetingById } from "@/data/meetings";

interface MeetingDetailPageProps {
  params: Promise<{ locale: string; id: string }>;
}

export function generateStaticParams() {
  return getAllMeetingIds().map((id) => ({ id }));
}

export async function generateMetadata({
  params,
}: MeetingDetailPageProps): Promise<Metadata> {
  const { id } = await params;
  const meeting = getMeetingById(id);
  if (!meeting) return { title: "Meeting Not Found" };
  return {
    title: meeting.detail.bannerTitle,
    description: meeting.detail.introduction[0],
  };
}

export default async function MeetingDetailPage({
  params,
}: MeetingDetailPageProps) {
  const { locale, id } = await params;
  setRequestLocale(locale);
  const meeting = getMeetingById(id);
  if (!meeting) notFound();

  return (
    <main className="flex-1">
      <MeetingBanner meetingId={id} detail={meeting.detail} />
      <ExhibitionIntro paragraphs={meeting.detail.introduction} />
      <OrganizationStructure items={meeting.detail.organization} />
    </main>
  );
}
