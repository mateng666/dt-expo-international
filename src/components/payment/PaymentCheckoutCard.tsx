"use client";

import { useTranslations } from "next-intl";
import {
  CalendarDays,
  CreditCard,
  FileText,
  DollarSign,
  Ticket,
} from "lucide-react";
import { Link, useRouter } from "@/i18n/navigation";

export interface PendingOrder {
  event: string;
  orderNo: string;
  amount: string;
  planName: string;
  method: string;
}

interface PaymentCheckoutCardProps {
  meetingId: string;
  order: PendingOrder;
  plan?: string;
}

export function PaymentCheckoutCard({
  meetingId,
  order,
  plan,
}: PaymentCheckoutCardProps) {
  const t = useTranslations("Payment");
  const router = useRouter();

  const rows = [
    { label: t("event"), value: order.event, Icon: CalendarDays },
    { label: t("ticketType"), value: order.planName, Icon: Ticket },
    { label: t("orderNo"), value: order.orderNo, Icon: FileText },
    { label: t("amountDue"), value: order.amount, Icon: DollarSign },
    { label: t("paymentMethod"), value: order.method, Icon: CreditCard },
  ];

  const goPay = () => {
    const params = new URLSearchParams();
    if (plan) params.set("plan", plan);
    const qs = params.toString();
    // Mock: real flow will redirect to Stripe Checkout Session URL.
    router.push(
      qs
        ? `/meetings/${meetingId}/payment/success?${qs}`
        : `/meetings/${meetingId}/payment/success`,
    );
  };

  return (
    <div className="mx-auto w-full max-w-[560px] rounded-[16px] bg-white px-6 py-10 shadow-[0_8px_32px_rgba(0,0,0,0.08)] sm:px-10">
      <div className="flex flex-col items-center text-center">
        <div className="flex h-20 w-20 items-center justify-center rounded-full bg-[#E8F1FF] text-brand shadow-[0_0_28px_rgba(2,97,255,0.2)]">
          <CreditCard className="h-10 w-10" strokeWidth={2} />
        </div>
        <h1 className="mt-6 text-[32px] font-bold text-[#0B1F44]">
          {t("checkoutTitle")}
        </h1>
        <p className="mt-3 max-w-[420px] text-[15px] leading-6 text-text-muted">
          {t("checkoutSubtitle")}
        </p>
      </div>

      <div className="mt-8 overflow-hidden rounded-[12px] border border-border-soft bg-[#F8FAFC]">
        {rows.map(({ label, value, Icon }, index) => (
          <div
            key={label}
            className={`flex items-center gap-3 px-4 py-3.5 text-[14px] sm:px-5 sm:text-[15px] ${
              index > 0 ? "border-t border-border-soft" : ""
            }`}
          >
            <Icon className="h-4 w-4 shrink-0 text-brand" strokeWidth={2} />
            <span className="w-[140px] shrink-0 text-text-muted">{label}</span>
            <span className="ml-auto text-right font-medium text-foreground">
              {value}
            </span>
          </div>
        ))}
      </div>

      <div className="mt-8 grid grid-cols-1 gap-3 sm:grid-cols-2">
        <button
          type="button"
          onClick={goPay}
          className="inline-flex h-12 items-center justify-center rounded-[6px] bg-brand text-[16px] font-medium text-white transition hover:bg-[#0052db]"
        >
          {t("payNow")}
        </button>
        <Link
          href={`/meetings/${meetingId}/tickets`}
          className="inline-flex h-12 items-center justify-center rounded-[6px] border border-brand bg-white text-[16px] font-medium text-brand transition hover:bg-[#E8F1FF]"
        >
          {t("changeTicket")}
        </Link>
      </div>

      <p className="mt-5 text-center text-[13px] leading-5 text-text-muted">
        {t("checkoutNote")}
      </p>
    </div>
  );
}
