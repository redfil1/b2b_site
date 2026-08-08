import Link from "next/link";
import { Card } from "@/components/ui/Card";
import { ProductGrid } from "@/components/features/catalog/ProductGrid";
import { getCategories } from "@/lib/data/categories";
import { getProducts } from "@/lib/data/products";

export default function Home() {
  const categories = getCategories();
  const featuredProducts = getProducts().filter((product) => product.featured);

  return (
    <main className="mx-auto max-w-7xl px-4 py-10 md:px-6 lg:px-8">
      {/* Hero — заголовок и краткое УТП. Факты — из CLAUDE.md (описание проекта),
          без маркетинговых обещаний, которых нет в доках. */}
      <section className="flex flex-col gap-4 py-6 md:py-10">
        <h1 className="max-w-3xl text-4xl font-semibold text-primary md:text-5xl">
          B2B-магазин промышленного оборудования
        </h1>
        <p className="max-w-2xl text-secondary md:text-lg">
          Поставляем газоанализаторы, КИП, лабораторное оборудование и спецтехнику под заказ из
          Китая. Склада в РФ нет — каждая позиция оформляется по заявке.
        </p>
      </section>

      {/* Обзор категорий каталога — Architecture.md, раздел "Структура страниц":
          категория обязательна у товара, здесь — вход в каталог по категориям. */}
      <section className="mt-6 flex flex-col gap-6">
        <h2 className="text-2xl font-semibold text-primary md:text-3xl">Категории каталога</h2>
        <div className="grid grid-cols-1 items-stretch gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {categories.map((category) => (
            <Link
              key={category.slug}
              href={`/catalog/${category.slug}`}
              className="block h-full rounded-2xl transition-transform duration-200 ease-out motion-safe:hover:scale-[1.02]"
            >
              <Card className="flex h-full flex-col gap-3">
                <h3 className="text-xl font-semibold text-primary">{category.name}</h3>
                {category.description && <p className="text-secondary">{category.description}</p>}
              </Card>
            </Link>
          ))}
        </div>
      </section>

      {/* Популярные товары — ручной флаг featured (Product.md, раздел 2.4), не вычисляется.
          Переиспользует ProductGrid из каталога — та же вёрстка карточки товара. */}
      {featuredProducts.length > 0 && (
        <section className="mt-16 flex flex-col gap-6">
          <h2 className="text-2xl font-semibold text-primary md:text-3xl">Популярные товары</h2>
          <ProductGrid products={featuredProducts} />
        </section>
      )}
    </main>
  );
}
