import type { Metadata } from "next";
import { getLocale } from "next-intl/server";
import {
  LegalDocLayout,
  LegalSection,
} from "@/components/legal/LegalDocLayout";
import { LEGAL_LAST_UPDATED, getTermsContent } from "@/data/legal-pages";

export const metadata: Metadata = {
  title: "Terms of Service",
  description:
    "Terms governing use of Eventnovas international conference browsing, registration, and ticketing.",
};

export default async function TermsPage() {
  const locale = await getLocale();
  const content = getTermsContent(locale);

  return (
    <LegalDocLayout
      title={content.title}
      lastUpdated={LEGAL_LAST_UPDATED}
      lastUpdatedLabel={content.lastUpdatedLabel}
    >
      {content.sections.map((section) => (
        <LegalSection key={section.title} title={section.title}>
          {section.paragraphs
            .filter((p) => p.length > 0)
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
