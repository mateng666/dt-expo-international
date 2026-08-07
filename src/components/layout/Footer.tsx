import Image from "next/image";
import { getLocale, getTranslations } from "next-intl/server";
import { SOCIAL_ICONS } from "@/components/ui/SocialIcons";
import { SITE_CONTACT } from "@/data/site-contact";
import { Link } from "@/i18n/navigation";

const unavailableClassName =
  "cursor-not-allowed text-[14px] text-text-muted/60 select-none";

export async function Footer() {
  const t = await getTranslations("Footer");
  const locale = await getLocale();
  const hours =
    locale === "zh" ? SITE_CONTACT.hours.zh : SITE_CONTACT.hours.en;

  const topics = [
    t("topics.aiChips"),
    t("topics.dataCenters"),
    t("topics.energyPower"),
    t("topics.capitalFinance"),
  ];

  return (
    <footer className="border-t border-border-footer bg-white">
      <div className="container-content grid gap-10 py-[64px] md:grid-cols-2 xl:grid-cols-3">
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
          <p className="mt-3 max-w-[320px] text-[14px] leading-6 text-foreground">
            {t("operatedBy")}: {SITE_CONTACT.companyName}
          </p>
          <p className="mt-1 max-w-[320px] text-[14px] leading-6 text-text-body">
            {SITE_CONTACT.address}
          </p>
          <div className="mt-5 flex items-center gap-3">
            {SOCIAL_ICONS.map(({ label, Icon }) => (
              <span
                key={label}
                aria-label={label}
                aria-disabled="true"
                title="Coming soon"
                className="cursor-not-allowed text-text-muted/50"
              >
                <Icon className="h-4 w-4" />
              </span>
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
                <span aria-disabled="true" className={unavailableClassName}>
                  {topic}
                </span>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="text-[16px] font-semibold text-brand">{t("contactUs")}</h3>
          <a
            href={SITE_CONTACT.phoneHref}
            className="mt-4 block text-[28px] font-semibold leading-none text-foreground transition-colors hover:text-brand"
          >
            {SITE_CONTACT.phone}
          </a>
          <p className="mt-3 text-[14px] leading-6 text-text-body">{hours}</p>
          <p className="mt-3 text-[14px] leading-6 text-text-body">
            {t("customerSupport")}:{" "}
            <a
              href={`mailto:${SITE_CONTACT.email}`}
              className="text-foreground hover:text-brand"
            >
              {SITE_CONTACT.email}
            </a>
          </p>
          <p className="mt-1 text-[14px] leading-6 text-text-body">
            {t("compliance")}:{" "}
            <a
              href={`mailto:${SITE_CONTACT.complianceEmail}`}
              className="text-foreground hover:text-brand"
            >
              {SITE_CONTACT.complianceEmail}
            </a>
          </p>
        </div>
      </div>

      <div className="border-t border-border-footer">
        <div className="container-content flex flex-col gap-3 py-5 text-[14px] sm:flex-row sm:items-center sm:justify-between">
          <p className="text-text-body">{t("copyright")}</p>
          <div className="flex flex-wrap gap-5">
            <Link href="/privacy" className="hover:text-brand">
              {t("privacy")}
            </Link>
            <Link href="/terms" className="hover:text-brand">
              {t("terms")}
            </Link>
            <Link href="/refund-policy" className="hover:text-brand">
              {t("refund")}
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
