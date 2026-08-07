import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { setRequestLocale } from "next-intl/server";
import { ExhibitionIntro } from "@/components/meeting/ExhibitionIntro";
import { MeetingBanner } from "@/components/meeting/MeetingBanner";
import { OrganizationStructure } from "@/components/meeting/OrganizationStructure";
import { getMeetingById } from "@/data/meetings";
import { fetchMeetingDetail } from "@/lib/intl-api";

interface MeetingDetailPageProps {
  params: Promise<{ locale: string; id: string }>;
}

export async function generateMetadata({
  params,
}: MeetingDetailPageProps): Promise<Metadata> {
  const { id } = await params;
  const meeting =
    (await fetchMeetingDetail(id, true)) ?? getMeetingById(id);
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
  const meeting =
    (await fetchMeetingDetail(id, true)) ?? getMeetingById(id);
  if (!meeting) notFound();

  return (
    <main className="flex-1">
      <MeetingBanner meetingId={id} detail={meeting.detail} />
      <ExhibitionIntro paragraphs={meeting.detail.introduction} />
      {meeting.detail.organization.length > 0 ? (
        <OrganizationStructure items={meeting.detail.organization} />
      ) : null}
    </main>
  );
}
