"use client";

import { useTranslations } from "next-intl";
import {
  CalendarDays,
  Check,
  CreditCard,
  FileText,
  ShieldCheck,
  X,
  DollarSign,
} from "lucide-react";
import type { PaymentOrder } from "@/data/payment";
import { Link } from "@/i18n/navigation";

export type PaymentResultStatus = "success" | "failed";

interface PaymentResultCardProps {
  status: PaymentResultStatus;
  order: PaymentOrder;
  meetingId: string;
}

export function PaymentResultCard({
  status,
  order,
  meetingId,
}: PaymentResultCardProps) {
  const t = useTranslations("Payment");
  const isSuccess = status === "success";

  const rows = [
    { label: t("event"), value: order.event, Icon: CalendarDays },
    { label: t("orderNo"), value: order.orderNo, Icon: FileText },
    {
      label: isSuccess ? t("amountPaid") : t("attemptedAmount"),
      value: order.amount,
      Icon: DollarSign,
    },
    { label: t("paymentMethod"), value: order.method, Icon: CreditCard },
    {
      label: t("status"),
      value: isSuccess ? t("completed") : t("failed"),
      Icon: ShieldCheck,
      valueClass: isSuccess ? "text-[#16A34A]" : "text-[#EF4444]",
    },
  ];

  return (
    <div className="mx-auto w-full max-w-[560px] rounded-[16px] bg-white px-6 py-10 shadow-[0_8px_32px_rgba(0,0,0,0.08)] sm:px-10">
      <div className="flex flex-col items-center text-center">
        {isSuccess ? (
          <div className="flex h-20 w-20 items-center justify-center rounded-full bg-brand shadow-[0_0_28px_rgba(2,97,255,0.35)]">
            <Check className="h-10 w-10 text-white" strokeWidth={3} />
          </div>
        ) : (
          <div className="relative flex h-20 w-20 items-center justify-center rounded-full bg-[#EF4444] shadow-[0_0_28px_rgba(239,68,68,0.4)]">
            <X className="h-10 w-10 text-white" strokeWidth={3} />
            <span className="absolute -right-1 -top-1 h-2 w-2 rounded-full bg-[#FCA5A5]" />
            <span className="absolute -bottom-0.5 -left-1 h-1.5 w-1.5 rounded-full bg-[#FECACA]" />
          </div>
        )}

        <h1 className="mt-6 text-[32px] font-bold text-[#0B1F44]">
          {isSuccess ? t("successTitle") : t("failedTitle")}
        </h1>
        <p className="mt-3 max-w-[420px] text-[15px] leading-6 text-text-muted">
          {isSuccess ? t("successSubtitle") : t("failedSubtitle")}
        </p>
      </div>

      <div className="mt-8 overflow-hidden rounded-[12px] border border-border-soft bg-[#F8FAFC]">
        {rows.map(({ label, value, Icon, valueClass }, index) => (
          <div
            key={label}
            className={`flex items-center gap-3 px-4 py-3.5 text-[14px] sm:px-5 sm:text-[15px] ${
              index > 0 ? "border-t border-border-soft" : ""
            }`}
          >
            <Icon className="h-4 w-4 shrink-0 text-brand" strokeWidth={2} />
            <span className="w-[140px] shrink-0 text-text-muted">{label}</span>
            <span
              className={`ml-auto text-right font-medium text-foreground ${valueClass ?? ""}`}
            >
              {value}
            </span>
          </div>
        ))}
      </div>

      <div className="mt-8 grid grid-cols-1 gap-3 sm:grid-cols-2">
        <Link
          href={
            isSuccess
              ? `/meetings/${meetingId}`
              : `/meetings/${meetingId}/payment`
          }
          className="inline-flex h-12 items-center justify-center rounded-[6px] bg-brand text-[16px] font-medium text-white transition hover:bg-[#0052db]"
        >
          {isSuccess ? t("viewRegistration") : t("tryAgain")}
        </Link>
        <Link
          href="/"
          className="inline-flex h-12 items-center justify-center rounded-[6px] border border-brand bg-white text-[16px] font-medium text-brand transition hover:bg-[#E8F1FF]"
        >
          {t("backToHome")}
        </Link>
      </div>
    </div>
  );
}
