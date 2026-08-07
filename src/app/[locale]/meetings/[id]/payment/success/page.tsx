import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import { PaymentResultCard } from "@/components/payment/PaymentResultCard";
import { DecorBackground } from "@/components/shared/DecorBackground";
import { getMeetingById } from "@/data/meetings";
import { fetchMeetingDetail, fetchOrder } from "@/lib/intl-api";

interface PaymentSuccessPageProps {
  params: Promise<{ locale: string; id: string }>;
  searchParams: Promise<{ orderSn?: string }>;
}

export const metadata: Metadata = {
  title: "Payment Successful",
};

export default async function PaymentSuccessPage({
  params,
  searchParams,
}: PaymentSuccessPageProps) {
  const { locale, id } = await params;
  const { orderSn } = await searchParams;
  setRequestLocale(locale);

  const meeting =
    (await fetchMeetingDetail(id, true)) ?? getMeetingById(id);

  let eventName = meeting?.title || `Meeting ${id}`;
  let orderNo = orderSn || "—";
  let amount = "USD 0";
  let method = "Free";

  if (orderSn) {
    try {
      const order = await fetchOrder(orderSn, true);
      if (order.expoName) eventName = order.expoName;
      orderNo = order.orderSn || orderSn;
      if (order.amount != null) {
        amount = `USD ${Number(order.amount).toLocaleString("en-US")}`;
      }
      method = order.zero ? "Free" : "Stripe";
    } catch {
      /* 未登录或订单不可见时仍展示成功态 */
    }
  }

  return (
    <main className="flex flex-1 flex-col">
      <DecorBackground className="min-h-[640px] py-14 md:py-20">
        <div className="container-content w-full">
          <PaymentResultCard
            status="success"
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
