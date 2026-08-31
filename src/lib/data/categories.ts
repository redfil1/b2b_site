import type { Category } from "@/types/category";

// Тестовые данные для проверки вёрстки — не согласованный с поставщиком список категорий.
// Реальный список фиксируется по мере поступления товаров (Product.md, раздел 5).
// image — тестовые PNG-заглушки в public/images/categories/ (светлая плашка с простой
// геометрической меткой, не настоящая иконка/фото); заменяются реальными файлами тем же путём.
const categories: Category[] = [
  {
    slug: "gas-analyzers",
    name: "Газоанализаторы",
    description:
      "Переносные и стационарные газоанализаторы для контроля состава воздуха и промышленной безопасности.",
    image: "/images/categories/gas-analyzers.png",
  },
  {
    slug: "kip",
    name: "КИП",
    description:
      "Контрольно-измерительные приборы: датчики давления, температуры, расходомеры и сопутствующая автоматика.",
    image: "/images/categories/kip.png",
  },
  {
    slug: "lab-equipment",
    name: "Лабораторное оборудование",
    description:
      "Приборы и оборудование для аналитических, испытательных и производственных лабораторий.",
    image: "/images/categories/lab-equipment.png",
  },
  {
    slug: "special-equipment",
    name: "Спецтехника",
    description: "Спецтехника и навесное оборудование для строительных и промышленных задач.",
    image: "/images/categories/special-equipment.png",
  },
];

export function getCategories(): Category[] {
  return categories;
}

export function getCategory(slug: string): Category | undefined {
  return categories.find((category) => category.slug === slug);
}
