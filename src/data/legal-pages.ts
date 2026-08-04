import { SITE_CONTACT } from "@/data/site-contact";

/** Effective date on official EventNovas Privacy / Terms (docs/3.4.0). */
export const LEGAL_LAST_UPDATED = "August 3, 2026";

type Section = { title: string; paragraphs: string[]; bullets?: string[] };

/**
 * Content aligned with:
 * - EventNovas - Privacy Policy.docx
 * - EventNovas - Terms and Conditions.docx
 * Official docs are English; site serves the same text for all locales.
 */
export function getPrivacyContent(_locale: string): {
  title: string;
  lastUpdatedLabel: string;
  sections: Section[];
} {
  return {
    title: "Privacy Policy",
    lastUpdatedLabel: "Effective Date",
    sections: [
      {
        title: "1. Introduction",
        paragraphs: [
          `This Privacy Policy sets out how ${SITE_CONTACT.legalName} (“we”, “us”, “our”) collects, uses, stores and protects your personal information when you use EventNovas, our exclusive system for DIFGC summit attendee registration, one-time conference fee payment, invoice issuance, physical conference material delivery and event notification. This platform is not a public commercial website for browsing, advertising or visitor tracking. By submitting registration information, ticking the consent box and completing payment, you fully acknowledge and agree to this Privacy Policy.`,
        ],
      },
      {
        title: "2. Who We Are",
        paragraphs: [
          `Data Controller: ${SITE_CONTACT.legalName}`,
          `Registered company: ${SITE_CONTACT.companyName} (UEN ${SITE_CONTACT.uen})`,
          `Registered Address: ${SITE_CONTACT.address}`,
          `Privacy & Data Subject Request Contact: ${SITE_CONTACT.email}`,
          `Hotline: ${SITE_CONTACT.phone}`,
        ],
      },
      {
        title: "3. Information We Collect & Collection Purposes",
        paragraphs: [
          "We only collect personal data necessary for conference operation, and will never use your data for unrelated commercial marketing without your separate consent.",
        ],
        bullets: [
          "Identity info: Full name, job title, company name",
          "Contact info: Mobile phone number, email address",
          "Mailing & billing data: Billing address (for invoice issuing), mailing address (for sending conference invitations, physical brochures and certificates)",
          "Payment related billing information (we do NOT store full credit/debit card numbers; all payment data is processed by authorized third-party payment service providers such as Stripe)",
        ],
      },
      {
        title: "3.2 We Do Not Collect",
        paragraphs: [""],
        bullets: [
          "User age, login passwords, device location, camera/album permissions",
          "Behavioral tracking data, advertising identifiers, cookies for user profiling",
          "Third-party social media account information",
        ],
      },
      {
        title: "3.3 Legal Basis for Data Processing",
        paragraphs: [""],
        bullets: [
          "Performance of contract: Process your data to complete registration, confirm admission, collect conference fees and deliver conference services",
          "Legitimate interest: Prevent fake registration, fraud and on-site venue management",
          "Legal obligation: Retain invoice and transaction records to comply with tax, accounting and cross-border data compliance requirements",
          "Consent: Only send conference-related notification emails; you may unsubscribe at any time",
        ],
      },
      {
        title: "4. How We Use Your Personal Data",
        paragraphs: [
          "Your personal information will only be used for the following limited purposes:",
        ],
        bullets: [
          "Verify your registration identity and confirm your conference admission qualification",
          "Process one-time conference fee payment, generate and send electronic/paper invoices",
          "Deliver physical conference materials, invitations and certificates to your submitted mailing address",
          "Send event reminders, forum schedule updates and on-site notice via email/SMS",
          "Conduct internal event statistics, summit summary and industry research (all data anonymized before analysis)",
          "Handle refund, registration transfer and customer service inquiries submitted by you",
          "Comply with legal, tax and regulatory document retention requirements",
        ],
      },
      {
        title: "On-site Likeness Data",
        paragraphs: [
          "During the summit, we will take photos and record videos for event summary and industry publicity. Your portrait information captured on-site is classified as personal data. We only use such media within the scope of DIFGC summit promotion, and will not sell or license your portrait to unrelated third parties. If you refuse to be photographed, you may notify our on-site staff in writing before entering the venue.",
        ],
      },
      {
        title: "5. Data Retention Period",
        paragraphs: [""],
        bullets: [
          "Complete registration personal data (name, company, contact, address): Retain for 12 months after the conference closing date, then fully anonymized or permanently deleted",
          "Invoice, payment transaction records: Retain in accordance with local tax laws and accounting regulations (minimum 7 years)",
          "On-site photos & video materials: Retain for 3 years for brand archive; you may submit a deletion request at any time",
        ],
      },
      {
        title: "6. Data Sharing & Disclosure",
        paragraphs: [
          "We will never sell, rent or trade your personal data to third-party marketing companies. We only share limited necessary data with authorized service providers bound by strict data protection agreements (payment processors, logistics vendors, accounting & tax providers).",
          "We may disclose data without prior consent when required by law, to protect legal rights and safety, or in emergency situations. If our company undergoes merger, asset sale or acquisition, personal data may transfer as business assets under continued protection of this Policy.",
        ],
      },
      {
        title: "7. Data Security Protection",
        paragraphs: [
          "We implement encrypted transmission and storage, access permission control, regular security inspection, and require third-party providers to sign confidentiality agreements. No electronic system can guarantee 100% absolute security; we will notify you of confirmed breaches as required by law.",
        ],
      },
      {
        title: "8. Your Data Rights",
        paragraphs: [
          `In accordance with applicable privacy laws (including PIPL, GDPR and CCPA where applicable), you may contact ${SITE_CONTACT.email} to exercise rights of access, rectification, erasure, restriction, portability and objection. We will respond to valid requests within 15 working days free of charge.`,
        ],
      },
      {
        title: "9. International Data Transfer",
        paragraphs: [
          "Your personal data may be stored on servers located in Singapore and China. We adopt appropriate contractual and technical measures (including EU Standard Contractual Clauses where applicable) for cross-border transfers.",
        ],
      },
      {
        title: "10. Third-Party Links",
        paragraphs: [
          "EventNovas may contain links to third-party payment platforms and logistics websites. Review their separate privacy policies before submitting data to them. We bear no liability for third-party services.",
        ],
      },
      {
        title: "11. Children’s Data",
        paragraphs: [
          "Our summit is only open to industry practitioners aged 18 and above. We do not intentionally collect personal information from minors under 18. If we discover registration submitted by minors, we will delete related data immediately and cancel the registration without refund.",
        ],
      },
      {
        title: "12. Changes to This Privacy Policy",
        paragraphs: [
          "Material changes will be notified by email 30 days before taking effect. Continued use after the update means acceptance. If you disagree, you may cancel registration and apply for eligible refunds per our Terms & Conditions.",
        ],
      },
      {
        title: "13. Contact Us",
        paragraphs: [
          `Email: ${SITE_CONTACT.complianceEmail}`,
          `Phone: ${SITE_CONTACT.phone}`,
          `Postal Address: ${SITE_CONTACT.address}`,
        ],
      },
    ],
  };
}

