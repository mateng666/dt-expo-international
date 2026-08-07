import type { Metadata } from "next";
import { getLocale } from "next-intl/server";
import {
  LegalDocLayout,
  LegalSection,
} from "@/components/legal/LegalDocLayout";
import { LEGAL_LAST_UPDATED, getPrivacyContent } from "@/data/legal-pages";
import { fetchLegal } from "@/lib/intl-api";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description:
    "How Eventnovas collects, uses, and retains personal data for international event ticketing.",
};

export default async function PrivacyPage() {
  const locale = await getLocale();
  const apiDoc = await fetchLegal("privacy", true);
  const fallback = getPrivacyContent(locale);

  const title = apiDoc?.title || fallback.title;
  const lastUpdated = apiDoc?.effectiveDate || LEGAL_LAST_UPDATED;
  const lastUpdatedLabel =
    apiDoc?.lastUpdatedLabel || fallback.lastUpdatedLabel;
  const sections =
    apiDoc?.sections && apiDoc.sections.length > 0
      ? apiDoc.sections
      : fallback.sections;

  return (
    <LegalDocLayout
      title={title}
      lastUpdated={lastUpdated}
      lastUpdatedLabel={lastUpdatedLabel}
    >
      {sections.map((section) => (
        <LegalSection key={section.title} title={section.title}>
          {(section.paragraphs || [])
            .filter((p) => p && p.length > 0)
            .map((p) => (
              <p key={p.slice(0, 48)}>{p}</p>
            ))}
          {section.bullets ? (
            <ul className="list-disc space-y-2 pl-6">
              {section.bullets.map((item) => (
                <li key={item.slice(0, 48)}>{item}</li>
              ))}
            </ul>
          ) : null}
        </LegalSection>
      ))}
    </LegalDocLayout>
  );
}
