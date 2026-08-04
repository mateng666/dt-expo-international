import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { setRequestLocale } from "next-intl/server";
import { PaymentCheckoutCard } from "@/components/payment/PaymentCheckoutCard";
import { DecorBackground } from "@/components/shared/DecorBackground";
import { buildPendingOrder } from "@/data/payment";
import { getAllMeetingIds, getMeetingById } from "@/data/meetings";

interface PaymentCheckoutPageProps {
  params: Promise<{ locale: string; id: string }>;
  searchParams: Promise<{ plan?: string }>;
}

export function generateStaticParams() {
  return getAllMeetingIds().map((id) => ({ id }));
}

export const metadata: Metadata = {
  title: "Complete Payment",
};

export default async function PaymentCheckoutPage({
  params,
  searchParams,
}: PaymentCheckoutPageProps) {
  const { locale, id } = await params;
  const { plan } = await searchParams;
  setRequestLocale(locale);
  const meeting = getMeetingById(id);
  if (!meeting) notFound();

  const order = buildPendingOrder(meeting.title, plan);

  return (
    <main className="flex flex-1 flex-col">
      <DecorBackground className="min-h-[640px] py-14 md:py-20">
        <div className="container-content w-full">
          <PaymentCheckoutCard
            meetingId={id}
            order={order}
            plan={plan}
          />
        </div>
      </DecorBackground>
    </main>
  );
}
