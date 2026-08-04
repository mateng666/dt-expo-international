"use client";

import { useTranslations } from "next-intl";
import { useState, type FormEvent } from "react";
import { ChevronDown } from "lucide-react";
import { INTEREST_TOPICS, REGIONS } from "@/data/payment";
import { Link, useRouter } from "@/i18n/navigation";

interface RegistrationFormProps {
  meetingId: string;
  plan?: string;
}

type FieldKey =
  | "fullName"
  | "company"
  | "phone"
  | "email"
  | "region"
  | "topics";

type FormValues = {
  fullName: string;
  company: string;
  phone: string;
  email: string;
  region: string;
  notes: string;
};

type FormErrors = Partial<Record<FieldKey, string>>;

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const PHONE_RE = /^[+]?[\d\s()-]{6,20}$/;

function inputClass(hasError: boolean) {
  return `mt-2 h-12 w-full rounded-[8px] border bg-white px-4 text-[15px] text-foreground outline-none transition placeholder:text-text-placeholder ${
    hasError
      ? "border-[#EF4444] focus:border-[#EF4444]"
      : "border-border-soft focus:border-brand"
  }`;
}

function FieldError({ message }: { message?: string }) {
  if (!message) return null;
  return <p className="mt-1.5 text-[12px] leading-4 text-[#EF4444]">{message}</p>;
}

