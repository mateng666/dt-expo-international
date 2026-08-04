"use client";

import { useLocale } from "next-intl";
import { useTransition } from "react";
import { Globe } from "lucide-react";
import { usePathname, useRouter } from "@/i18n/navigation";
import { routing, type AppLocale } from "@/i18n/routing";

export function LanguageSwitcher() {
  const locale = useLocale() as AppLocale;
  const pathname = usePathname();
  const router = useRouter();
  const [pending, startTransition] = useTransition();

  const switchTo = (next: AppLocale) => {
    if (next === locale) return;
    startTransition(() => {
      router.replace(pathname, { locale: next });
    });
  };

  return (
    <div className="inline-flex items-center gap-1 rounded-full border border-border-soft bg-[#F8FAFC] p-1">
      <Globe className="ml-1.5 h-3.5 w-3.5 text-text-muted" strokeWidth={2} />
      {routing.locales.map((code) => {
        const active = code === locale;
        return (
          <button
            key={code}
            type="button"
            disabled={pending}
            onClick={() => switchTo(code)}
            className={`h-8 min-w-[40px] rounded-full px-2.5 text-[13px] font-medium transition ${
              active
                ? "bg-brand text-white"
                : "text-text-body hover:text-brand"
            }`}
            aria-pressed={active}
          >
            {code === "en" ? "EN" : "中文"}
          </button>
        );
      })}
    </div>
  );
}
