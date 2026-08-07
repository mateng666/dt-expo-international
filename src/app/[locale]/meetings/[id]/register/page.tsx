import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { setRequestLocale } from "next-intl/server";
import { RegistrationForm } from "@/components/register/RegistrationForm";
import { DecorBackground } from "@/components/shared/DecorBackground";
import { getMeetingById } from "@/data/meetings";
import { fetchMeetingDetail } from "@/lib/intl-api";

interface RegisterPageProps {
  params: Promise<{ locale: string; id: string }>;
  searchParams: Promise<{
    plan?: string;
    c?: string;
    m?: string;
    i?: string;
  }>;
}

export async function generateMetadata({
  params,
}: RegisterPageProps): Promise<Metadata> {
  const { id } = await params;
  const meeting =
    (await fetchMeetingDetail(id, true)) ?? getMeetingById(id);
  if (!meeting) return { title: "Registration Not Found" };
  return {
    title: `Event Registration — ${meeting.title}`,
    description: "Complete the form below to join the conference.",
  };
}

export default async function RegisterPage({
  params,
  searchParams,
}: RegisterPageProps) {
  const { locale, id } = await params;
  setRequestLocale(locale);
  const sp = await searchParams;
  const meeting =
    (await fetchMeetingDetail(id, true)) ?? getMeetingById(id);
  if (!meeting) notFound();

  const channelId = sp.c || meeting.signupChannelId || undefined;

  return (
    <main className="flex flex-1 flex-col">
      <DecorBackground className="min-h-[640px] py-14 md:py-20">
        <div className="container-content w-full">
          <RegistrationForm
            meetingId={id}
            plan={sp.plan}
            channelId={channelId || undefined}
            childExpoId={sp.m}
            inviteCodeId={sp.i}
          />
        </div>
      </DecorBackground>
    </main>
  );
}
