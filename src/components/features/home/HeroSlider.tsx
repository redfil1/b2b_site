"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";
import { useCallback, useEffect, useState } from "react";

// Слайдер главной — Frontend.md, раздел 4.3.4. Картинки — тестовые PNG-заглушки
// (сплошная плашка бренда) в public/images/hero/, рендер через next/image (fill).
// Реальные баннеры кладутся тем же путём. Анимация — только fade через Tailwind
// transition, без библиотек (раздел 4.3.3); при prefers-reduced-motion автопрокрутка
// отключается, остаётся ручное переключение.
const SLIDES = [
  {
    id: "equipment",
    src: "/images/hero/slide-1.png",
    title: "Промышленное и лабораторное оборудование",
    subtitle: "Газоанализаторы, КИП, лабораторные приборы и спецтехника под заказ из Китая",
    tone: "bg-brand-800",
  },
  {
    id: "delivery",
    src: "/images/hero/slide-2.png",
    title: "Поставка под заказ",
    subtitle: "Склада в РФ нет — каждая позиция подбирается под конкретную задачу",
    tone: "bg-brand-600",
  },
  {
    id: "support",
    src: "/images/hero/slide-3.png",
    title: "Сопровождение менеджером",
    subtitle: "Подбор, коммерческое предложение и согласование заказа с поставщиком",
    tone: "bg-brand-800",
  },
];

const AUTOPLAY_MS = 6000;

export function HeroSlider() {
  const [current, setCurrent] = useState(0);

  const goTo = useCallback((index: number) => {
    setCurrent((index + SLIDES.length) % SLIDES.length);
  }, []);

  useEffect(() => {
    // Автопрокрутка только если пользователь не просил уменьшить движение (доступность).
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return;
    }
    const timer = window.setInterval(() => {
      setCurrent((index) => (index + 1) % SLIDES.length);
    }, AUTOPLAY_MS);
    return () => window.clearInterval(timer);
  }, []);

  return (
    <section
      aria-roledescription="карусель"
      aria-label="Ключевые направления"
      className="relative overflow-hidden rounded-2xl"
    >
      <div className="relative aspect-[16/9] w-full sm:aspect-[21/9]">
        {SLIDES.map((slide, index) => (
          <div
            key={slide.id}
            aria-hidden={index !== current}
            className={`absolute inset-0 transition-opacity duration-200 ease-out motion-reduce:transition-none ${slide.tone} ${
              index === current ? "opacity-100" : "pointer-events-none opacity-0"
            }`}
          >
            <Image
              src={slide.src}
              alt=""
              fill
              priority={index === 0}
              sizes="(max-width: 1280px) 100vw, 1280px"
              className="object-cover"
            />
            {/* Затемнение под текст — лёгкое, не «тяжёлый тёмный фон» (Frontend.md, 4.1). */}
            <div className="absolute inset-0 bg-brand-800/30" />
            <div className="absolute inset-0 flex flex-col justify-end gap-2 p-6 text-white md:p-10">
              <h2 className="max-w-2xl text-2xl font-semibold md:text-4xl">{slide.title}</h2>
              <p className="max-w-xl text-sm text-white/90 md:text-base">{slide.subtitle}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Стрелки и точки — сдержанный стиль, без тяжёлой «карусельной» обвязки. */}
      <button
        type="button"
        onClick={() => goTo(current - 1)}
        aria-label="Предыдущий слайд"
        className="absolute left-3 top-1/2 inline-flex -translate-y-1/2 items-center justify-center rounded-xl bg-white/15 p-2 text-white transition-colors duration-200 ease-out hover:bg-white/25"
      >
        <ChevronLeft className="h-5 w-5" />
      </button>
      <button
        type="button"
        onClick={() => goTo(current + 1)}
        aria-label="Следующий слайд"
        className="absolute right-3 top-1/2 inline-flex -translate-y-1/2 items-center justify-center rounded-xl bg-white/15 p-2 text-white transition-colors duration-200 ease-out hover:bg-white/25"
      >
        <ChevronRight className="h-5 w-5" />
      </button>

      <div className="absolute inset-x-0 bottom-3 flex justify-center gap-2">
        {SLIDES.map((slide, index) => (
          <button
            key={slide.id}
            type="button"
            onClick={() => goTo(index)}
            aria-label={`Слайд ${index + 1}`}
            aria-current={index === current}
            className={`h-2 rounded-full transition-all duration-200 ease-out motion-reduce:transition-none ${
              index === current ? "w-6 bg-white" : "w-2 bg-white/50 hover:bg-white/75"
            }`}
          />
        ))}
      </div>
    </section>
  );
}
