import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Breadcrumbs, type BreadcrumbItem } from "@/components/layout/Breadcrumbs";
import { Badge } from "@/components/ui/Badge";
import { ProductGallery } from "@/components/features/product/ProductGallery";
import { ProductSpecsTable } from "@/components/features/product/ProductSpecsTable";
import { ProductTabs } from "@/components/features/product/ProductTabs";
import { PRODUCT_AVAILABILITY_BADGE_VARIANT } from "@/lib/constants/product";
import { getCategory } from "@/lib/data/categories";
import { getManufacturer } from "@/lib/data/manufacturers";
import { getProduct } from "@/lib/data/products";
import { PRODUCT_AVAILABILITY_LABELS } from "@/types/product";

export async function generateMetadata({
  params,
}: PageProps<"/catalog/[category]/[slug]">): Promise<Metadata> {
  const { category: categorySlug, slug } = await params;
  const product = getProduct(categorySlug, slug);

  if (!product) {
    return { title: "Товар не найден" };
  }

  return {
    title: `${product.title} — Каталог`,
    description: product.description,
  };
}

export default async function ProductPage({ params }: PageProps<"/catalog/[category]/[slug]">) {
  const { category: categorySlug, slug } = await params;
  const product = getProduct(categorySlug, slug);

  if (!product) {
    notFound();
  }

  const category = getCategory(product.category);
  const manufacturer = product.manufacturer ? getManufacturer(product.manufacturer) : undefined;
  const documents = product.documents ?? [];
  const hasDocuments = documents.length > 0;

  const breadcrumbItems: BreadcrumbItem[] = [{ label: "Каталог", href: "/catalog" }];
  if (category) {
    breadcrumbItems.push({ label: category.name, href: `/catalog/${category.slug}` });
  }
  breadcrumbItems.push({ label: product.title });

  return (
    <main className="mx-auto max-w-7xl px-4 py-10 md:px-6 lg:px-8">
      <Breadcrumbs items={breadcrumbItems} />

      {/* Раскладка карточки товара — Frontend.md, раздел 4.3.2: lg:grid-cols-[3fr_2fr],
          галерея слева, информационный блок справа; на мобильном — одна колонка. */}
      <div className="mt-6 grid grid-cols-1 gap-8 lg:grid-cols-[3fr_2fr]">
        <ProductGallery title={product.title} images={product.images} />

        <div className="flex flex-col gap-4">
          <Badge
            label={PRODUCT_AVAILABILITY_LABELS[product.availability]}
            variant={PRODUCT_AVAILABILITY_BADGE_VARIANT[product.availability]}
            className="self-start"
          />
          <h1 className="text-3xl font-semibold text-primary md:text-4xl">{product.title}</h1>

          <dl className="grid grid-cols-[auto_1fr] gap-x-3 gap-y-1.5 text-sm">
            {manufacturer && (
              <>
                <dt className="text-secondary">Производитель</dt>
                <dd className="text-primary">{manufacturer.name}</dd>
              </>
            )}
            {product.model && (
              <>
                <dt className="text-secondary">Модель</dt>
                <dd className="text-primary">{product.model}</dd>
              </>
            )}
            {product.country && (
              <>
                <dt className="text-secondary">Страна происхождения</dt>
                <dd className="text-primary">{product.country}</dd>
              </>
            )}
            {product.sku && (
              <>
                <dt className="text-secondary">Артикул</dt>
                <dd className="text-primary">{product.sku}</dd>
              </>
            )}
            <dt className="text-secondary">Срок поставки</dt>
            <dd className="text-primary">{product.deliveryTime}</dd>
          </dl>

          {/* Формы заявки на сайте нет (юридическое решение, см. docs/architecture.md).
              CTA — ссылка на /contacts, где телефон/email менеджера; сбора данных нет. */}
          <div className="mt-2 flex flex-wrap gap-3">
            <Link
              href="/contacts"
              className="inline-flex items-center justify-center rounded-2xl bg-brand-800 px-5 py-2.5 text-base font-semibold text-white transition-colors duration-200 ease-out hover:bg-brand-600"
            >
              Связаться с менеджером
            </Link>
            {/* Отдельная ссылка на каждый документ: при нескольких файлах одна кнопка
                на documents[0] прятала бы остальные. Для единственного документа —
                прежняя подпись «Скачать PDF», иначе подписываем ссылки их названиями. */}
            {documents.map((doc) => (
              <a
                key={doc.url}
                href={doc.url}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center justify-center rounded-2xl border border-brand-800 px-5 py-2.5 text-base font-semibold text-brand-800 transition-colors duration-200 ease-out hover:bg-brand-800/5"
              >
                {documents.length > 1 ? doc.title : "Скачать PDF"}
              </a>
            ))}
          </div>
        </div>
      </div>

      <div className="mt-12">
        <ProductTabs
          tabs={[
            {
              id: "description",
              label: "Описание",
              content: <p className="max-w-3xl text-primary">{product.description}</p>,
            },
            {
              id: "specs",
              label: "Характеристики",
              content: <ProductSpecsTable specs={product.specs} />,
            },
            {
              id: "package",
              label: "Комплектация",
              content:
                product.package && product.package.length > 0 ? (
                  <ul className="list-disc space-y-1 pl-5 text-primary">
                    {product.package.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                ) : (
                  <p className="text-secondary">Информация о комплектации уточняется.</p>
                ),
            },
            {
              id: "documents",
              label: "Документы",
              content: hasDocuments ? (
                <ul className="space-y-2">
                  {documents.map((doc) => (
                    <li key={doc.url}>
                      <a
                        href={doc.url}
                        target="_blank"
                        rel="noreferrer"
                        className="text-brand-800 underline underline-offset-2 transition-colors duration-200 ease-out hover:text-brand-600"
                      >
                        {doc.title}
                      </a>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-secondary">Документов пока нет.</p>
              ),
            },
          ]}
        />
      </div>
    </main>
  );
}
