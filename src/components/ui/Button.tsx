import type { ButtonHTMLAttributes } from "react";

// Без бизнес-логики и без обращения к lib/data — только вёрстка/пропсы (Project_Structure.md).
// Варианты — по Frontend.md, раздел 4.4 (primary/outline/confirm; неиспользуемый secondary
// удалён по итогам аудита 2026-10-18, раздел 10).
export type ButtonVariant = "primary" | "outline" | "confirm";

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
}

// Скругление rounded-2xl (16px, Frontend.md, раздел 4.3), цвета — brand-800/brand-600.
// confirm — состояние кнопки после успешного действия: окончательное у "Добавлено"
// (AddToCartButton.tsx, Frontend.md 7.3) и временное у "Скопировано" (CartPageClient.tsx): accent-teal, тот же цвет, что уже означает "положительное" в
// проекте (Badge, вариант info — раздел 4.1), чтобы состояние визуально отличалось от
// обычного вида кнопки, а не только текстом.
const VARIANT_STYLES: Record<ButtonVariant, string> = {
  primary: "bg-brand-800 text-white hover:bg-brand-600",
  outline: "border border-brand-800 text-brand-800 hover:bg-brand-800/5",
  confirm: "border border-accent-teal bg-teal-50 text-accent-teal",
};

// Общий набор классов кнопки — вынесен, чтобы components/ui/LinkButton (ссылка,
// оформленная как кнопка — <button> внутри <a> невалиден по HTML) не дублировал
// эти классы, а переиспользовал те же варианты оформления.
export function buttonClassName(variant: ButtonVariant = "primary", className = "") {
  return `inline-flex items-center justify-center rounded-2xl px-5 py-2.5 text-base font-semibold transition-colors duration-200 ease-out disabled:cursor-not-allowed disabled:opacity-50 ${VARIANT_STYLES[variant]} ${className}`;
}

export function Button({ variant = "primary", className = "", ...props }: ButtonProps) {
  return <button className={buttonClassName(variant, className)} {...props} />;
}
