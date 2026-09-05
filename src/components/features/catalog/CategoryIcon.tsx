import type { ComponentType, ReactElement, SVGProps } from "react";

// Простые однотонные line-иконки категорий — временная схематичная замена фото категорий,
// пока каталог не наполнен реальными данными от поставщика (Product.md, раздел 5; см. также
// пометку в Frontend.md, раздел 4.3.1). Ручные SVG-пути, а не иконочная библиотека: под
// четыре конкретные категории компонентов из lucide-react (используется для остальных иконок
// сайта, Frontend.md 4.5) нет, а заводить второй набор иконок только ради четырёх штук —
// не оправдано, поэтому здесь сознательное отступление от «единого стиля без смешивания
// icon-сетов» (зафиксировано в Frontend.md, раздел 4.5).
//
// stroke="currentColor" — каждая иконка одноцветная линия без заливки, конкретный цвет
// приходит через text-* класс на обёртке (см. CategoryIcon ниже), не хардкожен внутри.
const ICON_PROPS = {
  viewBox: "0 0 48 48",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 2.2,
  strokeLinecap: "round",
  strokeLinejoin: "round",
} as const;

/** Газоанализаторы — переносной детектор газа с «волнами» обнаружения. */
export function GasAnalyzerIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg {...ICON_PROPS} {...props}>
      <rect x="14" y="20" width="18" height="24" rx="3" />
      <rect x="18" y="25" width="10" height="7" rx="1" />
      <circle cx="23" cy="38" r="1.8" fill="currentColor" stroke="none" />
      <path d="M28 16c1.5-2 4-2 5.5 0" />
      <path d="M31 11c2-2.6 6-2.6 8 0" />
      <path d="M34 6c2.5-3 7-3 9.5 0" />
    </svg>
  );
}

/** КИП — циферблат измерительного прибора со стрелкой и делениями шкалы. */
export function GaugeIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg {...ICON_PROPS} {...props}>
      <circle cx="24" cy="26" r="14" />
      <path d="M24 26 31 17" />
      <circle cx="24" cy="26" r="1.6" fill="currentColor" stroke="none" />
      <path d="M16.5 16.5l1.8 1.8M31.5 16.5l-1.8 1.8M10 26h3M35 26h3M13.5 35.5l1.8-1.8M34.5 35.5l-1.8-1.8" />
    </svg>
  );
}

/** Лабораторное оборудование — колба с уровнем жидкости и пузырьками. */
export function FlaskIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg {...ICON_PROPS} {...props}>
      <path d="M20 8h8" />
      <path d="M22 8v10l-9 18a3 3 0 0 0 3 4h16a3 3 0 0 0 3-4l-9-18V8" />
      <path d="M16 30h16" />
      <circle cx="20" cy="35" r="1" fill="currentColor" stroke="none" />
      <circle cx="27" cy="37" r="1.3" fill="currentColor" stroke="none" />
    </svg>
  );
}

/** Спецтехника — гусеничная база, кабина и стрела с ковшом. */
export function ExcavatorIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg {...ICON_PROPS} {...props}>
      <rect x="4" y="36" width="28" height="6" rx="3" />
      <path d="M11 36V24a4 4 0 0 1 4-4h9v16" />
      <path d="M22 20 36 10" />
      <path d="M36 10 44 22" />
      <path d="M44 22 40 29 33 27" />
    </svg>
  );
}

// Цвет каждой иконки — из расширенной палитры (Frontend.md, раздел 4.1, аудит 2026-09-05):
// разные цвета на разных плитках вместо одного оттенка brand на всех.
const CATEGORY_ICONS: Record<string, ComponentType<SVGProps<SVGSVGElement>>> = {
  "gas-analyzers": GasAnalyzerIcon,
  kip: GaugeIcon,
  "lab-equipment": FlaskIcon,
  "special-equipment": ExcavatorIcon,
};

const CATEGORY_ICON_COLORS: Record<string, string> = {
  "gas-analyzers": "text-accent-teal",
  kip: "text-accent-amber",
  "lab-equipment": "text-brand-800",
  "special-equipment": "text-brand-600",
};

export interface CategoryIconProps extends SVGProps<SVGSVGElement> {
  slug: string;
}

export function CategoryIcon({ slug, className = "", ...props }: CategoryIconProps): ReactElement {
  // Список категорий пока не зафиксирован окончательно (Architecture.md, открытые
  // вопросы) — на случай будущего slug без своей иконки берём нейтральный дефолт вместо
  // падения вёрстки.
  const Icon = CATEGORY_ICONS[slug] ?? GaugeIcon;
  const color = CATEGORY_ICON_COLORS[slug] ?? "text-brand-800";
  return <Icon className={`${color} ${className}`} {...props} />;
}
