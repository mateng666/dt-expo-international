"use client";

import { useTranslations } from "next-intl";
import { useEffect, useState } from "react";
import { CookiePreferencesModal } from "@/components/legal/CookiePreferencesModal";
import { Link } from "@/i18n/navigation";
import {
  readCookieConsent,
  writeCookieConsent,
  type CookieConsent,
} from "@/lib/cookie-consent";

export function CookieBanner() {
  const t = useTranslations("Cookie");
  const [visible, setVisible] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [preference, setPreference] = useState(true);
  const [analytics, setAnalytics] = useState(true);

  useEffect(() => {
    const saved = readCookieConsent();
    if (!saved) {
      setVisible(true);
      return;
    }
    if (saved.type === "custom") {
      setPreference(saved.preference);
      setAnalytics(saved.analytics);
    }
  }, []);

  const persist = (consent: CookieConsent) => {
    writeCookieConsent(consent);
    setVisible(false);
    setModalOpen(false);
  };

  const openCustomize = () => {
    setPreference(true);
    setAnalytics(true);
    setModalOpen(true);
  };

  if (!visible && !modalOpen) return null;

  return (
    <>
      {visible ? (
        <div className="fixed inset-x-0 bottom-0 z-[60] border-t border-white/10 bg-[#0B1F44] text-white shadow-[0_-8px_32px_rgba(0,0,0,0.18)]">
          <div className="container-content flex flex-col gap-4 py-4 lg:flex-row lg:items-center lg:justify-between lg:gap-8">
            <p className="max-w-[760px] text-[14px] leading-6 text-white/90">
              <span className="font-semibold text-white">{t("bannerTitle")} </span>
              {t("bannerBody")}{" "}
              <Link
                href="/cookie-policy"
                className="underline decoration-white/70 underline-offset-2 hover:text-white"
              >
                {t("learnMore")}
              </Link>
            </p>

            <div className="flex flex-wrap items-center gap-3 lg:shrink-0">
              <button
                type="button"
                onClick={() => persist({ type: "all" })}
                className="inline-flex h-10 items-center justify-center rounded-[6px] bg-brand px-5 text-[14px] font-medium text-white transition hover:bg-[#0052db]"
              >
                {t("acceptAll")}
              </button>
              <button
                type="button"
                onClick={openCustomize}
                className="inline-flex h-10 items-center justify-center rounded-[6px] border border-white/70 bg-transparent px-5 text-[14px] font-medium text-white transition hover:bg-white/10"
              >
                {t("customize")}
              </button>
              <button
                type="button"
                onClick={() => persist({ type: "necessary" })}
                className="inline-flex h-10 items-center justify-center px-2 text-[14px] font-medium text-white underline decoration-white/70 underline-offset-2 transition hover:text-white"
              >
                {t("onlyNecessary")}
              </button>
            </div>
          </div>
        </div>
      ) : null}

      <CookiePreferencesModal
        open={modalOpen}
        preference={preference}
        analytics={analytics}
        onPreferenceChange={setPreference}
        onAnalyticsChange={setAnalytics}
        onSave={() =>
          persist({
            type: "custom",
            preference,
            analytics,
          })
        }
        onCancel={() => setModalOpen(false)}
      />
    </>
  );
}
