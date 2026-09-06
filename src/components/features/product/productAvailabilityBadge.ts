import type { BadgeVariant } from "@/components/ui/Badge";
import type { ProductAvailability } from "@/types/product";

// Сопоставление статуса товара цветовому варианту Badge — бизнес-смысл статуса живёт
// на уровне features, где и так пересекаются данные товара и UI (Frontend.md, раздел
// 4.4: Badge принимает готовый текст и вариант, сам не хардкодит статусы товара).
// Раньше жил в lib/constants/product.ts, но lib не должен зависеть от components/ui —
// перенесено сюда, чтобы направление зависимостей не нарушалось.
// available → info (accent-teal, дизайн-ревью 2026-09-06: success/emerald ложно читался
// как "в наличии прямо сейчас"); unavailable не менялся — остаётся danger.
export const PRODUCT_AVAILABILITY_BADGE_VARIANT: Record<ProductAvailability, BadgeVariant> = {
  available: "info",
  unavailable: "danger",
};