export function getTermsContent(_locale: string): {
  title: string;
  lastUpdatedLabel: string;
  sections: Section[];
} {
  return {
    title: "Terms and Conditions",
    lastUpdatedLabel: "Effective Date",
    sections: [
      {
        title: "Introduction",
        paragraphs: [
          `These Terms and Conditions govern your use of EventNovas, an exclusive system built for DIFGC / DITEXPO or other summit attendee registration, one-time conference fee payment, admission certificate issuance and event notification delivery. Operator: ${SITE_CONTACT.legalName} (${SITE_CONTACT.companyName}).`,
          "By submitting registration information, completing payment, or accessing our system, you fully agree to be legally bound by these Terms and Conditions. If you disagree with any clause herein, you shall not proceed with registration or payment.",
        ],
      },
      {
        title: "1. Acceptance of Terms",
        paragraphs: [""],
        bullets: [
          "Submitting registration forms, ticking the consent box, and completing payment constitute your full acceptance of all terms under this agreement.",
          `${SITE_CONTACT.legalName} reserves the right to revise these terms; material updates will be notified via your registered email 30 days in advance.`,
          "If you complete registration on behalf of other attendees, you warrant that the participant has agreed to these terms, and you shall bear joint liability for any breach by the registered participant.",
        ],
      },
      {
        title: "2. Age Eligibility",
        paragraphs: [
          "Users must be at least 18 years old to register. Minors under 18 are not eligible. If we identify registration by minors, we reserve the right to cancel without refund.",
        ],
      },
      {
        title: "3. Registration & One-Time Payment Rules",
        paragraphs: [""],
        bullets: [
          "All registration information you provide must be true, accurate and complete. False or misleading information leads to immediate cancellation of admission.",
          "All conference fees are one-time lump-sum payments. No recurring auto-deduction or subscription charges. Registration is confirmed only after full payment is received.",
          "Payment is handled via authorized third-party providers (including Stripe). We do not store complete card numbers or bank credentials.",
          "Invoices are issued based on the billing address you submit; mailing addresses are used only for physical materials, invitations and certificates.",
        ],
      },
      {
        title: "4. Cancellation, Refund & Registration Transfer",
        paragraphs: [
          `All refund requests must be submitted in writing via registered email to ${SITE_CONTACT.email} with your unique registration ID. See our Refund Policy page for the full schedule. Eligible refunds return to the original payment channel within 14 working days after confirmation; bank exchange and transfer charges may be deducted.`,
          "You may transfer admission to another industry colleague only with a written transfer application submitted 7 full days before opening. Resale or unauthorized lending is forbidden.",
        ],
      },
      {
        title: "5. On-site Likeness & Image Authorization",
        paragraphs: [
          "By completing registration and attending, you authorize photography, video and live streaming for event summary and publicity. To refuse capture, notify on-site staff in writing before entering the venue.",
        ],
      },
      {
        title: "6. Venue Code of Conduct",
        paragraphs: [
          "Do not distribute unauthorized promotions, disrupt sessions, or bring prohibited items. We may refuse access or expel violators with no registration fee refund.",
        ],
      },
      {
        title: "7–10. IP, Third Parties, Prohibited Use & Termination",
        paragraphs: [
          "Trademarks, logos, speeches and on-site content belong to the operator. Unauthorized recording or commercial redistribution is prohibited.",
          "Third-party payment and logistics services have their own terms; we are not liable for their independent faults or policies.",
          "Hacking, scraping, malware, collecting others’ data without permission, or impersonation is prohibited. Breach may result in immediate suspension or cancellation without advance notice.",
        ],
      },
      {
        title: "11–12. Warranty Disclaimer & Limitation of Liability",
        paragraphs: [
          "EventNovas is provided “AS IS” and “AS AVAILABLE”. Aggregate liability shall not exceed the total registration fees you paid within 12 months before the claim, or USD 100 (whichever is higher). We are not liable for indirect losses such as travel, accommodation or lost profits.",
        ],
      },
      {
        title: "13–15. Indemnification, Force Majeure & Governing Law",
        paragraphs: [
          "You agree to indemnify us against claims arising from your breach, infringement, or false registration information.",
          "We are not liable for delays caused by force majeure; remedies may include schedule adjustment or full fee refund as exclusive remedy where applicable.",
          "These Terms are governed by the laws of the People’s Republic of China. Disputes unresolved by negotiation shall be submitted to the people’s court located in Beijing.",
        ],
      },
      {
        title: "16–17. Modification & Contact",
        paragraphs: [
          "Material changes (including refund rules) will be emailed at least 30 days before implementation. You may cancel for full refund if you disagree before they take effect.",
          `Email: ${SITE_CONTACT.complianceEmail}`,
          `Phone: ${SITE_CONTACT.phone}`,
          `Address: ${SITE_CONTACT.address}`,
        ],
      },
    ],
  };
}

