"use client";

import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import {
  CalendarDays,
  CreditCard,
  FileText,
  DollarSign,
  Ticket,
} from "lucide-react";
import { Link } from "@/i18n/navigation";
import { continuePay, fetchOrder, type OrderView } from "@/lib/intl-api";
import { getClientToken, goUserCenterLogin } from "@/lib/session";

interface PaymentCheckoutCardProps {
  meetingId: string;
  orderSn?: string;
  plan?: string;
}

function absoluteUrl(path: string) {
  if (typeof window === "undefined") return path;
  return `${window.location.origin}${path.startsWith("/") ? path : `/${path}`}`;
}

export function PaymentCheckoutCard({
  meetingId,
  orderSn,
  plan,
}: PaymentCheckoutCardProps) {
  const t = useTranslations("Payment");
  const [order, setOrder] = useState<OrderView | null>(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(Boolean(orderSn));
  const [paying, setPaying] = useState(false);

  useEffect(() => {
    if (!orderSn) {
      setLoading(false);
      return;
    }
    if (!getClientToken()) {
      goUserCenterLogin();
      return;
    }
    let cancelled = false;
    setLoading(true);
    fetchOrder(orderSn)
      .then((data) => {
        if (!cancelled) setOrder(data);
      })
      .catch((err) => {
        if (!cancelled) {
          setError(err instanceof Error ? err.message : t("loadError"));
        }
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });
    return () => {
      cancelled = true;
    };
  }, [orderSn, t]);

  const rows = [
    {
      label: t("event"),
      value: order?.expoName || "—",
      Icon: CalendarDays,
    },
    {
      label: t("ticketType"),
      value: plan || "—",
      Icon: Ticket,
    },
    {
      label: t("orderNo"),
      value: order?.orderSn || orderSn || "—",
      Icon: FileText,
    },
    {
      label: t("amountDue"),
      value:
        order?.amount != null
          ? `USD ${Number(order.amount).toLocaleString("en-US")}`
          : "—",
      Icon: DollarSign,
    },
    {
      label: t("paymentMethod"),
      value: "Stripe",
      Icon: CreditCard,
    },
  ];

  const goPay = async () => {
    if (!orderSn) {
      setError(t("missingOrder"));
      return;
    }
    if (!getClientToken()) {
      goUserCenterLogin();
      return;
    }
    setPaying(true);
    setError("");
    try {
      const data = await continuePay(
        orderSn,
        absoluteUrl(
          `/en/meetings/${meetingId}/payment/success?orderSn=${encodeURIComponent(orderSn)}`,
        ),
        absoluteUrl(
          `/en/meetings/${meetingId}/payment/failed?orderSn=${encodeURIComponent(orderSn)}`,
        ),
      );
      if (data.checkoutUrl) {
        window.location.href = data.checkoutUrl;
        return;
      }
      setError(t("noCheckoutUrl"));
    } catch (err) {
      setError(err instanceof Error ? err.message : t("payError"));
    } finally {
      setPaying(false);
    }
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

      {loading ? (
        <p className="mt-8 text-center text-[14px] text-text-muted">
          {t("loading")}
        </p>
      ) : (
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
      )}

      {error ? (
        <p className="mt-4 text-center text-[14px] text-[#EF4444]">{error}</p>
      ) : null}

      <div className="mt-8 grid grid-cols-1 gap-3 sm:grid-cols-2">
        <button
          type="button"
          onClick={goPay}
          disabled={paying || loading || !orderSn}
          className="inline-flex h-12 items-center justify-center rounded-[6px] bg-brand text-[16px] font-medium text-white transition hover:bg-[#0052db] disabled:opacity-60"
        >
          {paying ? t("paying") : t("payNow")}
        </button>
        <Link
          href={`/meetings/${meetingId}/tickets`}
          className="inline-flex h-12 items-center justify-center rounded-[6px] border border-brand bg-white text-[16px] font-medium text-brand transition hover:bg-[#E8F1FF]"
        >
          {t("changeTicket")}
        </Link>
      </div>

      <p className="mt-6 text-center text-[13px] leading-5 text-text-muted">
        {t("checkoutNote")}
      </p>
    </div>
  );
}
