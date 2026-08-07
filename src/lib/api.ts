import { resolveApiUrl } from "./config";
import { getClientToken, TOKEN_KEY } from "./session";

export class ApiError extends Error {
  code: number;
  errorCode?: string;

  constructor(message: string, code: number, errorCode?: string) {
    super(message);
    this.name = "ApiError";
    this.code = code;
    this.errorCode = errorCode;
  }
}

type AjaxBody = {
  code?: number;
  msg?: string;
  error_code?: string;
  data?: unknown;
};

async function parseAjax(res: Response): Promise<unknown> {
  let body: AjaxBody;
  try {
    body = (await res.json()) as AjaxBody;
  } catch {
    throw new ApiError(res.statusText || "Invalid response", res.status);
  }
  if (body.code !== 200) {
    throw new ApiError(
      body.msg || "Request failed",
      body.code ?? res.status,
      body.error_code,
    );
  }
  return body.data;
}

/** 浏览器端请求（带 intl.token Cookie）。 */
export async function apiClient<T = unknown>(
  path: string,
  init: RequestInit = {},
): Promise<T> {
  const headers = new Headers(init.headers);
  if (!headers.has("Content-Type") && init.body) {
    headers.set("Content-Type", "application/json");
  }
  const token = getClientToken();
  if (token) headers.set("Authorization", `Bearer ${token}`);
  const res = await fetch(resolveApiUrl(path), { ...init, headers });
  return (await parseAjax(res)) as T;
}

/** 服务端组件 / Route Handler 请求。 */
export async function apiServer<T = unknown>(
  path: string,
  init: RequestInit = {},
): Promise<T> {
  const headers = new Headers(init.headers);
  if (!headers.has("Content-Type") && init.body) {
    headers.set("Content-Type", "application/json");
  }
  try {
    const { cookies } = await import("next/headers");
    const jar = await cookies();
    const token = jar.get(TOKEN_KEY)?.value;
    if (token) headers.set("Authorization", `Bearer ${token}`);
  } catch {
    /* cookies() 仅在请求上下文可用 */
  }
  const res = await fetch(resolveApiUrl(path), {
    ...init,
    headers,
    cache: "no-store",
  });
  return (await parseAjax(res)) as T;
}
