import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import { PaymentResultCard } from "@/components/payment/PaymentResultCard";
import { DecorBackground } from "@/components/shared/DecorBackground";
import { getMeetingById } from "@/data/meetings";
import { fetchMeetingDetail, fetchOrder } from "@/lib/intl-api";

interface PaymentFailedPageProps {
  params: Promise<{ locale: string; id: string }>;
  searchParams: Promise<{ orderSn?: string }>;
}

export const metadata: Metadata = {
  title: "Payment Failed",
};

export default async function PaymentFailedPage({
  params,
  searchParams,
}: PaymentFailedPageProps) {
  const { locale, id } = await params;
  const { orderSn } = await searchParams;
  setRequestLocale(locale);

  const meeting =
    (await fetchMeetingDetail(id, true)) ?? getMeetingById(id);

  let eventName = meeting?.title || `Meeting ${id}`;
  let orderNo = orderSn || "—";
  let amount = "—";
  let method = "Stripe";

  if (orderSn) {
    try {
      const order = await fetchOrder(orderSn, true);
      if (order.expoName) eventName = order.expoName;
      orderNo = order.orderSn || orderSn;
      if (order.amount != null) {
        amount = `USD ${Number(order.amount).toLocaleString("en-US")}`;
      }
    } catch {
      /* ignore */
    }
  }

  return (
    <main className="flex flex-1 flex-col">
      <DecorBackground className="min-h-[640px] py-14 md:py-20">
        <div className="container-content w-full">
          <PaymentResultCard
            status="failed"
            meetingId={id}
            order={{
              event: eventName,
              orderNo,
              amount,
              method,
            }}
          />
        </div>
      </DecorBackground>
    </main>
  );
}
