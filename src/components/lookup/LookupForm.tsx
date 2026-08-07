"use client";

import { FormEvent, useState } from "react";
import { useTranslations } from "next-intl";
import { DecorBackground } from "@/components/shared/DecorBackground";
import { lookupTickets } from "@/lib/intl-api";

type LookupItem = {
  name?: string;
  email?: string;
  ticketNo?: string;
  auditStatus?: string | number;
  expoId?: number;
};

export function LookupForm() {
  const t = useTranslations("Lookup");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [items, setItems] = useState<LookupItem[] | null>(null);

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError("");
    setItems(null);
    if (!name.trim() || !email.trim()) {
      setError(t("required"));
      return;
    }
    setLoading(true);
    try {
      const data = await lookupTickets({
        name: name.trim(),
        email: email.trim(),
      });
      setItems((data.items || []) as LookupItem[]);
    } catch (err) {
      setError(err instanceof Error ? err.message : t("failed"));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mx-auto w-full max-w-[560px] rounded-[16px] bg-white px-6 py-10 shadow-[0_8px_32px_rgba(0,0,0,0.08)] sm:px-10">
      <h1 className="text-center text-[32px] font-bold text-[#0B1F44]">
        {t("title")}
      </h1>
      <p className="mt-2 text-center text-[15px] text-text-muted">
        {t("subtitle")}
      </p>

      <form onSubmit={onSubmit} className="mt-8 space-y-5">
        <label className="block">
          <span className="text-[14px] font-medium text-foreground">
            {t("name")}
          </span>
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="mt-2 h-12 w-full rounded-[8px] border border-border-soft bg-white px-4 text-[15px] outline-none focus:border-brand"
            placeholder={t("namePh")}
          />
        </label>
        <label className="block">
          <span className="text-[14px] font-medium text-foreground">
            {t("email")}
          </span>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="mt-2 h-12 w-full rounded-[8px] border border-border-soft bg-white px-4 text-[15px] outline-none focus:border-brand"
            placeholder={t("emailPh")}
          />
        </label>
        {error ? (
          <p className="text-[14px] text-[#EF4444]">{error}</p>
        ) : null}
        <button
          type="submit"
          disabled={loading}
          className="inline-flex h-12 w-full items-center justify-center rounded-[6px] bg-brand text-[16px] font-medium text-white hover:bg-[#0052db] disabled:opacity-70"
        >
          {loading ? t("searching") : t("search")}
        </button>
      </form>

      {items ? (
        <div className="mt-8 space-y-3">
          {items.length === 0 ? (
            <p className="text-center text-[14px] text-text-muted">
              {t("empty")}
            </p>
          ) : (
            items.map((item, idx) => (
              <div
                key={`${item.ticketNo}-${idx}`}
                className="rounded-[10px] border border-border-soft bg-[#F8FAFC] px-4 py-3 text-[14px]"
              >
                <p className="font-medium text-foreground">
                  {item.name} · {item.email}
                </p>
                <p className="mt-1 text-text-muted">
                  {t("ticketNo")}: {item.ticketNo || "—"}
                </p>
                <p className="text-text-muted">
                  {t("status")}: {String(item.auditStatus ?? "—")}
                </p>
              </div>
            ))
          )}
        </div>
      ) : null}
    </div>
  );
}

export function LookupPageShell({ children }: { children: React.ReactNode }) {
  return (
    <main className="flex flex-1 flex-col">
      <DecorBackground className="min-h-[640px] py-14 md:py-20">
        <div className="container-content w-full">{children}</div>
      </DecorBackground>
    </main>
  );
}
