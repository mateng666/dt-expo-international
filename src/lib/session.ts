import { cookieDomain, userCenterUrl } from "./config";

export const TOKEN_KEY = "intl.token";

function readCookie(name: string): string | null {
  if (typeof document === "undefined") return null;
  const prefix = `${encodeURIComponent(name)}=`;
  for (const part of document.cookie.split(";")) {
    const s = part.trim();
    if (s.startsWith(prefix)) {
      return decodeURIComponent(s.slice(prefix.length));
    }
  }
  return null;
}

export function getClientToken(): string | null {
  return readCookie(TOKEN_KEY);
}

export function clearClientToken() {
  if (typeof document === "undefined") return;
  const secure =
    typeof window !== "undefined" && window.location.protocol === "https:"
      ? "; Secure"
      : "";
  document.cookie = `${encodeURIComponent(TOKEN_KEY)}=; Path=/; Max-Age=0; SameSite=Lax${secure}`;
  const domain = cookieDomain();
  if (domain) {
    document.cookie = `${encodeURIComponent(TOKEN_KEY)}=; Path=/; Max-Age=0; SameSite=Lax; Domain=${domain}${secure}`;
  }
}

/** 跳转用户中心登录，登录后回当前页。 */
export function goUserCenterLogin(returnUrl?: string) {
  const base = userCenterUrl();
  const ret =
    returnUrl ||
    (typeof window !== "undefined" ? window.location.href : "/");
  const url = new URL(`${base}/login`);
  url.searchParams.set("returnUrl", ret);
  window.location.href = url.toString();
}

/** 打开用户中心路径（如 `/me/tickets`、`/me/orders`）。 */
export function goUserCenter(path = "/me/tickets") {
  const base = userCenterUrl();
  const p = path.startsWith("/") ? path : `/${path}`;
  window.location.href = `${base}${p}`;
}

export function goUserCenterAccount() {
  goUserCenter("/me/tickets");
}
