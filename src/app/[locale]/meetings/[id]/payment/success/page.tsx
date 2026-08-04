import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { setRequestLocale } from "next-intl/server";
import { PaymentResultCard } from "@/components/payment/PaymentResultCard";
import { DecorBackground } from "@/components/shared/DecorBackground";
import { MOCK_PAYMENT_ORDER } from "@/data/payment";
import { getAllMeetingIds, getMeetingById } from "@/data/meetings";

interface PaymentSuccessPageProps {
  params: Promise<{ locale: string; id: string }>;
}

export function generateStaticParams() {
  return getAllMeetingIds().map((id) => ({ id }));
}

export const metadata: Metadata = {
  title: "Payment Successful",
};

export default async function PaymentSuccessPage({
  params,
}: PaymentSuccessPageProps) {
  const { locale, id } = await params;
  setRequestLocale(locale);
  const meeting = getMeetingById(id);
  if (!meeting) notFound();

  const order = {
    ...MOCK_PAYMENT_ORDER,
    event: meeting.title,
  };

  return (
    <main className="flex flex-1 flex-col">
      <DecorBackground className="min-h-[640px] py-14 md:py-20">
        <div className="container-content w-full">
          <PaymentResultCard status="success" order={order} meetingId={id} />
        </div>
      </DecorBackground>
    </main>
  );
}
