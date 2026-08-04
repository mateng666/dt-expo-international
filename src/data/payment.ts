import { DEFAULT_TICKET_TIERS } from "@/data/tickets";

export interface PaymentOrder {
  event: string;
  orderNo: string;
  amount: string;
  method: string;
}

export const MOCK_PAYMENT_ORDER: PaymentOrder = {
  event: "Global AI Conference 2026",
  orderNo: "GAI2026-092318",
  amount: "USD 299.00",
  method: "Credit Card (Stripe)",
};

export function buildPendingOrder(eventTitle: string, planId?: string) {
  const tier =
    DEFAULT_TICKET_TIERS.find((item) => item.id === planId) ??
    DEFAULT_TICKET_TIERS[0];
  const stamp = Date.now().toString().slice(-6);
  const amount = /[.,]\d{2}$/.test(tier.price)
    ? tier.price
    : `${tier.price}.00`;
  return {
    event: eventTitle,
    orderNo: `ORD-${stamp}`,
    amount,
    planName: tier.name,
    method: "Credit Card (Stripe)",
  };
}

export const REGIONS = [
  "Southeast Asia",
  "East Asia",
  "South Asia",
  "Central Asia",
  "Middle East",
  "Europe",
  "Africa",
  "North America",
  "Latin America",
  "Oceania",
] as const;

export const INTEREST_TOPICS = [
  "AI",
  "Cloud",
  "Data Center",
  "Networking",
] as const;
