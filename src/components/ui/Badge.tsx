import type { HTMLAttributes } from "react";

// Без бизнес-логики и без обращения к lib/data — только вёрстка/пропсы (Project_Structure.md).
// Универсальный компонент: принимает готовый текст (label) и цветовой вариант пропсами,
// сам не хардкодит конкретные статусы товара — подстановка реальных подписей
// (PRODUCT_AVAILABILITY_LABELS из types/product.ts) остаётся за components/features/*.
export type BadgeVariant = "neutral" | "success" | "warning" | "danger";

export interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  label: string;
  variant?: BadgeVariant;
}

// success/warning/danger — временные семантические цвета статуса (Frontend.md, раздел 4.1:
// в брифе не описаны, оставлены стандартные emerald-600/amber-600/red-600).
const VARIANT_STYLES: Record<BadgeVariant, string> = {
  neutral: "bg-secondary text-secondary",
  success: "bg-emerald-50 text-emerald-600",
  warning: "bg-amber-50 text-amber-600",
  danger: "bg-red-50 text-red-600",
};

export function Badge({ label, variant = "neutral", className = "", ...props }: BadgeProps) {
  return (
    <span
      className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-medium ${VARIANT_STYLES[variant]} ${className}`}
      {...props}
    >
      {label}
    </span>
  );
}
