"use client";

import Image from "next/image";
import { useTranslations } from "next-intl";
import { Search, User } from "lucide-react";
import { Link } from "@/i18n/navigation";

export function Header() {
  const t = useTranslations("Header");

  return (
    <header className="sticky top-0 z-50 h-[100px] border-b border-border-soft bg-white">
      <div className="container-content flex h-full items-center gap-4 xl:gap-6">
        <Link href="/" className="flex shrink-0 items-center gap-2">
          <Image
            src="/images/home/logo.png"
            alt="Eventnovas"
            width={40}
            height={40}
            priority
          />
          <span className="text-[20px] font-semibold tracking-tight text-foreground">
            Eventnovas
          </span>
        </Link>

        <nav className="hidden items-center gap-5 lg:flex xl:gap-6">
          <Link
            href="/meetings/1"
            className="inline-flex items-center gap-1 text-[16px] text-foreground transition-colors hover:text-brand xl:text-[18px]"
          >
            {t("ditexpo")}
          </Link>
        </nav>

        <div className="mx-auto hidden w-full max-w-[280px] md:block xl:max-w-[320px]">
          <label className="relative block">
            <Search
              className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-text-placeholder"
              strokeWidth={2}
            />
            <input
              type="search"
              placeholder={t("searchPlaceholder")}
              className="h-11 w-full rounded-full border border-transparent bg-[#F3F4F6] pl-11 pr-4 text-[14px] text-foreground outline-none transition focus:border-brand focus:bg-white"
            />
          </label>
        </div>

        <div className="ml-auto flex shrink-0 items-center gap-3 xl:gap-4">
          <span
            aria-disabled="true"
            className="inline-flex cursor-not-allowed items-center gap-1.5 text-[14px] text-text-muted/60 select-none xl:text-[16px]"
          >
            <User className="h-4 w-4" strokeWidth={2} />
            {t("loginRegister")}
          </span>
        </div>
      </div>
    </header>
  );
}
