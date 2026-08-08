import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { ProductGrid } from "@/components/features/catalog/ProductGrid";
import { getCategory } from "@/lib/data/categories";
import { getProductsByCategory } from "@/lib/data/products";

export async function generateMetadata({
  params,
}: PageProps<"/catalog/[category]">): Promise<Metadata> {
  const { category: categorySlug } = await params;
  const category = getCategory(categorySlug);

  if (!category) {
    return { title: "Категория не найдена" };
  }

  return {
    title: `${category.name} — Каталог`,
    description: category.description,
  };
}

export default async function CategoryPage({ params }: PageProps<"/catalog/[category]">) {
  const { category: categorySlug } = await params;
  const category = getCategory(categorySlug);

  if (!category) {
    notFound();
  }

  const products = getProductsByCategory(category.slug);

  return (
    <main className="mx-auto max-w-7xl px-4 py-10 md:px-6 lg:px-8">
      <Breadcrumbs items={[{ label: "Каталог", href: "/catalog" }, { label: category.name }]} />
      <h1 className="mt-4 text-4xl font-semibold text-primary md:text-5xl">{category.name}</h1>
      {category.description && (
        <p className="mt-2 max-w-2xl text-secondary">{category.description}</p>
      )}

      {/* CategoryFilters — открытый вопрос (Frontend.md, раздел 5), пока не реализован. */}

      {products.length > 0 ? (
        <div className="mt-8">
          <ProductGrid products={products} />
        </div>
      ) : (
        <p className="mt-8 text-secondary">Товары в этой категории появятся позже.</p>
      )}
    </main>
  );
}
