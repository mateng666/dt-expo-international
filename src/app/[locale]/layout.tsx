import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { hasLocale, NextIntlClientProvider } from "next-intl";
import { getMessages, getTranslations, setRequestLocale } from "next-intl/server";
import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { CookieBanner } from "@/components/legal/CookieBanner";
import { routing } from "@/i18n/routing";

type Props = {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
};

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Meta" });

  return {
    metadataBase: new URL("https://www.eventnovas.com"),
    title: {
      default: t("homeTitle"),
      template: `%s | ${t("siteName")}`,
    },
    description: t("homeDescription"),
    applicationName: t("siteName"),
    openGraph: {
      type: "website",
      locale: locale === "zh" ? "zh_CN" : "en_US",
      siteName: t("siteName"),
      title: t("homeTitle"),
      description: t("homeDescription"),
    },
    twitter: {
      card: "summary_large_image",
      title: t("homeTitle"),
      description: t("homeDescription"),
    },
  };
}

export default async function LocaleLayout({ children, params }: Props) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  setRequestLocale(locale);
  const messages = await getMessages();

  return (
    <html lang={locale} className="h-full antialiased">
      <body className="flex min-h-full flex-col font-sans">
        <NextIntlClientProvider messages={messages}>
          <Header />
          <div className="flex flex-1 flex-col">{children}</div>
          <Footer />
          <CookieBanner />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
