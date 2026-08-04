"use client";

import { useState, type FormEvent } from "react";
import { useTranslations } from "next-intl";
import { Globe } from "lucide-react";
import { SOCIAL_ICONS } from "@/components/ui/SocialIcons";

export function Newsletter() {
  const t = useTranslations("Home");
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const onSubmit = (event: FormEvent) => {
    event.preventDefault();
    if (!email.trim()) return;
    setSubmitted(true);
  };

  return (
    <section className="bg-surface-soft py-[64px]">
      <div className="container-content flex flex-col gap-10 lg:flex-row lg:items-center lg:justify-between">
        <div className="max-w-[480px]">
          <div className="flex items-center gap-2">
            <Globe className="h-7 w-7 text-brand" strokeWidth={2} />
            <h2 className="text-[32px] font-semibold text-foreground">
              {t("stayConnected")}
            </h2>
          </div>
          <p className="mt-3 text-[16px] leading-[28px] text-text-body">
            {t("newsletterDesc")}
          </p>
          <div className="mt-5 flex items-center gap-3">
            {SOCIAL_ICONS.map(({ label, Icon }) => (
              <span
                key={label}
                aria-label={label}
                aria-disabled="true"
                title="Coming soon"
                className="flex h-10 w-10 cursor-not-allowed items-center justify-center rounded-full bg-white text-text-muted/50 shadow-[0_4px_20px_rgba(0,0,0,0.06)]"
              >
                <Icon className="h-4 w-4" />
              </span>
            ))}
          </div>
        </div>

        <form
          onSubmit={onSubmit}
          className="flex w-full max-w-[560px] flex-col gap-3 sm:flex-row sm:items-center"
        >
          <div className="flex h-14 w-full overflow-hidden rounded-[8px] border border-border-soft bg-white shadow-[0_4px_20px_rgba(0,0,0,0.06)]">
            <input
              type="email"
              required
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                setSubmitted(false);
              }}
              placeholder={t("emailPlaceholder")}
              className="h-full flex-1 px-5 text-[16px] text-foreground outline-none placeholder:text-text-placeholder"
            />
            <button
              type="submit"
              className="h-full shrink-0 bg-brand px-6 text-[16px] font-medium text-white transition hover:bg-[#0052db]"
            >
              {t("subscribe")}
            </button>
          </div>
          {submitted ? (
            <p className="sr-only text-[14px] text-status-signing">Subscribed</p>
          ) : null}
        </form>
      </div>
    </section>
  );
}
