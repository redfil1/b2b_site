import { Clock } from "lucide-react";
import Link from "next/link";
import { Badge } from "@/components/ui/Badge";
import { CategoryIcon } from "@/components/features/catalog/CategoryIcon";
import { PRODUCT_AVAILABILITY_BADGE_VARIANT } from "@/components/features/product/productAvailabilityBadge";
import type { Product } from "@/types/product";
import { PRODUCT_AVAILABILITY_LABELS } from "@/types/product";

// Сетка карточек товара — Frontend.md, раздел 4.3.1: grid-cols-1 → sm:2 → lg:3 → xl:4,
// все карточки одинаковой высоты (items-stretch + h-full на карточке).
export interface ProductGridProps {
  products: Product[];
}

export function ProductGrid({ products }: ProductGridProps) {
  return (
    <div className="grid grid-cols-1 items-stretch gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {products.map((product) => (
        <Link
          key={product.id}
          href={`/catalog/${product.category}/${product.slug}`}
          // Не через ui/Card (у него фиксированный p-6) — верхний блок с иконкой идёт
          // в край карточки, как у плиток категорий (CategoryPage/главная,
          // Frontend.md, раздел 4.3.1). Единый визуальный якорь для отсутствующих
          // фото товара: та же line-иконка категории, что уже используется на
          // главной/странице категории, вместо голого текста без иконки.
          className="flex h-full flex-col overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm transition-transform duration-200 ease-out motion-safe:hover:scale-[1.02]"
        >
          {/* aspect-[2/1] на мобильном (было [4/3] на всех ширинах) — при карточке во
              всю ширину экрана иконочная область-плейсхолдер занимала ~260px и делала
              список очень длинным (скрины реального телефона, 2026-09-07). С sm: карточка
              в 2+ колонки — прежние пропорции. */}
          <div className="flex aspect-[2/1] w-full items-center justify-center bg-secondary sm:aspect-[4/3]">
            <CategoryIcon slug={product.category} aria-hidden="true" className="h-16 w-16" />
          </div>
          <div className="flex flex-1 flex-col gap-3 p-6">
            <Badge
              label={PRODUCT_AVAILABILITY_LABELS[product.availability]}
              variant={PRODUCT_AVAILABILITY_BADGE_VARIANT[product.availability]}
              className="self-start"
            />
            <h3 className="text-xl font-semibold text-primary">{product.title}</h3>
            {product.model && <p className="text-sm text-secondary">Модель: {product.model}</p>}
            <p className="line-clamp-3 text-secondary">{product.description}</p>
            {/* Срок поставки отдельной строкой, не только в бейдже наличия (Frontend.md,
                раздел 8.5): бейдж «Под заказ» одинаков почти у всех позиций, а срок —
                то, по чему реально сканируют список. mt-auto прижимает строку к низу
                карточки, чтобы она была на одной линии у всех карточек ряда. */}
            <p className="mt-auto flex items-center gap-1.5 pt-1 text-sm text-secondary">
              <Clock aria-hidden="true" className="h-4 w-4 shrink-0" />
              Срок поставки: {product.deliveryTime}
            </p>
          </div>
        </Link>
      ))}
    </div>
  );
}
