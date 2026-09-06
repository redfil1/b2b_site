"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";
import { useCallback, useEffect, useState } from "react";
import type { SVGProps } from "react";
import {
  ExcavatorIcon,
  FlaskIcon,
  GasAnalyzerIcon,
  GaugeIcon,
} from "@/components/features/catalog/CategoryIcon";

// Слайдер главной — Frontend.md, раздел 4.3.4. Раньше картинки были тестовыми PNG-
// заглушками (сплошная плашка бренда, public/images/hero/) — по итогам аудита 2026-09-05
// заменены на крупные схематичные SVG-иллюстрации в том же line-стиле, что иконки
// категорий (components/features/catalog/CategoryIcon.tsx), т.к. реальных фотографий
// оборудования ещё нет (Product.md, раздел 5). Illustration — компонент, а не путь к
// файлу: подложка-цвет (tone) остаётся, поверх неё — полупрозрачная белая иллюстрация,
// чтобы не терять контраст с белым текстом слайда. Анимация — только fade через Tailwind
// transition, без библиотек (раздел 4.3.3); при prefers-reduced-motion автопрокрутка
// отключается, остаётся ручное переключение.
const SLIDES = [
  {
    id: "equipment",
    Illustration: EquipmentIllustration,
    title: "Промышленное и лабораторное оборудование",
    subtitle: "Газоанализаторы, КИП, лабораторные приборы и спецтехника под заказ из Китая",
    tone: "bg-brand-800",
  },
  {
    id: "delivery",
    Illustration: DeliveryIllustration,
    title: "Поставка под заказ",
    subtitle: "Склада в РФ нет — каждая позиция подбирается под конкретную задачу",
    tone: "bg-brand-600",
  },
  {
    id: "support",
    Illustration: SupportIllustration,
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
    // Зависимость от current: интервал пересоздаётся при каждой смене слайда — как
    // автоматической, так и ручной (goTo из стрелки/точки). Без этого остаток текущего
    // тика мог сменить слайд почти сразу после ручного клика.
    const timer = window.setInterval(() => {
      setCurrent((index) => (index + 1) % SLIDES.length);
    }, AUTOPLAY_MS);
    return () => window.clearInterval(timer);
  }, [current]);

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
            {/* Иллюстрация декоративна (сопровождает текст, не несёт своей информации) —
                aria-hidden, низкая непрозрачность, чтобы не спорить по контрасту с белым
                текстом слайда. Текст на слайде прижат к низу (justify-end), поэтому на
                мобильной ширине иллюстрация переезжает в верхний правый угол — заметно
                меньше и без отрицательных смещений (right-2/top-2 вместо -right-6/-bottom-10),
                чтобы помещаться в узкий (16:9) слайд целиком и не перекрывать текст внизу;
                max-w ограничивает самую широкую иллюстрацию (EquipmentIllustration), чтобы
                она не растягивалась почти на всю ширину слайда. С sm: — прежние размер и
                положение (нижний правый угол, крупнее). */}
            <slide.Illustration
              aria-hidden="true"
              className="pointer-events-none absolute top-2 right-2 h-[38%] w-auto max-w-[55%] text-white/20 sm:top-auto sm:-bottom-10 sm:right-4 sm:h-[95%] sm:max-w-none"
            />
            {/* Затемнение под текст — лёгкое, не «тяжёлый тёмный фон» (Frontend.md, 4.1). */}
            <div className="absolute inset-0 bg-brand-800/30" />
            <div className="absolute inset-0 flex flex-col justify-end gap-2 p-6 text-white md:p-10">
              {/* Не заголовок: это баннерная подпись слайдера, а не структура документа.
                  h1 страницы идёт ниже по DOM — держим слайдер вне иерархии заголовков. */}
              <p className="max-w-2xl text-2xl font-semibold md:text-4xl">{slide.title}</p>
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

// Общие атрибуты иллюстраций слайдов — та же логика, что у ICON_PROPS в CategoryIcon.tsx:
// однотонная линия без заливки, конкретный цвет и прозрачность приходят через className
// на вызывающей стороне (text-white/20 на самом <slide.Illustration>, см. выше).
const ILLUSTRATION_PROPS = {
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 2,
  strokeLinecap: "round",
  strokeLinejoin: "round",
} as const;

/**
 * Слайд «Оборудование» — переиспользует иконки категорий каталога (та же
 * иконография, что на плитках /catalog), только крупнее и в одном приглушённом
 * цвете: подборка ровно тех четырёх направлений, что перечислены в подписи слайда.
 */
function EquipmentIllustration(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 216 56" fill="none" {...props}>
      <GasAnalyzerIcon x={4} y={5} width={46} height={46} strokeWidth={2} />
      <GaugeIcon x={58} y={5} width={46} height={46} strokeWidth={2} />
      <FlaskIcon x={112} y={5} width={46} height={46} strokeWidth={2} />
      <ExcavatorIcon x={166} y={5} width={46} height={46} strokeWidth={2} />
    </svg>
  );
}

/** Слайд «Поставка под заказ» — грузовик с линиями движения позади. */
function DeliveryIllustration(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 90 56" {...ILLUSTRATION_PROPS} {...props}>
      <path d="M8 49h76" />
      <rect x="8" y="18" width="44" height="22" rx="2" />
      <path d="M52 40V26h10l10 10v4z" />
      <circle cx="20" cy="44" r="5" />
      <circle cx="64" cy="44" r="5" />
      <path d="M0 24h8M0 30h10M0 36h6" />
    </svg>
  );
}

/** Слайд «Сопровождение менеджером» — согласованное КП: чек-лист с отметкой. */
function SupportIllustration(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 60 60" {...ILLUSTRATION_PROPS} {...props}>
      <rect x="12" y="10" width="36" height="44" rx="4" />
      <rect x="22" y="6" width="16" height="8" rx="2" />
      <path d="M18 24h20M18 32h20M18 40h12" />
      <circle cx="44" cy="46" r="9" />
      <path d="M40 46l3 3 6-7" />
    </svg>
  );
}
