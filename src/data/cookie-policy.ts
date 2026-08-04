import { SITE_CONTACT } from "@/data/site-contact";

export interface CookieRow {
  name: string;
  purpose: string;
  duration: string;
}

export interface CookieGroup {
  id: string;
  title: string;
  rows: CookieRow[];
}

export const COOKIE_GROUPS: CookieGroup[] = [
  {
    id: "essential",
    title: "2.1 Essential Cookies (Cannot Be Disabled)",
    rows: [
      {
        name: "session_id",
        purpose: "Maintains your login session and shopping cart state",
        duration: "Session",
      },
      {
        name: "csrf_token",
        purpose: "Protects against cross-site request forgery attacks",
        duration: "Session",
      },
      {
        name: "stripe_mid",
        purpose: "Fraud prevention for payment processing (Stripe)",
        duration: "1 year",
      },
      {
        name: "stripe_sid",
        purpose: "Fraud prevention for payment processing (Stripe)",
        duration: "30 minutes",
      },
    ],
  },
  {
    id: "preference",
    title: "2.2 Preference Cookies (Optional)",
    rows: [
      {
        name: "language",
        purpose: "Stores your preferred language setting",
        duration: "1 year",
      },
      {
        name: "theme",
        purpose: "Stores your display preference (light/dark mode)",
        duration: "1 year",
      },
    ],
  },
  {
    id: "analytics",
    title: "2.3 Analytics Cookies (Optional)",
    rows: [
      {
        name: "_ga",
        purpose: "Distinguishes unique users for Google Analytics",
        duration: "2 years",
      },
      {
        name: "_gid",
        purpose: "Distinguishes users for Google Analytics (short-term)",
        duration: "24 hours",
      },
    ],
  },
];

export const COOKIE_POLICY_META = {
  title: "Cookie Policy",
  lastUpdated: "August 3, 2026",
  contactEmail: SITE_CONTACT.email,
};
