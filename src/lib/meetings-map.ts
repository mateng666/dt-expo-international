import type {
  Meeting,
  MeetingCategory,
  MeetingDetail,
  MeetingStatus,
} from "@/data/meetings";
import { SITE_CONTACT } from "@/data/site-contact";

const PLACEHOLDER_IMAGE = "/images/meetings/m1.jpg";
const BANNER_FALLBACK = "/images/home/bj.png";

export type ApiMeeting = {
  id?: number | string;
  name?: string;
  expoCover?: string;
  mpCoverImg?: string;
  startDate?: string | number;
  endDate?: string | number;
  address?: string;
  city?: string;
  status?: string | number;
  statusTxt?: string;
  publishStatus?: string | number;
  signupChannelId?: number | string | null;
  introduction?: string;
  expoBackgroundIntro?: string;
  startDateTxt?: string;
};

export type PageBean<T> = {
  pageNum?: number;
  pageSize?: number;
  totalPage?: number;
  totalRows?: number;
  data?: T[];
};

function formatDateRange(
  start?: string | number,
  end?: string | number,
  startTxt?: string,
): string {
  if (startTxt) return startTxt;
  const s = toDateLabel(start);
  const e = toDateLabel(end);
  if (s && e && s !== e) return `${s} – ${e}`;
  return s || e || "TBA";
}

function toDateLabel(raw?: string | number): string {
  if (raw == null || raw === "") return "";
  const d = new Date(raw);
  if (Number.isNaN(d.getTime())) return String(raw);
  return d.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

function deriveStatus(item: ApiMeeting): MeetingStatus {
  const now = Date.now();
  const start = item.startDate ? new Date(item.startDate).getTime() : NaN;
  const end = item.endDate ? new Date(item.endDate).getTime() : NaN;
  if (!Number.isNaN(end) && end < now) return "Finished";
  if (!Number.isNaN(start) && start > now + 14 * 24 * 3600 * 1000) {
    return "Coming Soon";
  }
  return "Signing Up";
}

function splitIntro(text?: string): string[] {
  if (!text?.trim()) return [];
  return text
    .split(/\n+/)
    .map((p) => p.trim())
    .filter(Boolean);
}

function buildDetail(item: ApiMeeting): MeetingDetail {
  const fromIntro = splitIntro(item.introduction);
  const fromBg = splitIntro(item.expoBackgroundIntro);
  const intro = fromIntro.length > 0 ? fromIntro : fromBg;
  const paragraphs =
    intro.length > 0
      ? intro
      : ["Event details will be announced soon."];
  return {
    bannerTitle: item.name || "Event",
    promoTag: "Investment Promotion Open",
    bannerImage: item.expoCover || item.mpCoverImg || BANNER_FALLBACK,
    contact: {
      name: "Event Support",
      phone: SITE_CONTACT.phone,
      email: SITE_CONTACT.email,
    },
    introduction: paragraphs,
    organization: [],
  };
}

/** 列表项 / 详情 → 门户 Meeting 视图模型。 */
export function mapApiMeeting(item: ApiMeeting): Meeting {
  const id = String(item.id ?? "");
  const location =
    [item.city, item.address].filter(Boolean).join(", ") || "TBA";
  return {
    id,
    title: item.name || `Meeting ${id}`,
    date: formatDateRange(item.startDate, item.endDate, item.startDateTxt),
    location,
    category: "IT Technology" as MeetingCategory,
    status: deriveStatus(item),
    attendees: "—",
    image: item.mpCoverImg || item.expoCover || PLACEHOLDER_IMAGE,
    detail: buildDetail(item),
    signupChannelId:
      item.signupChannelId != null ? String(item.signupChannelId) : null,
  };
}

export function mapTicketTypes(
  channel: {
    ticketTypes?: Array<{
      id?: number | string;
      ticketName?: string;
      price?: number | string;
      currency?: string;
      rightsIntroduce?: string;
      spectatorRights?: string;
      isShowPrice?: string | number;
    }>;
  } | null,
): import("@/data/tickets").TicketTier[] {
  const list = channel?.ticketTypes || [];
  return list.map((t, index) => {
    const currency = (t.currency || "USD").toUpperCase();
    const showPrice = String(t.isShowPrice ?? "1") !== "0";
    const amount =
      t.price == null || t.price === ""
        ? "0"
        : Number(t.price).toLocaleString("en-US");
    const features = [t.rightsIntroduce, t.spectatorRights]
      .filter(Boolean)
      .flatMap((s) =>
        String(s)
          .split(/[\n;；]/)
          .map((x) => x.trim())
          .filter(Boolean),
      );
    return {
      id: String(t.id),
      name: t.ticketName || `Ticket ${t.id}`,
      price: showPrice ? `${currency} ${amount}` : "Contact us",
      features: features.length > 0 ? features : ["Conference access"],
      highlighted: index === 1,
      badge: index === 1 ? "Best value" : undefined,
    };
  });
}
