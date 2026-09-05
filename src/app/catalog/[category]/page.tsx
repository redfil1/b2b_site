import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ProductGrid } from "@/components/features/catalog/ProductGrid";
import {
  Breadcrumbs,
  buildBreadcrumbLd,
  type BreadcrumbItem,
} from "@/components/layout/Breadcrumbs";
import { BackToTopButton } from "@/components/ui/BackToTopButton";
import { Container } from "@/components/ui/Container";
import { JsonLd } from "@/components/ui/JsonLd";
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

  // ВРЕМЕННО (аудит 2026-09-05, см. docs/seo.md): товары категории — тестовые данные,
  // не реальная номенклатура поставщика. noindex снимается, когда каталог наполнится
  // реальными данными.
  if (!category) {
    return { title: "Категория не найдена", robots: { index: false } };
  }

  return {
    title: `${category.name} — Каталог`,
    description: category.description,
    // Относительный путь → metadataBase делает его абсолютным каноническим URL.
    alternates: { canonical: `/catalog/${category.slug}` },
    robots: { index: false },
  };
}

export default async function CategoryPage({ params }: PageProps<"/catalog/[category]">) {
  const { category: categorySlug } = await params;
  const category = getCategory(categorySlug);

  if (!category) {
    notFound();
  }

  const products = getProductsByCategory(category.slug);

  // Один и тот же список крошек — и для видимой навигации, и для JSON-LD BreadcrumbList
  // (SEO.md, раздел 8.2): Главная → Каталог → Название категории. href на последнем
  // элементе не делает его кликабельным в Breadcrumbs (компонент игнорирует href
  // последнего элемента), но нужен buildBreadcrumbLd для абсолютного URL текущей страницы.
  const breadcrumbItems: BreadcrumbItem[] = [
    { label: "Каталог", href: "/catalog" },
    { label: category.name, href: `/catalog/${category.slug}` },
  ];

  return (
    <Container as="main" className="py-10">
      <JsonLd data={buildBreadcrumbLd(breadcrumbItems)} />
      <Breadcrumbs items={breadcrumbItems} />
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

      {/* Кнопка "наверх" — отложенный пункт аудита (раздел D, Frontend.md 4.6): страница
          категории со списком товаров может быть длинной, кнопка появляется после
          прокрутки и скроллит наверх. fixed — не участвует в потоке, место в разметке
          не важно. */}
      <BackToTopButton />
    </Container>
  );
}
