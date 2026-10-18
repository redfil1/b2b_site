"use client";

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
      <ProductGrid products={viewed} />
    </section>
  );
}
