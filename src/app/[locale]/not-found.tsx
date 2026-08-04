import { getTranslations } from "next-intl/server";
import { DecorBackground } from "@/components/shared/DecorBackground";
import { NotFoundActions } from "@/components/shared/NotFoundActions";

export default async function NotFound() {
  const t = await getTranslations("NotFound");

  return (
    <main className="flex flex-1 flex-col">
      <DecorBackground className="min-h-[640px] py-16 md:min-h-[720px]">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-x-0 bottom-0 h-40 bg-[radial-gradient(120%_80%_at_50%_100%,rgba(2,97,255,0.14)_0%,transparent_70%)]"
        />
        <div className="container-content relative z-10 flex flex-col items-center text-center">
          <p className="text-[96px] font-bold leading-none tracking-tight text-brand drop-shadow-[0_8px_24px_rgba(2,97,255,0.28)] md:text-[120px]">
            404
          </p>
          <h1 className="mt-4 text-[32px] font-bold text-[#0B1F44] md:text-[36px]">
            {t("title")}
          </h1>
          <p className="mt-4 max-w-[520px] text-[16px] leading-7 text-text-muted">
            {t("description")}
          </p>
          <NotFoundActions />
        </div>
      </DecorBackground>
    </main>
  );
}
