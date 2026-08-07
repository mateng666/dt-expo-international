import { apiClient, apiServer } from "./api";
import {
  mapApiMeeting,
  mapTicketTypes,
  type ApiMeeting,
  type PageBean,
} from "./meetings-map";
import type { Meeting } from "@/data/meetings";
import type { TicketTier } from "@/data/tickets";

export type SignupContext = {
  mainExpoId: number;
  channelId: number;
  entryExpoId: number;
  inviteCodeId?: number | null;
  meetingEnded: boolean;
  channelClosed: boolean;
  canSignup: boolean;
  expoName?: string;
};

export type CreateOrderBody = {
  e: number;
  c?: number;
  m?: number;
  i?: number;
  ticketTypeId: number;
  inviteCodeId?: number;
  participantName?: string;
  /** 参会人邮箱（限购键；可与登录邮箱不同，支持代买） */
  participantEmail?: string;
  formPayloadJson?: string;
  successUrl?: string;
  cancelUrl?: string;
};

export type CreateOrderResult = {
  orderSn: string;
  orderId?: number;
  zero?: boolean;
  checkoutUrl?: string;
  status?: string;
};

export type OrderView = {
  orderSn: string;
  status?: string;
  amount?: number | string;
  name?: string;
  expoName?: string;
  zero?: boolean;
  canCancel?: boolean;
};

export type LegalDocument = {
  title: string;
  effectiveDate?: string;
  lastUpdatedLabel?: string;
  sections?: Array<{
    title: string;
    paragraphs?: string[];
    bullets?: string[];
  }>;
};

export type MeProfile = {
  email?: string;
  name?: string;
  nickName?: string;
  emailVerified?: boolean | number | string;
  cancelStatus?: string | number;
};

export async function fetchMeetingsPage(opts?: {
  keyword?: string;
  pageNum?: number;
  pageSize?: number;
  server?: boolean;
}): Promise<{ meetings: Meeting[]; ok: boolean }> {
  const q = new URLSearchParams();
  if (opts?.keyword) q.set("keyword", opts.keyword);
  q.set("pageNum", String(opts?.pageNum ?? 1));
  q.set("pageSize", String(opts?.pageSize ?? 20));
  const path = `/api/intl/meetings?${q.toString()}`;
  const fetchFn = opts?.server === false ? apiClient : apiServer;
  try {
    const page = await fetchFn<PageBean<ApiMeeting>>(path);
    return {
      meetings: (page?.data || []).map(mapApiMeeting),
      ok: true,
    };
  } catch {
    return { meetings: [], ok: false };
  }
}

export async function fetchMeetingDetail(
  id: string,
  server = true,
): Promise<Meeting | null> {
  const fetchFn = server ? apiServer : apiClient;
  try {
    const raw = await fetchFn<ApiMeeting>(`/api/intl/meetings/${id}`);
    return mapApiMeeting(raw);
  } catch {
    return null;
  }
}

export async function resolveSignup(params: {
  e: number;
  c?: number;
  m?: number;
  i?: number;
  server?: boolean;
}): Promise<SignupContext> {
  const q = new URLSearchParams({ e: String(params.e) });
  if (params.c != null) q.set("c", String(params.c));
  if (params.m != null) q.set("m", String(params.m));
  if (params.i != null) q.set("i", String(params.i));
  const fetchFn = params.server === false ? apiClient : apiServer;
  return fetchFn<SignupContext>(`/api/intl/signup/resolve?${q}`);
}

export type TicketChannelResult = {
  channelId: number;
  channelName?: string;
  tiers: TicketTier[];
  raw?: Record<string, unknown>;
};

/** 拉通道票种：channelId 可空，走 catalog（未传时后端解析大会默认通道）。 */
export async function fetchTicketChannel(opts: {
  expoId: number;
  channelId?: number;
  server?: boolean;
}): Promise<TicketChannelResult> {
  const q = new URLSearchParams({ expoId: String(opts.expoId) });
  const fetchFn = opts.server === false ? apiClient : apiServer;
  const path =
    opts.channelId != null
      ? `/api/intl/channels/${opts.channelId}/ticket-types?${q}`
      : `/api/intl/channels/ticket-types?${q}`;
  const channel = await fetchFn<{
    id?: number;
    name?: string;
    ticketTypes?: unknown[];
  }>(path);
  const channelId = Number(channel?.id);
  if (!Number.isFinite(channelId)) {
    throw new Error("Channel unavailable");
  }
  return {
    channelId,
    channelName: channel?.name,
    tiers: mapTicketTypes(channel as Parameters<typeof mapTicketTypes>[0]),
    raw: channel as Record<string, unknown>,
  };
}

export async function fetchTicketTiers(opts: {
  expoId: number;
  channelId: number;
  server?: boolean;
}): Promise<TicketTier[]> {
  const result = await fetchTicketChannel(opts);
  return result.tiers;
}

export async function fetchFormMeta(
  channelId: number,
  server = true,
): Promise<import("./form-meta").FormMetaPayload | null> {
  const fetchFn = server ? apiServer : apiClient;
  try {
    return await fetchFn(`/api/intl/signup/form-meta?channelId=${channelId}`);
  } catch {
    return null;
  }
}

export async function createOrder(
  body: CreateOrderBody,
): Promise<CreateOrderResult> {
  return apiClient<CreateOrderResult>("/api/intl/orders", {
    method: "POST",
    body: JSON.stringify(body),
  });
}

export async function fetchOrder(
  orderSn: string,
  server = false,
): Promise<OrderView> {
  const fetchFn = server ? apiServer : apiClient;
  return fetchFn<OrderView>(
    `/api/intl/orders/${encodeURIComponent(orderSn)}`,
  );
}

export async function continuePay(
  orderSn: string,
  successUrl?: string,
  cancelUrl?: string,
): Promise<{ checkoutUrl?: string }> {
  const q = new URLSearchParams();
  if (successUrl) q.set("successUrl", successUrl);
  if (cancelUrl) q.set("cancelUrl", cancelUrl);
  const qs = q.toString();
  return apiClient(
    `/api/intl/orders/${encodeURIComponent(orderSn)}/continue-pay${qs ? `?${qs}` : ""}`,
    { method: "POST" },
  );
}

export async function fetchLegal(
  type: "privacy" | "terms",
  server = true,
): Promise<LegalDocument | null> {
  const fetchFn = server ? apiServer : apiClient;
  try {
    return await fetchFn<LegalDocument>(`/api/intl/legal/${type}`);
  } catch {
    return null;
  }
}

export async function lookupTickets(body: {
  name: string;
  email: string;
  turnstileToken?: string;
}): Promise<{ items?: Array<Record<string, unknown>> }> {
  return apiClient("/api/intl/lookup", {
    method: "POST",
    body: JSON.stringify(body),
  });
}

export async function fetchMe(): Promise<MeProfile | null> {
  try {
    return await apiClient<MeProfile>("/api/intl/auth/me");
  } catch {
    return null;
  }
}

/** 登出：失败也由调用方清本地 Cookie。 */
export async function logoutMe(): Promise<void> {
  await apiClient("/api/intl/auth/logout", { method: "POST" });
}

export async function quotaCheck(
  mainExpoId: number,
  email: string,
): Promise<{ occupied: boolean }> {
  const q = new URLSearchParams({
    mainExpoId: String(mainExpoId),
    email,
  });
  return apiClient(`/api/intl/signup/quota-check?${q}`);
}