export function RegistrationForm({ meetingId, plan }: RegistrationFormProps) {
  const t = useTranslations("Register");
  const router = useRouter();
  const [attendance, setAttendance] = useState<"in-person" | "virtual">(
    "in-person",
  );
  const [topics, setTopics] = useState<string[]>([]);
  const [values, setValues] = useState<FormValues>({
    fullName: "",
    company: "",
    phone: "",
    email: "",
    region: "",
    notes: "",
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [submitting, setSubmitting] = useState(false);

  const setField = <K extends keyof FormValues>(key: K, value: FormValues[K]) => {
    setValues((prev) => ({ ...prev, [key]: value }));
    setErrors((prev) => {
      if (!prev[key as FieldKey]) return prev;
      const next = { ...prev };
      delete next[key as FieldKey];
      return next;
    });
  };

  const toggleTopic = (topic: string) => {
    setTopics((prev) =>
      prev.includes(topic) ? prev.filter((t) => t !== topic) : [...prev, topic],
    );
    setErrors((prev) => {
      if (!prev.topics) return prev;
      const next = { ...prev };
      delete next.topics;
      return next;
    });
  };

  const validate = (): FormErrors => {
    const next: FormErrors = {};

    if (!values.fullName.trim()) {
      next.fullName = t("errors.fullName");
    }

    if (!values.company.trim()) {
      next.company = t("errors.company");
    }

    if (!values.phone.trim()) {
      next.phone = t("errors.phone");
    } else if (!PHONE_RE.test(values.phone.trim())) {
      next.phone = t("errors.phoneInvalid");
    }

    if (!values.email.trim()) {
      next.email = t("errors.email");
    } else if (!EMAIL_RE.test(values.email.trim())) {
      next.email = t("errors.emailInvalid");
    }

    if (!values.region) {
      next.region = t("errors.region");
    }

    if (topics.length === 0) {
      next.topics = t("errors.topics");
    }

    return next;
  };

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const nextErrors = validate();
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) return;

    setSubmitting(true);
    const params = new URLSearchParams();
    if (plan) params.set("plan", plan);
    const qs = params.toString();
    // Create pending order → checkout. Real Stripe redirect comes after API wiring.
    router.push(
      qs
        ? `/meetings/${meetingId}/payment?${qs}`
        : `/meetings/${meetingId}/payment`,
    );
  };

  return (
    <form
      onSubmit={onSubmit}
      noValidate
      className="mx-auto w-full max-w-[640px] rounded-[16px] bg-white px-6 py-10 shadow-[0_8px_32px_rgba(0,0,0,0.08)] sm:px-10"
    >
      <div className="text-center">
        <h1 className="text-[32px] font-bold text-[#0B1F44]">{t("title")}</h1>
        <p className="mt-2 text-[15px] text-text-muted">{t("subtitle")}</p>
      </div>

      <div className="mt-8 space-y-5">
        <label className="block">
          <span className="text-[14px] font-medium text-foreground">{t("fullName")}</span>
          <input
            name="fullName"
            value={values.fullName}
            onChange={(e) => setField("fullName", e.target.value)}
            placeholder={t("fullNamePh")}
            aria-invalid={Boolean(errors.fullName)}
            className={inputClass(Boolean(errors.fullName))}
          />
          <FieldError message={errors.fullName} />
        </label>

        <label className="block">
          <span className="text-[14px] font-medium text-foreground">{t("company")}</span>
          <input
            name="company"
            value={values.company}
            onChange={(e) => setField("company", e.target.value)}
            placeholder={t("companyPh")}
            aria-invalid={Boolean(errors.company)}
            className={inputClass(Boolean(errors.company))}
          />
          <FieldError message={errors.company} />
        </label>

        <label className="block">
          <span className="text-[14px] font-medium text-foreground">{t("phone")}</span>
          <input
            name="phone"
            type="tel"
            value={values.phone}
            onChange={(e) => setField("phone", e.target.value)}
            placeholder={t("phonePh")}
            aria-invalid={Boolean(errors.phone)}
            className={inputClass(Boolean(errors.phone))}
          />
          <FieldError message={errors.phone} />
        </label>

        <label className="block">
          <span className="text-[14px] font-medium text-foreground">{t("email")}</span>
          <input
            name="email"
            type="email"
            value={values.email}
            onChange={(e) => setField("email", e.target.value)}
            placeholder={t("emailPh")}
            aria-invalid={Boolean(errors.email)}
            className={inputClass(Boolean(errors.email))}
          />
          <FieldError message={errors.email} />
        </label>

        <label className="block">
          <span className="text-[14px] font-medium text-foreground">{t("region")}</span>
          <div className="relative mt-2">
            <select
              name="region"
              value={values.region}
              onChange={(e) => setField("region", e.target.value)}
              aria-invalid={Boolean(errors.region)}
              className={`${inputClass(Boolean(errors.region))} mt-0 appearance-none pr-10`}
            >
              <option value="" disabled>
                {t("regionPh")}
              </option>
              {REGIONS.map((region) => (
                <option key={region} value={region}>
                  {region}
                </option>
              ))}
            </select>
            <ChevronDown
              className={`pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 ${
                errors.region ? "text-[#EF4444]" : "text-text-muted"
              }`}
            />
          </div>
          <FieldError message={errors.region} />
        </label>

        <fieldset>
          <legend className="text-[14px] font-medium text-foreground">
            {t("attendance")}
          </legend>
          <div className="mt-2 grid grid-cols-2 gap-3">
            {(
              [
                ["in-person", t("inPerson")],
                ["virtual", t("virtual")],
              ] as const
            ).map(([value, label]) => {
              const active = attendance === value;
              return (
                <button
                  key={value}
                  type="button"
                  onClick={() => setAttendance(value)}
                  className={`h-12 rounded-[8px] border text-[15px] font-medium transition ${
                    active
                      ? "border-brand bg-[#E8F1FF] text-brand"
                      : "border-border-soft bg-white text-text-body hover:border-brand/40"
                  }`}
                >
                  {label}
                </button>
              );
            })}
          </div>
          <input type="hidden" name="attendance" value={attendance} />
        </fieldset>

        <fieldset>
          <legend className="text-[14px] font-medium text-foreground">
            {t("topics")}{" "}
            <span className="font-normal text-text-muted">{t("topicsHint")}</span>
          </legend>
          <div className="mt-2 grid grid-cols-2 gap-3">
            {INTEREST_TOPICS.map((topic) => {
              const active = topics.includes(topic);
              return (
                <button
                  key={topic}
                  type="button"
                  onClick={() => toggleTopic(topic)}
                  className={`h-12 rounded-[8px] border text-[15px] font-medium transition ${
                    active
                      ? "border-brand bg-[#E8F1FF] text-brand"
                      : errors.topics
                        ? "border-[#EF4444] bg-white text-text-body"
                        : "border-border-soft bg-white text-text-body hover:border-brand/40"
                  }`}
                >
                  {topic}
                </button>
              );
            })}
          </div>
          <FieldError message={errors.topics} />
        </fieldset>

        <label className="block">
          <span className="text-[14px] font-medium text-foreground">
            {t("notes")}{" "}
            <span className="font-normal text-text-muted">{t("notesOptional")}</span>
          </span>
          <textarea
            name="notes"
            rows={4}
            value={values.notes}
            onChange={(e) => setField("notes", e.target.value)}
            placeholder={t("notesPh")}
            className="mt-2 w-full resize-none rounded-[8px] border border-border-soft bg-white px-4 py-3 text-[15px] text-foreground outline-none transition placeholder:text-text-placeholder focus:border-brand"
          />
        </label>
      </div>

      <button
        type="submit"
        disabled={submitting}
        className="mt-8 inline-flex h-12 w-full items-center justify-center rounded-[6px] bg-brand text-[16px] font-medium text-white transition hover:bg-[#0052db] disabled:opacity-70"
      >
        {submitting ? t("submitting") : t("submit")}
      </button>

      <div className="mt-4 text-center">
        <Link
          href={`/meetings/${meetingId}`}
          className="text-[15px] font-medium text-brand hover:underline"
        >
          {t("backToEvents")}
        </Link>
      </div>
    </form>
  );
}
