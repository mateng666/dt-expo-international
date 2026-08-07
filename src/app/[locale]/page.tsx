import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Hero } from "@/components/home/Hero";
import { LatestMeetings } from "@/components/home/LatestMeetings";
import { Newsletter } from "@/components/home/Newsletter";
import { meetings as mockMeetings } from "@/data/meetings";
import { fetchMeetingsPage } from "@/lib/intl-api";

type Props = {
  params: Promise<{ locale: string }>;
  searchParams: Promise<{ q?: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Meta" });
  return {
    title: { absolute: t("homeTitle") },
    description: t("homeDescription"),
  };
}

export default async function HomePage({ params, searchParams }: Props) {
  const { locale } = await params;
  const { q } = await searchParams;
  setRequestLocale(locale);

  const result = await fetchMeetingsPage({
    keyword: q,
    pageSize: 30,
    server: true,
  });
  const list = result.ok ? result.meetings : mockMeetings;

  return (
    <main className="flex-1">
      <Hero />
      <LatestMeetings meetings={list} />
      <Newsletter />
    </main>
  );
}
