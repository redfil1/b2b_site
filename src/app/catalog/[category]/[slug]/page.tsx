import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  Breadcrumbs,
  buildBreadcrumbLd,
  type BreadcrumbItem,
} from "@/components/layout/Breadcrumbs";
import { Badge } from "@/components/ui/Badge";
import { Container } from "@/components/ui/Container";
import { JsonLd } from "@/components/ui/JsonLd";
import { ProductGallery } from "@/components/features/product/ProductGallery";
import { ProductQuantityAddToCart } from "@/components/features/product/ProductQuantityAddToCart";
import { RecentlyViewedTracker } from "@/components/features/product/RecentlyViewedTracker";
import { ProductSpecsTable } from "@/components/features/product/ProductSpecsTable";
import { ProductTabs } from "@/components/features/product/ProductTabs";
import { siteConfig } from "@/config/site";
import { PRODUCT_AVAILABILITY_BADGE_VARIANT } from "@/components/features/product/productAvailabilityBadge";
import { getCategory } from "@/lib/data/categories";
import { getManufacturer } from "@/lib/data/manufacturers";
import { getProduct, getProducts } from "@/lib/data/products";
import { PRODUCT_AVAILABILITY_LABELS, PRODUCT_CONTACT_CTA_LABELS } from "@/types/product";

// Полный список товаров из локальных данных — все карточки пререндерятся в
// статику (SEO.md, раздел 5). Неизвестный путь уходит в notFound() ниже.
export function generateStaticParams() {
  return getProducts().map((product) => ({
    category: product.category,
    slug: product.slug,
  }));
}

