/**
 * SEO TDK extracted from Eventnovas platform copy.
 * Slogan: Global Tech, New Connections
 */

export const SITE_NAME = "Eventnovas";
export const SITE_SLOGAN = "Global Tech, New Connections";

/** Version 1 — homepage / brand About (primary) */
export const SEO_HOME = {
  title: `${SITE_NAME} | ${SITE_SLOGAN}`,
  description:
    "Eventnovas is a global all-in-one digital platform for technology exhibitions and conferences. End-to-end tools for branded registration, smart check-in, attendee data, lead capture and real-time analytics.",
  keywords: [
    "Eventnovas",
    "Global Tech, New Connections",
    "tech exhibitions",
    "tech conferences",
    "digital event platform",
    "event registration",
    "smart check-in",
    "lead capture",
    "event analytics",
    "hybrid events",
    "cross-border events",
    "business matchmaking",
  ],
} as const;

/** Version 2 — short blurb (cards, social, about strip) */
export const SEO_SHORT = {
  title: `${SITE_NAME} | ${SITE_SLOGAN}`,
  description:
    "Eventnovas is an international digital event platform for global tech exhibitions and conferences — registration, smart check-in, data governance and business matching across regions.",
} as const;

/** Version 3 — bilingual / BD materials (Chinese meta when needed) */
export const SEO_ZH = {
  title: `${SITE_NAME} | ${SITE_SLOGAN}`,
  description:
    "Eventnovas 面向全球科技类展览与会议打造一站式数字化会展平台，提供线上注册、智能签到、客商管理、线索采集与实时数据分析，推动全球科创精准对接。",
  keywords: [
    "Eventnovas",
    "数字化会展平台",
    "科技展会",
    "会议注册",
    "智能签到",
    "线索采集",
    "数据分析",
    "商务对接",
  ],
} as const;

export const FOOTER_TAGLINE =
  "Your global hub for tech exhibitions, conferences, and professional connections.";
