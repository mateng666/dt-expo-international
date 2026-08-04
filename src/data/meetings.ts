import { SITE_CONTACT } from "@/data/site-contact";

export type MeetingStatus = "Signing Up" | "Coming Soon" | "Finished";

export type MeetingCategory =
  | "Data center"
  | "Cloud Service"
  | "Big data"
  | "IT Technology"
  | "Training"
  | "Salon";

export interface MeetingContact {
  name: string;
  phone: string;
  email: string;
}

export interface OrganizationItem {
  label: string;
  value: string;
}

export interface MeetingDetail {
  bannerTitle: string;
  promoTag: string;
  bannerImage: string;
  contact: MeetingContact;
  introduction: string[];
  organization: OrganizationItem[];
}

export interface Meeting {
  id: string;
  title: string;
  date: string;
  location: string;
  category: MeetingCategory;
  status: MeetingStatus;
  attendees: string;
  image: string;
  detail: MeetingDetail;
}

export const MEETING_FILTERS = [
  "All",
  "Data center",
  "Cloud Service",
  "Big data",
  "IT Technology",
  "Training",
  "Salon",
] as const;

const DEFAULT_ORG: OrganizationItem[] = [
  {
    label: "host",
    value:
      "China Communications Industry Association Data Center Committee; Beijing Zhongpei Huaxin International Culture Communication Co., Ltd.; China Electronics Energy Saving Technology Association Data Center Energy Saving Committee",
  },
  {
    label: "organizer",
    value:
      "Beijing Zhongpei Huaxin International Culture Communication Co., Ltd.; IDC Quan",
  },
  {
    label: "execution",
    value:
      "Beijing Zhongpei Huaxin International Culture Communication Co., Ltd.",
  },
  {
    label: "coOrganizer",
    value:
      "Institute for Data Science, Tsinghua University; Beihang University Big Data & Brain-Computer Intelligence Center; China Data Center Industry Development Alliance; Open Data Center Committee; New Infrastructure Industry Alliance; CCF Technical Committee on Information Storage",
  },
];

const DEFAULT_CONTACT: MeetingContact = {
  name: "Event Support",
  phone: SITE_CONTACT.phone,
  email: SITE_CONTACT.email,
};

function buildDetail(
  bannerTitle: string,
  introduction: string[],
  overrides?: Partial<MeetingDetail>,
): MeetingDetail {
  return {
    bannerTitle,
    promoTag: "Investment Promotion Open",
    bannerImage: "/images/home/bj.png",
    contact: DEFAULT_CONTACT,
    introduction,
    organization: DEFAULT_ORG,
    ...overrides,
  };
}

