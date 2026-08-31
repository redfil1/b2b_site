import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { getCategories } from "@/lib/data/categories";

export const metadata: Metadata = {
  title: "Каталог — B2B-магазин промышленного оборудования",
  description: "Категории промышленного и специализированного оборудования под заказ.",
};

export default function CatalogPage() {
  const categories = getCategories();

  return (
    <main className="mx-auto max-w-7xl px-4 py-10 md:px-6 lg:px-8">
      <Breadcrumbs items={[{ label: "Каталог" }]} />
      <h1 className="mt-4 text-4xl font-semibold text-primary md:text-5xl">Каталог</h1>

      {/* Плитки категорий — по образцу «Shop by category»: квадратная картинка сверху,
          название и описание снизу. Не через ui/Card, т.к. картинка идёт в край плитки
          (без внутренних отступов Card). image — тестовые PNG-заглушки, рендер через
          next/image; настоящие иконки/фото кладутся тем же путём (Category.image). */}
      <div className="mt-8 grid grid-cols-1 items-stretch gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {categories.map((category) => (
          <Link
            key={category.slug}
            href={`/catalog/${category.slug}`}
            className="flex h-full flex-col overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm transition-transform duration-200 ease-out motion-safe:hover:scale-[1.02]"
          >
            {category.image && (
              <div className="relative aspect-square w-full bg-secondary">
                <Image
                  src={category.image}
                  alt=""
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                  className="object-cover"
                />
              </div>
            )}
            <div className="flex flex-1 flex-col gap-3 p-6">
              <h2 className="text-2xl font-semibold text-primary">{category.name}</h2>
              {category.description && <p className="text-secondary">{category.description}</p>}
            </div>
          </Link>
        ))}
      </div>
    </main>
  );
}
