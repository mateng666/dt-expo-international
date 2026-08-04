import { getTranslations } from "next-intl/server";

interface TicketHeroProps {
  title: string;
  description: string;
  date: string;
  region: string;
}

export async function TicketHero({
  title,
  description,
  date,
  region,
}: TicketHeroProps) {
  const t = await getTranslations("Tickets");

  return (
    <section className="bg-[#0B1F44] text-white">
      <div className="container-content py-14 md:py-16">
        <h1 className="text-[40px] font-bold leading-tight md:text-[48px]">
          {title}
        </h1>
        <p className="mt-5 max-w-[760px] text-[16px] leading-[28px] text-white/90">
          {description}
        </p>
        <div className="mt-8 flex flex-wrap items-center gap-x-8 gap-y-2 text-[14px] text-white/85 md:text-[16px]">
          <span>{date}</span>
          <span>
            {t("regionLabel")}: {region}
          </span>
        </div>
      </div>
    </section>
  );
}
