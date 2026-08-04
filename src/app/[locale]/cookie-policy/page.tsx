import type { Metadata } from "next";
import Link from "next/link";
import { CookieTable } from "@/components/legal/CookieTable";
import {
  COOKIE_GROUPS,
  COOKIE_POLICY_META,
} from "@/data/cookie-policy";

export const metadata: Metadata = {
  title: "Cookie Policy",
  description:
    "Learn how Eventnovas and DITExpo use cookies to enhance browsing, analytics, and payment functions.",
};

export default function CookiePolicyPage() {
  return (
    <main className="flex-1 bg-white">
      <article className="container-content max-w-[920px] py-14 md:py-16">
        <header className="text-center">
          <h1 className="text-[36px] font-bold text-foreground md:text-[40px]">
            {COOKIE_POLICY_META.title}
          </h1>
          <p className="mt-3 text-[14px] text-text-muted">
            Last Updated: {COOKIE_POLICY_META.lastUpdated}
          </p>
        </header>

        <div className="mt-12 space-y-10 text-[15px] leading-7 text-text-body">
          <section>
            <h2 className="text-[20px] font-semibold text-foreground">
              1. What Are Cookies?
            </h2>
            <p className="mt-3">
              Cookies are small text files that are placed on your device when
              you visit a website. They are widely used to make websites work
              more efficiently, as well as to provide information to the owners
              of the site. Cookies help us remember your preferences, keep your
              session secure, and improve the overall experience on Eventnovas
              and DITExpo pages.
            </p>
          </section>

          <section>
            <h2 className="text-[20px] font-semibold text-foreground">
              2. Cookies We Use
            </h2>
            <p className="mt-3">
              We use the following categories of cookies. Essential cookies are
              required for core site functions and cannot be disabled. Preference
              and analytics cookies are optional and can be managed through our
              cookie settings.
            </p>

            <div className="mt-6 space-y-8">
              {COOKIE_GROUPS.map((group) => (
                <div key={group.id}>
                  <h3 className="text-[16px] font-semibold text-foreground">
                    {group.title}
                  </h3>
                  <CookieTable rows={group.rows} />
                </div>
              ))}
            </div>
          </section>

          <section>
            <h2 className="text-[20px] font-semibold text-foreground">
              3. Third-Party Cookies
            </h2>
            <p className="mt-3">
              Some cookies are set by third-party services that appear on our
              pages. For payment processing, we may use Stripe cookies for fraud
              prevention and secure checkout. These providers may process data
              according to their own privacy policies.
            </p>
          </section>

          <section>
            <h2 className="text-[20px] font-semibold text-foreground">
              4. How to Manage Cookies
            </h2>

            <h3 className="mt-5 text-[16px] font-semibold text-foreground">
              4.1 Through Our Cookie Settings
            </h3>
            <p className="mt-3">
              When you first visit our website, you can choose how cookies are
              used:
            </p>
            <ul className="mt-3 list-disc space-y-2 pl-6">
              <li>
                <span className="font-medium text-foreground">Accept All</span> —
                allow essential, preference, and analytics cookies
              </li>
              <li>
                <span className="font-medium text-foreground">Essential Only</span>{" "}
                — allow only cookies required for core functionality
              </li>
              <li>
                <span className="font-medium text-foreground">Customize</span> —
                choose preference and analytics cookies individually
              </li>
            </ul>

            <h3 className="mt-6 text-[16px] font-semibold text-foreground">
              4.2 Through Browser Settings
            </h3>
            <p className="mt-3">
              You can also control cookies through your browser settings. Please
              note that blocking essential cookies may affect login, checkout,
              and other core features of the site.
            </p>
          </section>

          <section>
            <h2 className="text-[20px] font-semibold text-foreground">
              5. Updates to This Cookie Policy
            </h2>
            <p className="mt-3">
              We may update this Cookie Policy from time to time to reflect
              changes in technology, legal requirements, or our services. The
              &quot;Last Updated&quot; date at the top of this page indicates
              when the policy was last revised.
            </p>
          </section>

          <section>
            <h2 className="text-[20px] font-semibold text-foreground">
              6. Contact Us
            </h2>
            <p className="mt-3">
              If you have questions about this Cookie Policy or how we use
              cookies, please contact us at{" "}
              <Link
                href={`mailto:${COOKIE_POLICY_META.contactEmail}`}
                className="font-medium text-brand hover:underline"
              >
                {COOKIE_POLICY_META.contactEmail}
              </Link>
              .
            </p>
          </section>
        </div>
      </article>
    </main>
  );
}
