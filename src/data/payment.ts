export interface PaymentOrder {
  event: string;
  orderNo: string;
  amount: string;
  method: string;
}

export const MOCK_PAYMENT_ORDER: PaymentOrder = {
  event: "Global AI Conference 2026",
  orderNo: "GAI2026-092318",
  amount: "$299.00",
  method: "Credit Card",
};

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
