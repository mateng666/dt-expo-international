import Image from "next/image";
import { getTranslations } from "next-intl/server";
import { Mail, Phone, User } from "lucide-react";
import type { MeetingDetail } from "@/data/meetings";
import { Link } from "@/i18n/navigation";

interface MeetingBannerProps {
  meetingId: string;
  detail: MeetingDetail;
}

export async function MeetingBanner({ meetingId, detail }: MeetingBannerProps) {
  const t = await getTranslations("Meeting");

  return (
    <section className="relative h-[420px] w-full overflow-hidden bg-[#0B1B3A] md:h-[480px]">
      <Image
        src={detail.bannerImage}
        alt=""
        fill
        priority
        className="object-cover"
        sizes="100vw"
      />
      <div className="absolute inset-0 bg-black/45" />

      <div className="container-content relative z-10 flex h-full flex-col items-center justify-center px-4 pb-16 pt-8 text-center">
        <h1 className="max-w-[900px] text-[32px] font-bold leading-tight text-white md:text-[48px] md:leading-[1.25]">
          {detail.bannerTitle}
        </h1>

        <div className="mt-6 inline-flex items-center justify-center rounded-md border border-[#3B82F6] bg-black/30 px-6 py-2 shadow-[0_0_20px_rgba(59,130,246,0.55)]">
          <span className="text-[18px] font-semibold tracking-wide text-[#7DD3FC] md:text-[22px]">
            {t("promoTag")}
          </span>
        </div>

        <Link
          href={`/meetings/${meetingId}/tickets`}
          className="mt-8 inline-flex items-center justify-center rounded-full bg-gradient-to-b from-[#38BDF8] to-brand px-8 py-4 text-[18px] font-semibold text-white shadow-[0_0_28px_rgba(2,97,255,0.65)] transition hover:brightness-110 lg:absolute lg:right-10 lg:top-1/2 lg:mt-0 lg:-translate-y-1/2 lg:px-7 lg:py-5"
        >
          {t("register")}
        </Link>
      </div>

      <div className="absolute inset-x-0 bottom-0 z-10 bg-black/55 backdrop-blur-[2px]">
        <div className="container-content flex flex-col gap-3 px-4 py-3 text-[14px] text-white sm:flex-row sm:flex-wrap sm:items-center sm:justify-center sm:gap-10 md:text-[16px]">
          <span className="inline-flex items-center justify-center gap-2">
            <User className="h-4 w-4 shrink-0" strokeWidth={2} />
            {t("contactPrefix")}: {detail.contact.name}
          </span>
          <span className="inline-flex items-center justify-center gap-2">
            <Phone className="h-4 w-4 shrink-0" strokeWidth={2} />
            {detail.contact.phone}
          </span>
          <span className="inline-flex items-center justify-center gap-2">
            <Mail className="h-4 w-4 shrink-0" strokeWidth={2} />
            {detail.contact.email}
          </span>
        </div>
      </div>
    </section>
  );
}
