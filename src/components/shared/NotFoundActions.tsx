"use client";

import { useTranslations } from "next-intl";
import { ArrowLeft, Home } from "lucide-react";
import { Link, useRouter } from "@/i18n/navigation";

export function NotFoundActions() {
  const t = useTranslations("NotFound");
  const router = useRouter();

  return (
    <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
      <Link
        href="/"
        className="inline-flex h-12 min-w-[180px] items-center justify-center gap-2 rounded-[6px] bg-brand px-6 text-[16px] font-medium text-white transition hover:bg-[#0052db]"
      >
        <Home className="h-4 w-4" strokeWidth={2} />
        {t("backHome")}
      </Link>
      <button
        type="button"
        onClick={() => router.back()}
        className="inline-flex h-12 min-w-[180px] items-center justify-center gap-2 rounded-[6px] border border-[#93C5FD] bg-white px-6 text-[16px] font-medium text-brand transition hover:bg-[#E8F1FF]"
      >
        <ArrowLeft className="h-4 w-4" strokeWidth={2} />
        {t("goBack")}
      </button>
    </div>
  );
}
