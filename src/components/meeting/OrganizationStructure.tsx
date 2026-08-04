import { getTranslations } from "next-intl/server";
import type { OrganizationItem } from "@/data/meetings";
import { SectionTitle } from "./SectionTitle";

interface OrganizationStructureProps {
  items: OrganizationItem[];
}

export async function OrganizationStructure({
  items,
}: OrganizationStructureProps) {
  const t = await getTranslations("Meeting");

  const labelMap: Record<string, string> = {
    host: t("host"),
    organizer: t("organizer"),
    execution: t("execution"),
    coOrganizer: t("coOrganizer"),
  };

  return (
    <section className="bg-white pb-[80px]">
      <div className="container-content max-w-[960px]">
        <SectionTitle
          title={t("orgStructure")}
          english={t("orgStructureEn")}
        />
        <div className="space-y-5 text-[16px] leading-[28px] text-foreground">
          {items.map((item) => (
            <p key={item.label} className="text-justify">
              <span className="font-semibold">
                {labelMap[item.label] ?? item.label}:{" "}
              </span>
              {item.value}
            </p>
          ))}
        </div>
      </div>
    </section>
  );
}
