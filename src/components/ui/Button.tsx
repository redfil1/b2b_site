import type { ButtonHTMLAttributes } from "react";

// Без бизнес-логики и без обращения к lib/data — только вёрстка/пропсы (Project_Structure.md).
// Варианты — по Frontend.md, раздел 4.4 (Button: primary/secondary/outline).
export type ButtonVariant = "primary" | "secondary" | "outline";

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
}

// Скругление rounded-2xl (16px, Frontend.md, раздел 4.3), цвета — brand-800/brand-600.
const VARIANT_STYLES: Record<ButtonVariant, string> = {
  primary: "bg-brand-800 text-white hover:bg-brand-600",
  secondary: "bg-secondary text-primary hover:bg-brand-800/5",
  outline: "border border-brand-800 text-brand-800 hover:bg-brand-800/5",
};

export function Button({ variant = "primary", className = "", ...props }: ButtonProps) {
  return (
    <button
      className={`inline-flex items-center justify-center rounded-2xl px-5 py-2.5 text-base font-semibold transition-colors duration-200 ease-out disabled:cursor-not-allowed disabled:opacity-50 ${VARIANT_STYLES[variant]} ${className}`}
      {...props}
    />
  );
}
