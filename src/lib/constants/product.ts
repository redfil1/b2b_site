import type { BadgeVariant } from "@/components/ui/Badge";
import type { ProductAvailability } from "@/types/product";

// Сопоставление статуса товара цветовому варианту Badge — бизнес-смысл статуса живёт
// здесь (features-уровень), а не внутри components/ui/Badge (Frontend.md, раздел 4.4:
// Badge принимает готовый текст и вариант, сам не хардкодит статусы товара).
export const PRODUCT_AVAILABILITY_BADGE_VARIANT: Record<ProductAvailability, BadgeVariant> = {
  available: "success",
  unavailable: "danger",
};
