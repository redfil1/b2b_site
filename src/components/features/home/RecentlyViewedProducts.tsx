"use client";

import Image from "next/image";
import Link from "next/link";
import { ProductGrid } from "@/components/features/catalog/ProductGrid";
import { useRecentlyViewed } from "@/hooks/useRecentlyViewed";
import type { ProductCardData } from "@/types/product";

// Блок «Вы недавно смотрели» (Frontend.md, разделы 8.7, 10). Читает список из localStorage
// (useRecentlyViewed) и находит карточки в переданном серверной страницей списке products
// (getProductCards(), lib/data/products.ts), чтобы переиспользовать ту же карточку, что в
// сетке каталога (ProductGrid). Каталог сюда намеренно не импортируется: иначе он целиком,
// вместе со служебным missingData, попадал бы в клиентский бандл (Product.md, раздел 4).
// До гидратации список пуст (useSyncExternalStore, getServerSnapshot) — секция просто не
// появляется, расхождения серверной и клиентской разметки нет. Показывается на главной и
// на верхнем уровне /catalog.
export interface RecentlyViewedProductsProps {
  products: ProductCardData[];
}

export function RecentlyViewedProducts({ products }: RecentlyViewedProductsProps) {
  const { items } = useRecentlyViewed();

  const viewed = items
    .map((item) => products.find((product) => product.slug === item.slug))
    .filter((product): product is ProductCardData => Boolean(product));

  if (viewed.length === 0) {
    return null;
  }

  return (
    <section className="mt-6 flex flex-col gap-6">
      <h2 className="text-2xl font-semibold text-primary md:text-3xl">Вы недавно смотрели</h2>
      {/* На мобильном (<sm) — компактные строки вместо трёх карточек во всю ширину:
          те отодвигали «Категории каталога» на ~3 экрана (Frontend.md, раздел 11). С sm: —
          прежняя сетка ProductGrid. */}
      <ul className="flex flex-col divide-y divide-gray-200 rounded-2xl border border-gray-200 bg-white sm:hidden">
        {viewed.map((product) => (
          <li key={product.id}>
            <Link
              href={`/catalog/${product.category}/${product.slug}`}
              className="flex items-center gap-3 p-3"
            >
              <div className="relative h-14 w-14 shrink-0 overflow-hidden rounded-xl border border-gray-100 bg-white">
                {product.images && product.images.length > 0 && (
                  <Image
                    src={product.images[0]}
                    alt={product.title}
                    fill
                    sizes="56px"
                    className="object-contain p-1"
                  />
                )}
              </div>
              <div className="min-w-0">
                <p className="line-clamp-2 text-sm font-semibold text-primary">{product.title}</p>
                {product.model && (
                  <p className="truncate text-sm text-secondary">Модель: {product.model}</p>
                )}
              </div>
            </Link>
          </li>
        ))}
      </ul>
      <div className="hidden sm:block">
        <ProductGrid products={viewed} />
      </div>
    </section>
  );
}
