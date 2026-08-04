export interface TicketTier {
  id: string;
  name: string;
  price: string;
  features: string[];
  highlighted?: boolean;
  badge?: string;
}

export const DEFAULT_TICKET_TIERS: TicketTier[] = [
  {
    id: "standard",
    name: "Standard",
    price: "$199",
    features: ["All keynotes & sessions", "Lunch & coffee", "Digital swag"],
  },
  {
    id: "pro",
    name: "Pro",
    price: "$499",
    features: [
      "Everything in Standard",
      "Priority seating",
      "Networking dinner",
      "Session recordings",
    ],
    highlighted: true,
    badge: "Best value",
  },
  {
    id: "vip",
    name: "VIP",
    price: "$1,299",
    features: [
      "Everything in Pro",
      "Speaker meet-and-greet",
      "Premium swag bag",
      "VIP lounge access",
    ],
  },
];

/** Per-meeting ticket hero overrides (keyed by meeting id). */
export const TICKET_HERO_BY_MEETING: Record<
  string,
  {
    title: string;
    description: string;
    date: string;
    region: string;
  }
> = {
  "1": {
    title: "DITExpo",
    description:
      "Google, Salt River Project (SRP) and Energy Dome announced a collaboration to explore how Energy Dome’s CO₂ Battery technology could support the development of non-lithium-ion long-duration energy storage solutions for SRP’s electric grid.",
    date: "17 Jun 2026",
    region: "China",
  },
};