export async function generateMetadata({
  params,
}: PageProps<"/catalog/[category]/[slug]">): Promise<Metadata> {
  const { category: categorySlug, slug } = await params;
  const product = getProduct(categorySlug, slug);

  // ВРЕМЕННО (аудит 2026-09-05, см. docs/seo.md): карточки — тестовые данные, не
  // реальная номенклатура поставщика. noindex снимается, когда каталог наполнится
  // реальными данными.
  if (!product) {
    return { title: "Товар не найден", robots: { index: false } };
  }

  return {
    title: `${product.title} — Каталог`,
    description: product.description,
    // Относительный путь → metadataBase делает его абсолютным каноническим URL.
    alternates: { canonical: `/catalog/${product.category}/${product.slug}` },
    robots: { index: false },
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

  // Один и тот же список крошек — и для видимой навигации, и для JSON-LD BreadcrumbList
  // (SEO.md, раздел 8.2): Главная → Каталог → Категория → Товар. href на последнем
  // элементе не делает его кликабельным в Breadcrumbs (компонент игнорирует href
  // последнего элемента), но нужен buildBreadcrumbLd для абсолютного URL текущей страницы.
  const breadcrumbItems: BreadcrumbItem[] = [{ label: "Каталог", href: "/catalog" }];
  if (category) {
    breadcrumbItems.push({ label: category.name, href: `/catalog/${category.slug}` });
  }
  breadcrumbItems.push({
    label: product.title,
    href: `/catalog/${product.category}/${product.slug}`,
  });

  // Product-разметка (SEO.md, раздел 8.1): только поля из типа Product, без
  // выдуманных значений. Блок offers/цены не добавляем — цены на сайте нет;
  // складской статус в разметку тоже не выносим (Product.md, 2.2).
  const productLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.title,
    description: product.description,
    ...(product.images && product.images.length > 0
      ? { image: product.images.map((image) => new URL(image, siteConfig.url).toString()) }
      : {}),
    ...(product.sku ? { sku: product.sku } : {}),
    ...(manufacturer ? { brand: { "@type": "Brand", name: manufacturer.name } } : {}),
    ...(category ? { category: category.name } : {}),
  };

  return (
    <>
      <Container as="main" className="py-10 pb-28 lg:pb-10">
        <JsonLd data={productLd} />
        <JsonLd data={buildBreadcrumbLd(breadcrumbItems)} />
        {/* Записывает просмотр в localStorage для блока «Вы недавно смотрели» (Frontend.md,
            раздел 8.7). Ничего не рендерит. */}
        <RecentlyViewedTracker
          slug={product.slug}
          category={product.category}
          title={product.title}
        />
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
              CTA — ссылка на /contacts, где телефон/email менеджера; сбора данных нет.
              ?product=<slug> — чтобы на /contacts можно было подсказать клиенту, про
              какой товар он писал (см. app/contacts/page.tsx). Текст CTA зависит от
              статуса — PRODUCT_CONTACT_CTA_LABELS (types/product.ts), не хардкодится.
              На мобильном (`hidden lg:inline-flex`) эта же кнопка не дублируется —
              её место занимает закреплённая внизу экрана панель ниже (sticky CTA,
              отложенный пункт аудита, раздел D, Frontend.md 4.6); на lg: и выше —
              обычная инлайновая кнопка, как раньше. */}
            <div className="mt-2 flex flex-wrap gap-3">
              <Link
                href={`/contacts?product=${encodeURIComponent(product.slug)}`}
                className="hidden items-center justify-center rounded-2xl bg-brand-800 px-5 py-2.5 text-base font-semibold text-white transition-colors duration-200 ease-out hover:bg-brand-600 lg:inline-flex"
              >
                {PRODUCT_CONTACT_CTA_LABELS[product.availability]}
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
              {/* Второй путь обращения к менеджеру — корзина (Frontend.md, раздел 7.3):
                  несколько товаров сразу, не заменяет основную CTA-ссылку выше.
                  Степпер количества — в ProductQuantityAddToCart.tsx (там же — почему
                  это отдельный клиентский компонент, а не прямо здесь). Только для
                  'available' — та же проверка, что уже переключает текст основной
                  CTA-ссылки на "Уточнить возможность поставки" (PRODUCT_CONTACT_CTA_LABELS
                  выше): позицию, снятую с поставки, в корзину добавлять нельзя, менеджеру
                  сначала нужно подтвердить, актуальна ли она вообще (Product.md, п.2.2). */}
              {product.availability === "available" && (
                <ProductQuantityAddToCart product={product} />
              )}
            </div>
            {/* Пояснение двух путей обращения (Frontend.md, раздел 8.2) — вторичный текст,
              не дублируется в sticky-CTA на мобильном (там только основная кнопка). */}
            <p className="text-sm text-secondary">
              «{PRODUCT_CONTACT_CTA_LABELS[product.availability]}» — быстрый вопрос по этой позиции.
              {product.availability === "available" &&
                " Корзина — если интересует несколько товаров сразу."}
            </p>
            {/* Второстепенный акцент новой палитрой (Frontend.md, раздел 4.1, аудит 2026-09-05) —
              лёгкий amber-фон привлекает внимание к пояснению, не конкурируя с CTA. */}
            <p className="inline-block self-start rounded-xl bg-accent-amber/10 px-3 py-1.5 text-sm text-secondary">
              Цена и точные сроки — в коммерческом предложении от менеджера.
            </p>
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
      </Container>

      {/* Sticky CTA на мобильной ширине (отложенный пункт аудита, раздел D, Frontend.md
          4.6): кнопка всегда в зоне досягаемости большим пальцем, не пропадает при
          скролле по описанию/характеристикам. lg:hidden — на десктопе это место занимает
          обычная инлайновая кнопка выше (см. её className `hidden lg:inline-flex`).
          pb-28 на <Container> выше резервирует место, чтобы эта панель не перекрывала
          последний блок контента (документы/вкладки) на мобильном; подвал получает свой
          нижний отступ во Footer.tsx. Восходящая тень (2026-09-07, по скринам реального
          телефона) — чтобы панель читалась как отдельный слой, а не сливалась с текстом,
          который проезжает под ней при скролле. */}
      <div className="fixed inset-x-0 bottom-0 z-40 border-t border-gray-200 bg-white p-4 shadow-[0_-1px_12px_rgba(15,23,42,0.12)] lg:hidden">
        <Link
          href={`/contacts?product=${encodeURIComponent(product.slug)}`}
          className="flex w-full items-center justify-center rounded-2xl bg-brand-800 px-5 py-3 text-base font-semibold text-white transition-colors duration-200 ease-out hover:bg-brand-600"
        >
          {PRODUCT_CONTACT_CTA_LABELS[product.availability]}
        </Link>
      </div>
    </>
  );
}
