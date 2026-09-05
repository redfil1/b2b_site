import type { Category } from "@/types/category";

// Тестовые данные для проверки вёрстки — не согласованный с поставщиком список категорий.
// Реальный список фиксируется по мере поступления товаров (Product.md, раздел 5).
// image не заполняется: раньше здесь были PNG-заглушки с геометрической фигурой, сейчас
// вместо них на плитках категорий временная line-иконка (components/features/catalog/
// CategoryIcon.tsx, см. Frontend.md, раздел 4.3.1) — схематичная замена фото категории
// до появления реальных данных. Поле остаётся в типе для будущих настоящих фото; когда
// они появятся, заполнить его тем же путём (public/images/categories/), тогда вёрстка
// плитки возвращается на next/image (Category.image).
const categories: Category[] = [
  {
    slug: "gas-analyzers",
    name: "Газоанализаторы",
    description:
      "Переносные и стационарные газоанализаторы для контроля состава воздуха и промышленной безопасности.",
  },
  {
    slug: "kip",
    name: "КИП",
    description:
      "Контрольно-измерительные приборы: датчики давления, температуры, расходомеры и сопутствующая автоматика.",
  },
  {
    slug: "lab-equipment",
    name: "Лабораторное оборудование",
    description:
      "Приборы и оборудование для аналитических, испытательных и производственных лабораторий.",
  },
  {
    slug: "special-equipment",
    name: "Спецтехника",
    description: "Спецтехника и навесное оборудование для строительных и промышленных задач.",
  },
];

export function getCategories(): Category[] {
  return categories;
}

export function getCategory(slug: string): Category | undefined {
  return categories.find((category) => category.slug === slug);
}
