import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { TicketHero } from "@/components/tickets/TicketHero";
import { TicketPlans } from "@/components/tickets/TicketPlans";
import { getMeetingById } from "@/data/meetings";
import {
  fetchMeetingDetail,
  fetchTicketChannel,
  resolveSignup,
} from "@/lib/intl-api";
import { toUserFacingError } from "@/lib/user-facing-error";

interface TicketPageProps {
  params: Promise<{ locale: string; id: string }>;
  searchParams: Promise<{ c?: string; m?: string; i?: string }>;
}

export async function generateMetadata({
  params,
}: TicketPageProps): Promise<Metadata> {
  const { id } = await params;
  const meeting =
    (await fetchMeetingDetail(id, true)) ?? getMeetingById(id);
  if (!meeting) return { title: "Tickets Not Found" };
  return {
    title: `Tickets — ${meeting.title}`,
    description: meeting.detail.introduction[0],
  };
}

export default async function TicketPage({
  params,
  searchParams,
}: TicketPageProps) {
  const { locale, id } = await params;
  const link = await searchParams;
  setRequestLocale(locale);
  const t = await getTranslations("Tickets");

  const meeting =
    (await fetchMeetingDetail(id, true)) ?? getMeetingById(id);
  if (!meeting) notFound();

  let channelId =
    link.c ||
    meeting.signupChannelId ||
    undefined;
  let expoId = Number(id);
  let loadError = "";

  if (link.c || link.m || link.i) {
    try {
      const ctx = await resolveSignup({
        e: Number(id),
        c: link.c ? Number(link.c) : undefined,
        m: link.m ? Number(link.m) : undefined,
        i: link.i ? Number(link.i) : undefined,
        server: true,
      });
      channelId = String(ctx.channelId);
      expoId = ctx.mainExpoId;
    } catch (err) {
      loadError = toUserFacingError(err, t("unavailable"));
    }
  }

  let tiers: Awaited<ReturnType<typeof fetchTicketChannel>>["tiers"] = [];
  try {
    const channel = await fetchTicketChannel({
      expoId,
      channelId: channelId ? Number(channelId) : undefined,
      server: true,
    });
    channelId = String(channel.channelId);
    tiers = channel.tiers;
  } catch (err) {
    loadError = loadError || toUserFacingError(err, t("unavailable"));
  }

  const qs = new URLSearchParams();
  if (channelId) qs.set("c", channelId);
  if (link.m) qs.set("m", link.m);
  if (link.i) qs.set("i", link.i);
  const linkQuery = qs.toString();

  return (
    <main className="flex-1">
      <TicketHero
        title={meeting.title}
        description={meeting.detail.introduction[0]}
        date={meeting.date}
        region={meeting.location}
      />
      {loadError && tiers.length === 0 ? (
        <section className="bg-[#F5F8FC] py-[80px]">
          <div className="container-content text-center">
            <p className="text-[16px] font-medium text-foreground">
              {t("unavailableTitle")}
            </p>
            <p className="mt-2 text-[15px] text-text-muted">{loadError}</p>
          </div>
        </section>
      ) : tiers.length === 0 ? (
        <section className="bg-[#F5F8FC] py-[80px]">
          <p className="container-content text-center text-[15px] text-text-muted">
            {t("empty")}
          </p>
        </section>
      ) : (
        <TicketPlans meetingId={id} tiers={tiers} linkQuery={linkQuery} />
      )}
    </main>
  );
}