export function getRefundContent(_locale: string): {
  title: string;
  lastUpdatedLabel: string;
  sections: Section[];
} {
  return {
    title: "Refund Policy",
    lastUpdatedLabel: "Effective Date",
    sections: [
      {
        title: "1. Scope",
        paragraphs: [
          `This Refund Policy forms part of the EventNovas Terms and Conditions operated by ${SITE_CONTACT.legalName} (${SITE_CONTACT.companyName}). It applies to one-time conference registration fees paid through EventNovas.`,
        ],
      },
      {
        title: "2. How to Request",
        paragraphs: [
          `All refund requests must be submitted in writing via registered email to ${SITE_CONTACT.email} with your unique registration ID.`,
        ],
      },
      {
        title: "3. Cancellation & Refund Schedule",
        paragraphs: [""],
        bullets: [
          "Cancellation received 30+ days before the conference opening: Full refund, minus a 6% administrative processing fee",
          "Cancellation received 15–29 days before the conference opening: 50% of total paid fees will be refunded",
          "Cancellation received within 14 days before opening / no-show on event days: No refund will be issued for any reason (including visa rejection, personal schedule conflict, travel delay or force majeure affecting your personal attendance)",
        ],
      },
      {
        title: "4. Settlement",
        paragraphs: [
          "All eligible refunds will be returned to the original payment channel within 14 working days after confirmation; bank exchange fees and transfer charges shall be deducted from the final refund amount.",
          `${SITE_CONTACT.legalName} reserves the right to cancel your registration without full or partial refund if you violate prohibited conduct clauses in the Terms and Conditions.`,
        ],
      },
      {
        title: "5. Registration Transfer",
        paragraphs: [
          "You may transfer your admission qualification to another industry colleague only if you submit a written transfer application 7 full days before the conference opening. Resale, commercial reselling or unauthorized lending of admission credentials is strictly forbidden.",
        ],
      },
      {
        title: "6. Contact",
        paragraphs: [
          `Refund email: ${SITE_CONTACT.email}`,
          `Phone: ${SITE_CONTACT.phone}`,
          `Address: ${SITE_CONTACT.address}`,
        ],
      },
    ],
  };
}
