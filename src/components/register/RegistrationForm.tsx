"use client";

import { useEffect, useMemo, useState, type FormEvent } from "react";
import { useLocale, useTranslations } from "next-intl";
import { ChevronDown } from "lucide-react";
import { Link, useRouter } from "@/i18n/navigation";
import { ApiError } from "@/lib/api";
import {
  PARTICIPANT_EMAIL_FIELD_ID,
  parseFormMeta,
  type PortalFormField,
} from "@/lib/form-meta";
import {
  createOrder,
  fetchFormMeta,
  fetchTicketChannel,
} from "@/lib/intl-api";
import { getClientToken, goUserCenterLogin } from "@/lib/session";
import { toUserFacingError } from "@/lib/user-facing-error";

interface RegistrationFormProps {
  meetingId: string;
  plan?: string;
  channelId?: string;
  childExpoId?: string;
  inviteCodeId?: string;
}

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

function absoluteUrl(path: string) {
  if (typeof window === "undefined") return path;
  return `${window.location.origin}${path.startsWith("/") ? path : `/${path}`}`;
}

function htmlInputType(kind: PortalFormField["kind"]) {
  if (kind === "email") return "email";
  if (kind === "tel") return "tel";
  if (kind === "number") return "number";
  if (kind === "url") return "url";
  if (kind === "date") return "datetime-local";
  return "text";
}

