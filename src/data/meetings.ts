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
      "中国通信工业协会数据中心委员会、北京中培华信国际文化传播有限公司、中国电子节能技术协会数据中心节能技术委员会",
  },
  {
    label: "organizer",
    value: "北京中培华信国际文化传播有限公司、IDC圈",
  },
  {
    label: "execution",
    value: "北京中培华信国际文化传播有限公司",
  },
  {
    label: "coOrganizer",
    value:
      "清华大学数据科学研究院、北京航空航天大学大数据科学与脑机智能高精尖创新中心、中国数据中心产业发展联盟、开放数据中心委员会、新基建产业联盟、中国计算机学会信息存储专委会",
  },
];

const DEFAULT_CONTACT: MeetingContact = {
  name: "李女士",
  phone: "+86 13693541767",
  email: "linda.li@idcquan.com",
};

function buildDetail(
  bannerTitle: string,
  introduction: string[],
  overrides?: Partial<MeetingDetail>,
): MeetingDetail {
  return {
    bannerTitle,
    promoTag: "招商火热开启",
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
    detail: buildDetail("2026数字基础设施科技展 (DITExpo)", [
      "数字基础设施科技展（DITExpo）是面向全球数字基础设施产业链的专业展览与会议平台，聚焦数据中心、云计算、算力网络、绿色低碳与智能运维等核心议题。",
      "自创办以来，展会持续汇聚运营商、云厂商、设备商、集成商、投资机构与科研院所，打造“展览展示 + 高峰论坛 + 商务对接”一体化交流场景，推动产业协同与技术创新落地。",
      "2026 年展会将围绕 AI 算力、液冷散热、电力与能源管理、模块化数据中心等热点方向，设置主题展区与专业论坛，服务国内外参展观众的采购、合作与品牌传播需求。",
      "欢迎产业链各方报名参展、参观与赞助合作，共同把握数字经济时代的基础设施机遇。",
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
      "Cloud Native Summit Asia 聚焦云原生架构、容器平台、微服务治理与可观测性实践，面向亚太地区技术决策者与工程团队。",
      "大会设置主题演讲、技术分论坛与动手工作坊，帮助企业加速云上现代化应用落地。",
      "欢迎云厂商、开源社区与企业用户共同参与，分享最佳实践与行业案例。",
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
      "Data Center Infra Forum 关注数据中心规划建设、供电制冷、运维自动化与可持续发展。",
      "论坛邀请亚洲领先运营商与设施服务商分享项目经验，助力企业优化基础设施投资决策。",
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
      "Big Data Analytics Expo 汇聚数据分析、人工智能与行业数字化转型实践，覆盖金融、制造、零售等场景。",
      "展会提供产品展示、方案路演与一对一商务对接，帮助参会者快速连接技术与市场。",
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
      "面向 IT 管理者与技术领导者的封闭式研修营，覆盖战略规划、组织协作与数字化项目管理。",
      "课程结合案例研讨与实战演练，帮助学员提升跨团队领导力与决策能力。",
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
      "小型高端沙龙聚焦边缘计算架构、5G 协同与行业落地路径，强调深度交流与轻量社交。",
      "适合产品、架构与业务负责人进行闭门讨论与合作对接。",
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
      "聚焦下一代云服务能力，包括多云管理、安全合规、FinOps 与行业解决方案。",
      "活动形式包含主题演讲、圆桌讨论与展台交流，服务亚太企业上云决策。",
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
      "企业 IT 技术周覆盖基础设施、网络安全、协作办公与智能化应用等主题。",
      "为中东及非洲地区企业提供技术选型、供应商对接与经验分享平台。",
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
      "连接全球数据中心投资、建设与运营链条，关注跨境互联、绿色能源与高密算力部署。",
      "活动已圆满结束，欢迎关注下一届日程与合作机会。",
    ]),
  },
];

export function getMeetingById(id: string): Meeting | undefined {
  return meetings.find((item) => item.id === id);
}

export function getAllMeetingIds(): string[] {
  return meetings.map((item) => item.id);
}
