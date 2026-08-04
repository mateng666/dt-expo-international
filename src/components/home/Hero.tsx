"use client";

import Image from "next/image";
import { useTranslations } from "next-intl";
import { useState } from "react";
import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";
import { Link } from "@/i18n/navigation";

export function Hero() {
  const t = useTranslations("Home");
  const tc = useTranslations("Common");
  const [index, setIndex] = useState(0);

  const slides = [
    {
      id: 1,
      eyebrow: t("slides.s1Eyebrow"),
      title: t("slides.s1Title"),
      description: t("slides.s1Desc"),
      sideText: t("slides.s1Side"),
      image: "/images/home/bj.png",
    },
    {
      id: 2,
      eyebrow: t("slides.s2Eyebrow"),
      title: t("slides.s2Title"),
      description: t("slides.s2Desc"),
      sideText: t("slides.s2Side"),
      image: "/images/home/bj.png",
    },
    {
      id: 3,
      eyebrow: t("slides.s3Eyebrow"),
      title: t("slides.s3Title"),
      description: t("slides.s3Desc"),
      sideText: t("slides.s3Side"),
      image: "/images/home/bj.png",
    },
  ];

  const slide = slides[index];

  const go = (delta: number) => {
    setIndex((prev) => (prev + delta + slides.length) % slides.length);
  };

  return (
    <section className="relative h-[480px] w-full overflow-hidden bg-[#0B1B3A]">
      <Image
        src={slide.image}
        alt=""
        fill
        priority
        className="object-cover"
        sizes="100vw"
      />
      <div className="absolute inset-0 bg-gradient-to-r from-white/95 via-white/80 to-transparent" />

      <div className="container-content relative z-10 flex h-full items-center">
        <div className="max-w-[520px]">
          <p className="text-[16px] font-medium text-brand">{slide.eyebrow}</p>
          <h1 className="mt-3 text-[40px] font-bold leading-[48px] tracking-tight text-foreground md:text-[56px] md:leading-[64px]">
            {slide.title}
          </h1>
          <p className="mt-4 max-w-[460px] text-[16px] leading-[28px] text-text-body">
            {slide.description}
          </p>
          <Link
            href="/#latest-meetings"
            className="mt-8 inline-flex h-12 items-center gap-2 rounded-[6px] bg-brand px-6 text-[16px] font-medium text-white transition hover:bg-[#0052db]"
          >
            {t("exploreMeetings")}
            <ArrowRight className="h-4 w-4" strokeWidth={2} />
          </Link>
        </div>

        <p className="pointer-events-none absolute right-[8%] top-[42%] hidden text-[28px] font-semibold tracking-wide text-brand/80 lg:block">
          {slide.sideText}
        </p>
      </div>

      <button
        type="button"
        aria-label={tc("prevSlide")}
        onClick={() => go(-1)}
        className="absolute left-6 top-1/2 z-20 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-white/90 text-foreground shadow-[0_4px_20px_rgba(0,0,0,0.06)] transition hover:bg-white"
      >
        <ChevronLeft className="h-5 w-5" strokeWidth={2} />
      </button>
      <button
        type="button"
        aria-label={tc("nextSlide")}
        onClick={() => go(1)}
        className="absolute right-6 top-1/2 z-20 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-white/90 text-foreground shadow-[0_4px_20px_rgba(0,0,0,0.06)] transition hover:bg-white"
      >
        <ChevronRight className="h-5 w-5" strokeWidth={2} />
      </button>

      <div className="absolute bottom-6 left-1/2 z-20 flex -translate-x-1/2 items-center gap-2">
        {slides.map((item, i) => (
          <button
            key={item.id}
            type="button"
            aria-label={`Go to slide ${i + 1}`}
            onClick={() => setIndex(i)}
            className={`h-2.5 rounded-full transition-all ${
              i === index ? "w-6 bg-brand" : "w-2.5 bg-white/70 hover:bg-white"
            }`}
          />
        ))}
      </div>
    </section>
  );
}
