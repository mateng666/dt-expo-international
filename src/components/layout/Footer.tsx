import Image from "next/image";
import { getTranslations } from "next-intl/server";
import { SOCIAL_ICONS } from "@/components/ui/SocialIcons";
import { Link } from "@/i18n/navigation";

export async function Footer() {
  const t = await getTranslations("Footer");

  const topics = [
    t("topics.aiChips"),
    t("topics.dataCenters"),
    t("topics.energyPower"),
    t("topics.capitalFinance"),
  ];

  const regions = [
    t("regions.southeastAsia"),
    t("regions.oceania"),
    t("regions.latinAmerica"),
    t("regions.northAmerica"),
    t("regions.eastAsia"),
    t("regions.centralAsia"),
    t("regions.southAsia"),
    t("regions.middleEast"),
    t("regions.africa"),
    t("regions.europe"),
  ];

  return (
    <footer className="border-t border-border-footer bg-white">
      <div className="container-content grid gap-10 py-[64px] md:grid-cols-2 xl:grid-cols-4">
        <div>
          <div className="flex items-center gap-2">
            <Image
              src="/images/home/logo.png"
              alt="Eventnovas"
              width={36}
              height={36}
            />
            <span className="text-[18px] font-semibold text-foreground">
              Eventnovas
            </span>
          </div>
          <p className="mt-4 max-w-[280px] text-[14px] leading-6 text-text-body">
            {t("tagline")}
          </p>
          <div className="mt-5 flex items-center gap-3">
            {SOCIAL_ICONS.map(({ label, Icon }) => (
              <a
                key={label}
                href="#"
                aria-label={label}
                className="text-[#333] transition hover:text-brand"
              >
                <Icon className="h-4 w-4" />
              </a>
            ))}
          </div>
        </div>

        <div>
          <h3 className="text-[16px] font-semibold text-brand">
            {t("browseByTopic")}
          </h3>
          <ul className="mt-4 space-y-2.5">
            {topics.map((topic) => (
              <li key={topic}>
                <Link
                  href="/"
                  className="text-[14px] text-text-body transition hover:text-brand"
                >
                  {topic}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="text-[16px] font-semibold text-brand">
            {t("browseByRegion")}
          </h3>
          <div className="mt-4 grid grid-cols-2 gap-x-6 gap-y-2.5">
            {regions.map((region) => (
              <Link
                key={region}
                href="/"
                className="text-[14px] text-text-body transition hover:text-brand"
              >
                {region}
              </Link>
            ))}
          </div>
        </div>

        <div>
          <h3 className="text-[16px] font-semibold text-brand">{t("contactUs")}</h3>
          <p className="mt-4 text-[28px] font-semibold leading-none text-foreground">
            010-51668499
          </p>
          <p className="mt-3 text-[14px] leading-6 text-text-body">{t("hours")}</p>
          <p className="mt-3 text-[14px] leading-6 text-text-body">
            {t("customerSupport")}: support@eventnovas.com
          </p>
          <p className="mt-1 text-[14px] leading-6 text-text-body">
            {t("operations")}: ops@eventnovas.com
          </p>
        </div>
      </div>

      <div className="border-t border-border-footer">
        <div className="container-content flex flex-col gap-3 py-5 text-[14px] text-text-muted sm:flex-row sm:items-center sm:justify-between">
          <p>{t("copyright")}</p>
          <div className="flex flex-wrap gap-5">
            <Link href="/" className="hover:text-brand">
              {t("privacy")}
            </Link>
            <Link href="/" className="hover:text-brand">
              {t("terms")}
            </Link>
            <Link href="/cookie-policy" className="hover:text-brand">
              {t("cookie")}
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
