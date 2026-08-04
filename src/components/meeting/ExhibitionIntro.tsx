import { getTranslations } from "next-intl/server";
import { SectionTitle } from "./SectionTitle";

interface ExhibitionIntroProps {
  paragraphs: string[];
}

export async function ExhibitionIntro({ paragraphs }: ExhibitionIntroProps) {
  const t = await getTranslations("Meeting");

  return (
    <section className="bg-white py-[80px]">
      <div className="container-content max-w-[960px]">
        <SectionTitle
          title={t("exhibitionIntro")}
          english={t("exhibitionIntroEn")}
        />
        <div className="space-y-5 text-[16px] leading-[28px] text-foreground">
          {paragraphs.map((paragraph) => (
            <p key={paragraph.slice(0, 24)} className="text-justify">
              {paragraph}
            </p>
          ))}
        </div>
      </div>
    </section>
  );
}
