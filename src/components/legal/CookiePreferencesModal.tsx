"use client";

import { useTranslations } from "next-intl";
import { Check } from "lucide-react";

interface CookiePreferencesModalProps {
  open: boolean;
  preference: boolean;
  analytics: boolean;
  onPreferenceChange: (value: boolean) => void;
  onAnalyticsChange: (value: boolean) => void;
  onSave: () => void;
  onCancel: () => void;
}

function Toggle({
  checked,
  onChange,
  label,
}: {
  checked: boolean;
  onChange: (value: boolean) => void;
  label: string;
}) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      aria-label={label}
      onClick={() => onChange(!checked)}
      className={`relative h-7 w-12 shrink-0 rounded-full transition ${
        checked ? "bg-[#22C55E]" : "bg-[#D1D5DB]"
      }`}
    >
      <span
        className={`absolute top-0.5 h-6 w-6 rounded-full bg-white shadow transition ${
          checked ? "left-[22px]" : "left-0.5"
        }`}
      />
    </button>
  );
}

export function CookiePreferencesModal({
  open,
  preference,
  analytics,
  onPreferenceChange,
  onAnalyticsChange,
  onSave,
  onCancel,
}: CookiePreferencesModalProps) {
  const t = useTranslations("Cookie");
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[70] flex items-center justify-center px-4 py-8">
      <button
        type="button"
        aria-label="Close cookie preferences overlay"
        className="absolute inset-0 bg-black/35"
        onClick={onCancel}
      />

      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="cookie-preferences-title"
        className="relative z-10 w-full max-w-[560px] rounded-[16px] bg-white p-6 shadow-[0_16px_48px_rgba(0,0,0,0.18)] sm:p-8"
      >
        <h2
          id="cookie-preferences-title"
          className="text-[22px] font-bold text-foreground"
        >
          {t("preferencesTitle")}
        </h2>

        <div className="mt-6 space-y-3">
          <div className="rounded-[12px] bg-[#F3F4F6] px-4 py-4 sm:px-5">
            <div className="flex gap-3">
              <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#22C55E]">
                <Check className="h-3.5 w-3.5 text-white" strokeWidth={3} />
              </span>
              <div>
                <p className="text-[15px] font-semibold text-foreground">
                  {t("necessaryTitle")}
                </p>
                <p className="mt-1 text-[13px] leading-5 text-text-body">
                  {t("necessaryDesc")}
                </p>
              </div>
            </div>
          </div>

          <div className="rounded-[12px] bg-[#F3F4F6] px-4 py-4 sm:px-5">
            <div className="flex items-start justify-between gap-4">
              <div className="min-w-0">
                <p className="text-[15px] font-semibold text-foreground">
                  {t("preferenceTitle")}
                </p>
                <p className="mt-1 text-[13px] leading-5 text-text-body">
                  {t("preferenceDesc")}
                </p>
              </div>
              <Toggle
                checked={preference}
                onChange={onPreferenceChange}
                label={t("preferenceTitle")}
              />
            </div>
          </div>

          <div className="rounded-[12px] bg-[#F3F4F6] px-4 py-4 sm:px-5">
            <div className="flex items-start justify-between gap-4">
              <div className="min-w-0">
                <p className="text-[15px] font-semibold text-foreground">
                  {t("analyticsTitle")}
                </p>
                <p className="mt-1 text-[13px] leading-5 text-text-body">
                  {t("analyticsDesc")}
                </p>
              </div>
              <Toggle
                checked={analytics}
                onChange={onAnalyticsChange}
                label={t("analyticsTitle")}
              />
            </div>
          </div>
        </div>

        <div className="mt-8 flex items-center justify-end gap-5">
          <button
            type="button"
            onClick={onSave}
            className="inline-flex h-10 items-center justify-center rounded-[6px] bg-brand px-5 text-[14px] font-medium text-white transition hover:bg-[#0052db]"
          >
            {t("saveSettings")}
          </button>
          <button
            type="button"
            onClick={onCancel}
            className="text-[14px] font-medium text-text-muted transition hover:text-foreground"
          >
            {t("cancel")}
          </button>
        </div>
      </div>
    </div>
  );
}
