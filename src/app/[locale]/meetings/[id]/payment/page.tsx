import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { setRequestLocale } from "next-intl/server";
import { PaymentCheckoutCard } from "@/components/payment/PaymentCheckoutCard";
import { DecorBackground } from "@/components/shared/DecorBackground";
import { getMeetingById } from "@/data/meetings";
import { fetchMeetingDetail } from "@/lib/intl-api";

interface PaymentCheckoutPageProps {
  params: Promise<{ locale: string; id: string }>;
  searchParams: Promise<{ plan?: string; orderSn?: string }>;
}

export const metadata: Metadata = {
  title: "Complete Payment",
};

export default async function PaymentCheckoutPage({
  params,
  searchParams,
}: PaymentCheckoutPageProps) {
  const { locale, id } = await params;
  const { plan, orderSn } = await searchParams;
  setRequestLocale(locale);
  const meeting =
    (await fetchMeetingDetail(id, true)) ?? getMeetingById(id);
  if (!meeting) notFound();

  return (
    <main className="flex flex-1 flex-col">
      <DecorBackground className="min-h-[640px] py-14 md:py-20">
        <div className="container-content w-full">
          <PaymentCheckoutCard
            meetingId={id}
            orderSn={orderSn}
            plan={plan}
          />
        </div>
      </DecorBackground>
    </main>
  );
}
