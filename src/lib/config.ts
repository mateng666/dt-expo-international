/** 门户运行时配置（与 intl-user-center 对齐）。 */

export function apiBaseUrl(): string {
  return (process.env.NEXT_PUBLIC_API_BASE_URL || "").replace(/\/$/, "");
}

/** 服务端直连后端（绕过浏览器 rewrite）。 */
export function serverApiBaseUrl(): string {
  const target =
    process.env.API_PROXY_TARGET ||
    process.env.NEXT_PUBLIC_API_BASE_URL ||
    "http://127.0.0.1:7033";
  return target.replace(/\/$/, "");
}

export function userCenterUrl(): string {
  return (
    process.env.NEXT_PUBLIC_USER_CENTER_URL || "http://localhost:5174"
  ).replace(/\/$/, "");
}

export function cookieDomain(): string {
  return (process.env.NEXT_PUBLIC_COOKIE_DOMAIN || "").trim();
}

export function resolveApiUrl(path: string): string {
  const p = path.startsWith("/") ? path : `/${path}`;
  if (typeof window !== "undefined") {
    return `${apiBaseUrl()}${p}`;
  }
  return `${serverApiBaseUrl()}${p}`;
}
