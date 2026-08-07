import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import {
  LookupForm,
  LookupPageShell,
} from "@/components/lookup/LookupForm";

type Props = {
  params: Promise<{ locale: string }>;
};

export const metadata: Metadata = {
  title: "Ticket Lookup",
  description: "Look up your event registration by name and email.",
};

export default async function LookupPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  return (
    <LookupPageShell>
      <LookupForm />
    </LookupPageShell>
  );
}
