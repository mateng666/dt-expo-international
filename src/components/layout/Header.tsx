"use client";

import Image from "next/image";
import { FormEvent, useEffect, useId, useRef, useState } from "react";
import { useTranslations } from "next-intl";
import { ChevronDown, Search, User } from "lucide-react";
import { Link, useRouter } from "@/i18n/navigation";
import { fetchMe, logoutMe, type MeProfile } from "@/lib/intl-api";
import {
  clearClientToken,
  getClientToken,
  goUserCenter,
  goUserCenterLogin,
} from "@/lib/session";

export function Header() {
  const t = useTranslations("Header");
  const router = useRouter();
  const menuId = useId();
  const menuRef = useRef<HTMLDivElement>(null);
  const [query, setQuery] = useState("");
  const [me, setMe] = useState<MeProfile | null>(null);
  const [authChecked, setAuthChecked] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [loggingOut, setLoggingOut] = useState(false);

  useEffect(() => {
    if (!getClientToken()) {
      setAuthChecked(true);
      return;
    }
    fetchMe()
      .then((profile) => setMe(profile))
      .finally(() => setAuthChecked(true));
  }, []);

  useEffect(() => {
    if (!menuOpen) return;

    const onPointerDown = (event: MouseEvent) => {
      if (!menuRef.current?.contains(event.target as Node)) {
        setMenuOpen(false);
      }
    };
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setMenuOpen(false);
    };

    document.addEventListener("mousedown", onPointerDown);
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("mousedown", onPointerDown);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [menuOpen]);

  const onSearch = (e: FormEvent) => {
    e.preventDefault();
    const q = query.trim();
    router.push(q ? `/?q=${encodeURIComponent(q)}` : "/");
  };

  const displayName =
    me?.nickName || me?.name || me?.email || t("myAccount");

  const onLogout = async () => {
    if (loggingOut) return;
    setLoggingOut(true);
    try {
      await logoutMe();
    } catch {
      /* ignore — still clear local session */
    }
    clearClientToken();
    setMe(null);
    setMenuOpen(false);
    setLoggingOut(false);
  };

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
            href="/#latest-meetings"
            className="inline-flex items-center gap-1 text-[16px] text-foreground transition-colors hover:text-brand xl:text-[18px]"
          >
            {t("ditexpo")}
          </Link>
        </nav>

        <form
          onSubmit={onSearch}
          className="mx-auto hidden w-full max-w-[280px] md:block xl:max-w-[320px]"
        >
          <label className="relative block">
            <Search
              className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-text-placeholder"
              strokeWidth={2}
            />
            <input
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder={t("searchPlaceholder")}
              className="h-11 w-full rounded-full border border-transparent bg-[#F3F4F6] pl-11 pr-4 text-[14px] text-foreground outline-none transition focus:border-brand focus:bg-white"
            />
          </label>
        </form>

        <div className="ml-auto flex shrink-0 items-center gap-3 xl:gap-4">
          {!authChecked ? (
            <span className="inline-flex items-center gap-1.5 text-[14px] text-text-muted xl:text-[16px]">
              <User className="h-4 w-4" strokeWidth={2} />
              …
            </span>
          ) : me ? (
            <div className="relative" ref={menuRef}>
              <button
                type="button"
                aria-haspopup="menu"
                aria-expanded={menuOpen}
                aria-controls={menuId}
                onClick={() => setMenuOpen((open) => !open)}
                className="inline-flex items-center gap-1.5 text-[14px] text-foreground transition hover:text-brand xl:text-[16px]"
              >
                <User className="h-4 w-4" strokeWidth={2} />
                <span className="max-w-[140px] truncate xl:max-w-[180px]">
                  {displayName}
                </span>
                <ChevronDown
                  className={`h-4 w-4 shrink-0 transition ${menuOpen ? "rotate-180" : ""}`}
                  strokeWidth={2}
                />
              </button>

              {menuOpen ? (
                <div
                  id={menuId}
                  role="menu"
                  className="absolute right-0 top-[calc(100%+10px)] z-50 w-[220px] rounded-[10px] border border-border-soft bg-white p-1.5 shadow-[0_8px_24px_rgba(0,0,0,0.12)]"
                >
                  <button
                    type="button"
                    role="menuitem"
                    className="flex w-full rounded-[6px] px-3 py-2.5 text-left text-[14px] text-foreground transition hover:bg-[#EFF6FF]"
                    onClick={() => {
                      setMenuOpen(false);
                      goUserCenter("/me/tickets");
                    }}
                  >
                    {t("userCenter")}
                  </button>
                  <button
                    type="button"
                    role="menuitem"
                    className="flex w-full rounded-[6px] px-3 py-2.5 text-left text-[14px] text-foreground transition hover:bg-[#F3F4F6]"
                    onClick={() => {
                      setMenuOpen(false);
                      goUserCenter("/me/tickets");
                    }}
                  >
                    {t("myTickets")}
                  </button>
                  <button
                    type="button"
                    role="menuitem"
                    className="flex w-full rounded-[6px] px-3 py-2.5 text-left text-[14px] text-foreground transition hover:bg-[#F3F4F6]"
                    onClick={() => {
                      setMenuOpen(false);
                      goUserCenter("/me/orders");
                    }}
                  >
                    {t("myOrders")}
                  </button>
                  <div className="my-1 h-px bg-[#F3F4F6]" />
                  <button
                    type="button"
                    role="menuitem"
                    disabled={loggingOut}
                    className="flex w-full rounded-[6px] px-3 py-2.5 text-left text-[14px] text-[#B91C1C] transition hover:bg-[#FEF2F2] disabled:opacity-60"
                    onClick={() => {
                      void onLogout();
                    }}
                  >
                    {t("logOut")}
                  </button>
                </div>
              ) : null}
            </div>
          ) : (
            <button
              type="button"
              onClick={() => goUserCenterLogin()}
              className="inline-flex items-center gap-1.5 text-[14px] text-foreground transition hover:text-brand xl:text-[16px]"
            >
              <User className="h-4 w-4" strokeWidth={2} />
              {t("loginRegister")}
            </button>
          )}
        </div>
      </div>
    </header>
  );
}
