import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Hero } from "@/components/home/Hero";
import { LatestMeetings } from "@/components/home/LatestMeetings";
import { Newsletter } from "@/components/home/Newsletter";

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Meta" });
  return {
    title: { absolute: t("homeTitle") },
    description: t("homeDescription"),
  };
}

export default async function HomePage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <main className="flex-1">
      <Hero />
      <LatestMeetings />
      <Newsletter />
    </main>
  );
}
