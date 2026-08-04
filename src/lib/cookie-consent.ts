export const COOKIE_CONSENT_KEY = "eventnovas_cookie_consent";

export type CookieConsent =
  | { type: "all" }
  | { type: "necessary" }
  | {
      type: "custom";
      preference: boolean;
      analytics: boolean;
    };

export function readCookieConsent(): CookieConsent | null {
  try {
    const raw = window.localStorage.getItem(COOKIE_CONSENT_KEY);
    if (!raw) return null;

    // backward compatible with earlier string values
    if (raw === "all") return { type: "all" };
    if (raw === "necessary") return { type: "necessary" };
    if (raw === "customize") {
      return { type: "custom", preference: true, analytics: true };
    }

    return JSON.parse(raw) as CookieConsent;
  } catch {
    return null;
  }
}

export function writeCookieConsent(consent: CookieConsent) {
  try {
    window.localStorage.setItem(COOKIE_CONSENT_KEY, JSON.stringify(consent));
  } catch {
    // ignore storage failures in private mode
  }
}
