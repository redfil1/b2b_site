import type { Metadata } from "next";
import Link from "next/link";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { Card } from "@/components/ui/Card";
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

      <div className="mt-8 grid grid-cols-1 items-stretch gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {categories.map((category) => (
          <Link
            key={category.slug}
            href={`/catalog/${category.slug}`}
            className="block h-full rounded-2xl transition-transform duration-200 ease-out motion-safe:hover:scale-[1.02]"
          >
            <Card className="flex h-full flex-col gap-3">
              <h2 className="text-2xl font-semibold text-primary">{category.name}</h2>
              {category.description && <p className="text-secondary">{category.description}</p>}
            </Card>
          </Link>
        ))}
      </div>
    </main>
  );
}
