import type { Metadata } from "next";
import { getLocale } from "next-intl/server";
import {
  LegalDocLayout,
  LegalSection,
} from "@/components/legal/LegalDocLayout";
import { LEGAL_LAST_UPDATED, getRefundContent } from "@/data/legal-pages";

export const metadata: Metadata = {
  title: "Refund Policy",
  description:
    "Refund rules for paid Eventnovas international tickets processed via Stripe.",
};

export default async function RefundPolicyPage() {
  const locale = await getLocale();
  const content = getRefundContent(locale);

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
