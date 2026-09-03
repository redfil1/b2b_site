import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ProductGrid } from "@/components/features/catalog/ProductGrid";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { Container } from "@/components/ui/Container";
import { JsonLd } from "@/components/ui/JsonLd";
import { siteConfig } from "@/config/site";
import { getCategories, getCategory } from "@/lib/data/categories";
import { getProductsByCategory } from "@/lib/data/products";

// Полный список категорий из локальных данных — все страницы категорий
// пререндерятся в статику (SEO.md, раздел 5). Неизвестный slug и так уходит
// в notFound() ниже.
export function generateStaticParams() {
  return getCategories().map((category) => ({ category: category.slug }));
}

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
    // Относительный путь → metadataBase делает его абсолютным каноническим URL.
    alternates: { canonical: `/catalog/${category.slug}` },
  };
}

export default async function CategoryPage({ params }: PageProps<"/catalog/[category]">) {
  const { category: categorySlug } = await params;
  const category = getCategory(categorySlug);

  if (!category) {
    notFound();
  }

  const products = getProductsByCategory(category.slug);

  // BreadcrumbList повторяет видимые хлебные крошки (SEO.md, раздел 8.2):
  // Главная → Каталог → Название категории; item каждого уровня — абсолютный URL.
  const breadcrumbLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Главная",
        item: new URL("/", siteConfig.url).toString(),
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Каталог",
        item: new URL("/catalog", siteConfig.url).toString(),
      },
      {
        "@type": "ListItem",
        position: 3,
        name: category.name,
        item: new URL(`/catalog/${category.slug}`, siteConfig.url).toString(),
      },
    ],
  };

  return (
    <Container as="main" className="py-10">
      <JsonLd data={breadcrumbLd} />
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
    </Container>
  );
}
