import { redirect } from "next/navigation";
import { setRequestLocale } from "next-intl/server";
import { resolveSignup } from "@/lib/intl-api";

type Props = {
  params: Promise<{ locale: string }>;
  searchParams: Promise<{ e?: string; c?: string; m?: string; i?: string }>;
};

/**
 * 运营深链入口：/en/signup?e=&c=&m=&i= → 选票页
 */
export default async function SignupEntryPage({
  params,
  searchParams,
}: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const sp = await searchParams;
  const e = sp.e ? Number(sp.e) : NaN;
  if (!Number.isFinite(e)) {
    redirect(`/${locale}`);
  }

  const qs = new URLSearchParams();
  if (sp.c) qs.set("c", sp.c);
  if (sp.m) qs.set("m", sp.m);
  if (sp.i) qs.set("i", sp.i);
  const suffix = qs.toString() ? `?${qs.toString()}` : "";

  let canSignup = true;
  try {
    const ctx = await resolveSignup({
      e,
      c: sp.c ? Number(sp.c) : undefined,
      m: sp.m ? Number(sp.m) : undefined,
      i: sp.i ? Number(sp.i) : undefined,
      server: true,
    });
    canSignup = ctx.canSignup;
  } catch {
    redirect(`/${locale}/meetings/${e}`);
  }

  if (!canSignup) {
    redirect(`/${locale}/meetings/${e}`);
  }
  redirect(`/${locale}/meetings/${e}/tickets${suffix}`);
}
