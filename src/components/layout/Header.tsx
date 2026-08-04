"use client";

import Image from "next/image";
import { useTranslations } from "next-intl";
import { Briefcase, ChevronDown, Search, User } from "lucide-react";
import { LanguageSwitcher } from "@/components/layout/LanguageSwitcher";
import { Link, usePathname } from "@/i18n/navigation";

export function Header() {
  const t = useTranslations("Header");
  const pathname = usePathname();
  const showLoggedIn = pathname.includes("/register");

  const navItems = [
    { label: t("region"), href: "/" as const, dropdown: true, available: false },
    {
      label: t("meetingType"),
      href: "/" as const,
      dropdown: true,
      available: false,
    },
    {
      label: t("ditexpo"),
      href: "/meetings/1" as const,
      dropdown: false,
      available: true,
    },
  ];

  const unavailableNavClassName =
    "inline-flex cursor-not-allowed items-center gap-1 text-[16px] text-text-muted/60 select-none xl:text-[18px]";

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
          {navItems.map((item) =>
            item.available ? (
              <Link
                key={item.label}
                href={item.href}
                className="inline-flex items-center gap-1 text-[16px] text-foreground transition-colors hover:text-brand xl:text-[18px]"
              >
                {item.label}
                {item.dropdown ? (
                  <ChevronDown className="h-4 w-4 text-text-muted" strokeWidth={2} />
                ) : null}
              </Link>
            ) : (
              <span
                key={item.label}
                aria-disabled="true"
                className={unavailableNavClassName}
              >
                {item.label}
                {item.dropdown ? (
                  <ChevronDown className="h-4 w-4" strokeWidth={2} />
                ) : null}
              </span>
            ),
          )}
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
          <LanguageSwitcher />
          <span
            aria-disabled="true"
            className="hidden cursor-not-allowed items-center gap-1.5 text-[14px] text-text-muted/60 select-none xl:inline-flex xl:text-[16px]"
          >
            <Briefcase className="h-4 w-4" strokeWidth={2} />
            {t("businessCooperation")}
          </span>
          {showLoggedIn ? (
            <button
              type="button"
              className="inline-flex items-center gap-2 text-[14px] text-foreground xl:text-[16px]"
            >
              <span className="flex h-9 w-9 items-center justify-center rounded-full bg-[#DBEAFE] text-[13px] font-semibold text-brand">
                T
              </span>
              <span>Tom</span>
              <ChevronDown className="h-4 w-4 text-text-muted" strokeWidth={2} />
            </button>
          ) : (
            <span
              aria-disabled="true"
              className="inline-flex cursor-not-allowed items-center gap-1.5 text-[14px] text-text-muted/60 select-none xl:text-[16px]"
            >
              <User className="h-4 w-4" strokeWidth={2} />
              {t("loginRegister")}
            </span>
          )}
        </div>
      </div>
    </header>
  );
}