export const meetings: Meeting[] = [
  {
    id: "1",
    title: "AI & Big Data World 2025",
    date: "Jun 10-12, 2025",
    location: "San Francisco, USA",
    category: "Data center",
    status: "Signing Up",
    attendees: "1.2K",
    image: "/images/meetings/m1.jpg",
    detail: buildDetail("2026 Digital Infrastructure Technology Expo (DITExpo)", [
      "The Digital Infrastructure Technology Expo (DITExpo) is a professional exhibition and conference platform for the global digital infrastructure industry, focusing on data centers, cloud computing, computing networks, green and low-carbon operations, and intelligent O&M.",
      "Since its launch, the event has brought together carriers, cloud providers, equipment vendors, integrators, investors, and research institutes to create an integrated experience of exhibition, summit forums, and business matchmaking—driving industry collaboration and technology adoption.",
      "The 2026 edition will highlight AI computing power, liquid cooling, power and energy management, and modular data centers, with themed exhibit zones and professional forums for domestic and international attendees seeking procurement, partnerships, and brand exposure.",
      "Industry players are welcome to exhibit, visit, and sponsor as we capture infrastructure opportunities in the digital economy.",
    ]),
  },
  {
    id: "2",
    title: "Cloud Native Summit Asia",
    date: "Jul 3-5, 2025",
    location: "Singapore",
    category: "Cloud Service",
    status: "Coming Soon",
    attendees: "980",
    image: "/images/meetings/m2.jpg",
    detail: buildDetail("Cloud Native Summit Asia 2025", [
      "Cloud Native Summit Asia focuses on cloud-native architecture, container platforms, microservice governance, and observability practices for technology leaders and engineering teams across Asia-Pacific.",
      "The program includes keynotes, technical tracks, and hands-on workshops to help enterprises accelerate modern application delivery in the cloud.",
      "Cloud vendors, open-source communities, and enterprise users are invited to share best practices and industry case studies.",
    ]),
  },
  {
    id: "3",
    title: "Data Center Infra Forum",
    date: "May 20-22, 2025",
    location: "Tokyo, Japan",
    category: "Data center",
    status: "Finished",
    attendees: "1.5K",
    image: "/images/meetings/m3.jpg",
    detail: buildDetail("Data Center Infra Forum 2025", [
      "Data Center Infra Forum covers data center planning and construction, power and cooling, operations automation, and sustainability.",
      "Leading Asian operators and facility providers share project experience to help enterprises optimize infrastructure investment decisions.",
    ]),
  },
  {
    id: "4",
    title: "Big Data Analytics Expo",
    date: "Aug 14-16, 2025",
    location: "London, UK",
    category: "Big data",
    status: "Signing Up",
    attendees: "2.1K",
    image: "/images/meetings/m4.jpg",
    detail: buildDetail("Big Data Analytics Expo 2025", [
      "Big Data Analytics Expo brings together data analytics, artificial intelligence, and industry digital transformation across finance, manufacturing, retail, and more.",
      "The expo offers product showcases, solution demos, and one-to-one business matchmaking to connect technology with market needs.",
    ]),
  },
  {
    id: "5",
    title: "IT Leadership Training Camp",
    date: "Sep 8-10, 2025",
    location: "Berlin, Germany",
    category: "Training",
    status: "Coming Soon",
    attendees: "640",
    image: "/images/meetings/m5.jpg",
    detail: buildDetail("IT Leadership Training Camp 2025", [
      "An intensive program for IT managers and technology leaders covering strategy, cross-team collaboration, and digital project management.",
      "Case discussions and practical exercises help participants strengthen leadership and decision-making skills.",
    ]),
  },
  {
    id: "6",
    title: "Smart Salon: Edge Computing",
    date: "Oct 2, 2025",
    location: "Seoul, Korea",
    category: "Salon",
    status: "Signing Up",
    attendees: "320",
    image: "/images/meetings/m6.jpg",
    detail: buildDetail("Smart Salon: Edge Computing", [
      "A focused salon on edge computing architecture, 5G collaboration, and industry adoption paths, emphasizing in-depth discussion and light networking.",
      "Ideal for product, architecture, and business leaders seeking closed-door dialogue and partnership opportunities.",
    ]),
  },
  {
    id: "7",
    title: "Next-Gen Cloud Services Day",
    date: "Nov 11-12, 2025",
    location: "Sydney, Australia",
    category: "Cloud Service",
    status: "Coming Soon",
    attendees: "870",
    image: "/images/meetings/m7.jpg",
    detail: buildDetail("Next-Gen Cloud Services Day 2025", [
      "Focused on next-generation cloud capabilities including multi-cloud management, security and compliance, FinOps, and industry solutions.",
      "Formats include keynotes, roundtables, and booth networking to support Asia-Pacific cloud adoption decisions.",
    ]),
  },
  {
    id: "8",
    title: "Enterprise IT Technology Week",
    date: "Dec 1-3, 2025",
    location: "Dubai, UAE",
    category: "IT Technology",
    status: "Signing Up",
    attendees: "1.1K",
    image: "/images/meetings/m8.jpg",
    detail: buildDetail("Enterprise IT Technology Week 2025", [
      "Enterprise IT Technology Week covers infrastructure, cybersecurity, workplace collaboration, and intelligent applications.",
      "It provides a platform for technology selection, vendor matchmaking, and knowledge sharing for enterprises in the Middle East and Africa.",
    ]),
  },
  {
    id: "9",
    title: "Global Data Center Connect",
    date: "Apr 18-19, 2025",
    location: "Hong Kong, China",
    category: "Data center",
    status: "Finished",
    attendees: "1.8K",
    image: "/images/meetings/m9.jpg",
    detail: buildDetail("Global Data Center Connect 2025", [
      "Connecting global data center investment, construction, and operations—with a focus on cross-border interconnectivity, green energy, and high-density computing deployments.",
      "This edition has concluded. Stay tuned for the next schedule and partnership opportunities.",
    ]),
  },
];

export function getMeetingById(id: string): Meeting | undefined {
  return meetings.find((item) => item.id === id);
}

export function getAllMeetingIds(): string[] {
  return meetings.map((item) => item.id);
}
