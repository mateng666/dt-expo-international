import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { setRequestLocale } from "next-intl/server";
import { RegistrationForm } from "@/components/register/RegistrationForm";
import { DecorBackground } from "@/components/shared/DecorBackground";
import { getAllMeetingIds, getMeetingById } from "@/data/meetings";

interface RegisterPageProps {
  params: Promise<{ locale: string; id: string }>;
  searchParams: Promise<{ plan?: string }>;
}

export function generateStaticParams() {
  return getAllMeetingIds().map((id) => ({ id }));
}

export async function generateMetadata({
  params,
}: RegisterPageProps): Promise<Metadata> {
  const { id } = await params;
  const meeting = getMeetingById(id);
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
  const { plan } = await searchParams;
  const meeting = getMeetingById(id);
  if (!meeting) notFound();

  return (
    <main className="flex-1">
      <DecorBackground className="py-14 md:py-20">
        <div className="container-content">
          <RegistrationForm meetingId={id} plan={plan} />
        </div>
      </DecorBackground>
    </main>
  );
}