export function RegistrationForm({
  meetingId,
  plan,
  channelId: channelIdProp,
  childExpoId,
  inviteCodeId,
}: RegistrationFormProps) {
  const t = useTranslations("Register");
  const locale = useLocale();
  const router = useRouter();

  const [channelId, setChannelId] = useState(channelIdProp);
  const [planName, setPlanName] = useState<string>();
  const [fields, setFields] = useState<PortalFormField[]>([]);
  const [values, setValues] = useState<Record<string, string>>({});
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [loadError, setLoadError] = useState("");
  const [loading, setLoading] = useState(true);
  const [submitError, setSubmitError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    setLoadError("");

    (async () => {
      try {
        // 浏览器可见：票种 + 表单元数据
        const channel = await fetchTicketChannel({
          expoId: Number(meetingId),
          channelId: channelIdProp ? Number(channelIdProp) : undefined,
          server: false,
        });
        if (cancelled) return;
        setChannelId(String(channel.channelId));
        if (plan) {
          setPlanName(channel.tiers.find((x) => x.id === plan)?.name);
        }
        const meta = await fetchFormMeta(channel.channelId, false);
        if (cancelled) return;
        const parsed = parseFormMeta(meta, locale);
        setFields(parsed);
        const next: Record<string, string> = {};
        for (const f of parsed) next[f.id] = "";
        setValues(next);
      } catch (err) {
        if (!cancelled) {
          setLoadError(toUserFacingError(err, t("errors.loadForm")));
          setFields([]);
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();

    return () => {
      cancelled = true;
    };
  }, [meetingId, channelIdProp, plan, locale, t]);

  const planValid = useMemo(() => Boolean(plan && /^\d+$/.test(plan)), [plan]);

  const setField = (id: string, value: string) => {
    setValues((prev) => ({ ...prev, [id]: value }));
    setErrors((prev) => {
      if (!prev[id]) return prev;
      const next = { ...prev };
      delete next[id];
      return next;
    });
  };

  const validate = (): Record<string, string> => {
    const next: Record<string, string> = {};
    if (!planValid) next._plan = t("errors.plan");
    for (const field of fields) {
      const raw = (values[field.id] || "").trim();
      if (field.required && !raw) {
        next[field.id] = t("errors.required", { field: field.name });
        continue;
      }
      if (field.maxLength && raw.length > field.maxLength) {
        next[field.id] = t("errors.maxLength", {
          field: field.name,
          max: field.maxLength,
        });
      }
      if (field.kind === "email" && raw && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(raw)) {
        next[field.id] = t("errors.emailInvalid");
      }
    }
    return next;
  };

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSubmitError("");
    const nextErrors = validate();
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) return;

    if (!getClientToken()) {
      goUserCenterLogin();
      return;
    }

    setSubmitting(true);
    try {
      const payload: Record<string, string> = {};
      for (const field of fields) {
        if (field.synthetic || field.id === PARTICIPANT_EMAIL_FIELD_ID) continue;
        payload[field.id] = (values[field.id] || "").trim();
      }
      const nameField =
        fields.find((f) => f.isName) ||
        fields.find((f) => f.name.includes("姓名") || /name/i.test(f.name));
      const emailField =
        fields.find((f) => f.isEmail) ||
        fields.find((f) => f.kind === "email");
      const participantEmail = emailField
        ? (values[emailField.id] || "").trim()
        : undefined;

      const result = await createOrder({
        e: Number(meetingId),
        c: channelId ? Number(channelId) : undefined,
        m: childExpoId ? Number(childExpoId) : undefined,
        i: inviteCodeId ? Number(inviteCodeId) : undefined,
        ticketTypeId: Number(plan),
        inviteCodeId: inviteCodeId ? Number(inviteCodeId) : undefined,
        participantName: nameField
          ? (values[nameField.id] || "").trim()
          : undefined,
        participantEmail,
        formPayloadJson: JSON.stringify(payload),
        successUrl: absoluteUrl(`/en/meetings/${meetingId}/payment/success`),
        cancelUrl: absoluteUrl(`/en/meetings/${meetingId}/payment/failed`),
      });

      if (result.zero) {
        router.push(
          `/meetings/${meetingId}/payment/success?orderSn=${encodeURIComponent(result.orderSn)}`,
        );
        return;
      }
      if (result.checkoutUrl) {
        window.location.href = result.checkoutUrl;
        return;
      }
      router.push(
        `/meetings/${meetingId}/payment?orderSn=${encodeURIComponent(result.orderSn)}`,
      );
    } catch (err) {
      if (
        err instanceof ApiError &&
        (err.code === 401 || err.errorCode === "UNAUTHORIZED")
      ) {
        goUserCenterLogin();
        return;
      }
      setSubmitError(toUserFacingError(err, t("errors.submit")));
    } finally {
      setSubmitting(false);
    }
  };

  if (!planValid) {
    return (
      <div className="mx-auto w-full max-w-[640px] rounded-[16px] bg-white px-6 py-10 text-center shadow-[0_8px_32px_rgba(0,0,0,0.08)] sm:px-10">
        <h1 className="text-[28px] font-bold text-[#0B1F44]">{t("title")}</h1>
        <p className="mt-3 text-[15px] text-[#EF4444]">{t("errors.plan")}</p>
        <Link
          href={`/meetings/${meetingId}/tickets`}
          className="mt-6 inline-flex h-11 items-center justify-center rounded-[6px] bg-brand px-6 text-[15px] font-medium text-white"
        >
          {t("backToTickets")}
        </Link>
      </div>
    );
  }

  return (
    <form
      onSubmit={onSubmit}
      noValidate
      className="mx-auto w-full max-w-[640px] rounded-[16px] bg-white px-6 py-10 shadow-[0_8px_32px_rgba(0,0,0,0.08)] sm:px-10"
    >
      <div className="text-center">
        <h1 className="text-[32px] font-bold text-[#0B1F44]">{t("title")}</h1>
        <p className="mt-2 text-[15px] text-text-muted">{t("subtitle")}</p>
        {planName ? (
          <p className="mt-3 text-[14px] font-medium text-brand">
            {t("selectedPlan")}: {planName}
          </p>
        ) : null}
      </div>

      {loading ? (
        <p className="mt-10 text-center text-[14px] text-text-muted">
          {t("loadingForm")}
        </p>
      ) : loadError ? (
        <p className="mt-10 text-center text-[14px] text-[#EF4444]">{loadError}</p>
      ) : (
        <div className="mt-8 space-y-5">
          {fields.length === 0 ? (
            <p className="text-center text-[14px] text-text-muted">
              {t("noFields")}
            </p>
          ) : (
            fields.map((field) => {
              const err = errors[field.id];
              if (field.kind === "textarea") {
                return (
                  <label key={field.id} className="block">
                    <span className="text-[14px] font-medium text-foreground">
                      {field.name}
                      {field.required ? (
                        <span className="text-[#EF4444]"> *</span>
                      ) : null}
                    </span>
                    <textarea
                      value={values[field.id] || ""}
                      onChange={(e) => setField(field.id, e.target.value)}
                      placeholder={field.placeholder}
                      rows={4}
                      maxLength={field.maxLength}
                      className="mt-2 w-full resize-none rounded-[8px] border border-border-soft bg-white px-4 py-3 text-[15px] outline-none focus:border-brand"
                    />
                    <FieldError message={err} />
                  </label>
                );
              }
              if (field.kind === "select") {
                return (
                  <label key={field.id} className="block">
                    <span className="text-[14px] font-medium text-foreground">
                      {field.name}
                      {field.required ? (
                        <span className="text-[#EF4444]"> *</span>
                      ) : null}
                    </span>
                    <div className="relative mt-2">
                      <select
                        value={values[field.id] || ""}
                        onChange={(e) => setField(field.id, e.target.value)}
                        className={`${inputClass(Boolean(err))} mt-0 appearance-none pr-10`}
                      >
                        <option value="" disabled>
                          {field.placeholder}
                        </option>
                        {(field.options || []).map((opt) => (
                          <option key={opt.id} value={opt.id}>
                            {opt.name}
                          </option>
                        ))}
                      </select>
                      <ChevronDown className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-text-muted" />
                    </div>
                    <FieldError message={err} />
                  </label>
                );
              }
              return (
                <label key={field.id} className="block">
                  <span className="text-[14px] font-medium text-foreground">
                    {field.name}
                    {field.required ? (
                      <span className="text-[#EF4444]"> *</span>
                    ) : null}
                  </span>
                  <input
                    type={htmlInputType(field.kind)}
                    value={values[field.id] || ""}
                    onChange={(e) => setField(field.id, e.target.value)}
                    placeholder={field.placeholder}
                    maxLength={field.maxLength}
                    aria-invalid={Boolean(err)}
                    className={inputClass(Boolean(err))}
                  />
                  <FieldError message={err} />
                </label>
              );
            })
          )}
        </div>
      )}

      {errors._plan ? (
        <p className="mt-4 text-center text-[14px] text-[#EF4444]">
          {errors._plan}
        </p>
      ) : null}
      {submitError ? (
        <p className="mt-4 text-center text-[14px] text-[#EF4444]">{submitError}</p>
      ) : null}

      <button
        type="submit"
        disabled={submitting || loading || fields.length === 0}
        className="mt-8 inline-flex h-12 w-full items-center justify-center rounded-[6px] bg-brand text-[16px] font-medium text-white transition hover:bg-[#0052db] disabled:opacity-70"
      >
        {submitting ? t("submitting") : t("submit")}
      </button>

      <div className="mt-4 text-center">
        <Link
          href={`/meetings/${meetingId}/tickets`}
          className="text-[15px] font-medium text-brand hover:underline"
        >
          {t("backToTickets")}
        </Link>
      </div>
    </form>
  );
}
