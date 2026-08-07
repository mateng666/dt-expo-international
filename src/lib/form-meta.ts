/** 对齐小程序：系统列不展示，仍可写入 payload（如需）。 */
const EXCLUDE_FIELD_NAMES = new Set([
  "所属通道",
  "门票名称",
  "核定票种",
  "是否参会",
  "签到状态",
  "报名时间",
  "签到时间",
  "审核状态",
  "修改时间",
  "修改人",
  "创建时间",
  "创建人",
  "负责人",
  "报名会议",
]);

/** 海豚自动字段类型 */
const SYSTEM_FIELD_TYPES = new Set([21, 22, 23, 24]);

export type FormFieldKind =
  | "text"
  | "textarea"
  | "number"
  | "email"
  | "tel"
  | "url"
  | "select"
  | "checkbox"
  | "date";

export type PortalFormField = {
  id: string;
  name: string;
  kind: FormFieldKind;
  required: boolean;
  placeholder: string;
  maxLength?: number;
  options?: Array<{ id: string; name: string }>;
  /** 用于识别姓名字段 */
  isName?: boolean;
  /** 用于识别参会人邮箱（限购键） */
  isEmail?: boolean;
  /** 门户补全字段，不写入海豚 formPayload */
  synthetic?: boolean;
};

/** 表单无邮箱列时由门户注入的参会人邮箱字段 id */
export const PARTICIPANT_EMAIL_FIELD_ID = "__intl_participant_email__";

export type FormMetaPayload = {
  isGlobalMobileValidate?: number;
  mobileFieldId?: string | null;
  sourceInfo?: { datasheetId?: string };
  snapshot?: {
    meta?: {
      fieldMap?: Record<
        string,
        {
          id?: string;
          name?: string;
          type?: number;
          renderOrder?: number;
          required?: boolean;
          hidden?: boolean;
          visible?: boolean;
          property?: {
            maxLength?: number | string;
            options?: Array<{ id: string; name: string }>;
            defaultValue?: unknown;
          };
        }
      >;
      validRulesMap?: Record<
        string,
        Array<{ type?: string; message?: string; value?: unknown }>
      >;
    };
  };
};

function mapKind(type?: number, fieldId?: string, mobileFieldId?: string | null): FormFieldKind {
  if (fieldId && mobileFieldId && fieldId === mobileFieldId) return "tel";
  switch (type) {
    case 1:
      return "textarea";
    case 2:
    case 16:
    case 17:
    case 18:
      return "number";
    case 3:
      return "select";
    case 4:
      return "checkbox";
    case 5:
      return "date";
    case 8:
      return "url";
    case 9:
      return "email";
    case 10:
      return "tel";
    case 19:
    default:
      return "text";
  }
}

function isRequired(
  fieldId: string,
  fieldRequired: boolean | undefined,
  rules?: Array<{ type?: string }>,
): boolean {
  if (fieldRequired) return true;
  return Boolean(rules?.some((r) => r.type === "required"));
}

function maxLengthFrom(
  field: { property?: { maxLength?: number | string } },
  rules?: Array<{ type?: string; value?: unknown }>,
): number | undefined {
  const fromProp = field.property?.maxLength;
  if (fromProp != null && fromProp !== "") {
    const n = Number(fromProp);
    if (Number.isFinite(n)) return n;
  }
  const rule = rules?.find((r) => r.type === "maxLength");
  if (rule?.value != null) {
    const n = Number(rule.value);
    if (Number.isFinite(n)) return n;
  }
  return undefined;
}

/** 海豚字段名多为中文；国际门户默认英文展示。 */
const FIELD_LABEL_EN: Record<string, string> = {
  姓名: "Full Name",
  手机号: "Phone Number",
  手机: "Phone Number",
  电话: "Phone Number",
  公司名称: "Company",
  公司: "Company",
  邮箱: "Email",
  电子邮箱: "Email",
  职位: "Job Title",
  部门: "Department",
  地区: "Region",
  国家: "Country",
  城市: "City",
  地址: "Address",
  备注: "Notes",
};

export function localizeFieldLabel(name: string, locale = "en"): string {
  if (locale.startsWith("zh")) return name;
  return FIELD_LABEL_EN[name] || name;
}

export function fieldPlaceholder(
  kind: FormFieldKind,
  label: string,
  locale = "en",
): string {
  if (locale.startsWith("zh")) {
    return kind === "select" || kind === "date" || kind === "checkbox"
      ? `请选择${label}`
      : `请输入${label}`;
  }
  return kind === "select" || kind === "date" || kind === "checkbox"
    ? `Select ${label}`
    : `Enter ${label}`;
}

/** 海豚 form-meta → 门户可渲染字段（过滤系统列）。 */
export function parseFormMeta(
  meta: FormMetaPayload | null | undefined,
  locale = "en",
): PortalFormField[] {
  const fieldMap = meta?.snapshot?.meta?.fieldMap || {};
  const rulesMap = meta?.snapshot?.meta?.validRulesMap || {};
  const mobileFieldId = meta?.mobileFieldId || null;

  const fields = Object.entries(fieldMap)
    .map(([key, field]) => ({ ...field, id: field.id || key }))
    .filter((field) => {
      const name = (field.name || "").trim();
      if (!name) return false;
      if (EXCLUDE_FIELD_NAMES.has(name) || name.includes("报名会议")) return false;
      if (field.hidden === true || field.visible === false) return false;
      if (field.type != null && SYSTEM_FIELD_TYPES.has(field.type)) return false;
      return true;
    })
    .sort((a, b) => (a.renderOrder || 0) - (b.renderOrder || 0));

  const parsed = fields.map((field) => {
    const id = String(field.id);
    const rules = rulesMap[id];
    const rawName = field.name || id;
    const name = localizeFieldLabel(rawName, locale);
    const kind = mapKind(field.type, id, mobileFieldId);
    const isEmail =
      kind === "email" ||
      rawName === "邮箱" ||
      rawName === "电子邮箱" ||
      /^e-?mail$/i.test(rawName);
    return {
      id,
      name,
      kind: isEmail ? ("email" as FormFieldKind) : kind,
      required: isRequired(id, field.required, rules),
      placeholder: fieldPlaceholder(isEmail ? "email" : kind, name, locale),
      maxLength: maxLengthFrom(field, rules),
      options: (field.property?.options || []).map((o) => ({
        id: o.id,
        name: o.name,
      })),
      isName: rawName === "姓名" || /name/i.test(rawName),
      isEmail,
    };
  });

  if (!parsed.some((f) => f.isEmail)) {
    const label = locale.startsWith("zh") ? "邮箱" : "Email Address";
    parsed.push({
      id: PARTICIPANT_EMAIL_FIELD_ID,
      name: label,
      kind: "email",
      required: true,
      placeholder: fieldPlaceholder("email", label, locale),
      maxLength: 254,
      isEmail: true,
      synthetic: true,
    });
  }
  return parsed;
}
