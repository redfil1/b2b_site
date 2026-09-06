"use client";

import { ProductGrid } from "@/components/features/catalog/ProductGrid";
import { useRecentlyViewed } from "@/hooks/useRecentlyViewed";
import { getProductBySlug } from "@/lib/data/products";

// Блок «Вы недавно смотрели» (Frontend.md, раздел 8.7). Читает список из localStorage
// (useRecentlyViewed) и восстанавливает полные Product из локальных данных каталога,
// чтобы переиспользовать ту же карточку, что в сетке каталога (ProductGrid), а не
// заводить отдельную вёрстку. Каталог — локальные данные без сервера и без сетевого слоя
// (Architecture.md, п.1), поэтому обращение к нему из клиентского компонента допустимо.
// До гидратации список пуст (useSyncExternalStore, getServerSnapshot) — секция просто не
// появляется, расхождения серверной и клиентской разметки нет. Показывается на главной и
// на верхнем уровне /catalog.
export function RecentlyViewedProducts() {
  const { items } = useRecentlyViewed();

  const products = items
    .map((item) => getProductBySlug(item.slug))
    .filter((product): product is NonNullable<typeof product> => Boolean(product));

  if (products.length === 0) {
    return null;
  }

  return (
    <section className="mt-6 flex flex-col gap-6">
      <h2 className="text-2xl font-semibold text-primary md:text-3xl">Вы недавно смотрели</h2>
      <ProductGrid products={products} />
    </section>
  );
}
