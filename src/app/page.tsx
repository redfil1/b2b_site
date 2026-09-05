import Link from "next/link";
import { CategoryIcon } from "@/components/features/catalog/CategoryIcon";
import { HeroSlider } from "@/components/features/home/HeroSlider";
import { ManufacturerLogos } from "@/components/features/home/ManufacturerLogos";
import { Container } from "@/components/ui/Container";
import { getCategories } from "@/lib/data/categories";

export default function Home() {
  const categories = getCategories();

  return (
    <Container as="main" className="py-10">
      {/* Слайдер главной — Frontend.md, раздел 4.3.4 (тестовые слайды-заглушки). */}
      <HeroSlider />

      {/* Hero — заголовок и краткое УТП. Факты — из CLAUDE.md (описание проекта),
          без маркетинговых обещаний, которых нет в доках. */}
      <section className="flex flex-col gap-4 py-6 md:py-10">
        <h1 className="max-w-3xl text-4xl font-semibold text-primary md:text-5xl">
          B2B-магазин промышленного оборудования
        </h1>
        <p className="max-w-2xl text-secondary md:text-lg">
          Поставляем газоанализаторы, КИП, лабораторное оборудование и спецтехнику под заказ из
          Китая. Склада в РФ нет — каждая позиция поставляется под заказ.
        </p>
      </section>

      {/* Полоса логотипов производителей — Frontend.md, раздел 4.3.4 (не отдельный роут). */}
      <section className="mt-6">
        <ManufacturerLogos />
      </section>

      {/* Обзор категорий каталога — Architecture.md, раздел "Структура страниц":
          категория обязательна у товара, здесь — вход в каталог по категориям.
          Плитка (иконка + текст) — та же вёрстка, что на /catalog (Frontend.md,
          раздел 4.3.1), поэтому не через ui/Card: подложка идёт в край плитки. Иконка —
          временная схематичная замена фото категории, декоративна (aria-hidden), т.к.
          название уже есть текстом ниже. */}
      <section className="mt-6 flex flex-col gap-6">
        <h2 className="text-2xl font-semibold text-primary md:text-3xl">Категории каталога</h2>
        <div className="grid grid-cols-1 items-stretch gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {categories.map((category) => (
            <Link
              key={category.slug}
              href={`/catalog/${category.slug}`}
              className="flex h-full flex-col overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm transition-transform duration-200 ease-out motion-safe:hover:scale-[1.02]"
            >
              <div className="flex aspect-square w-full items-center justify-center bg-secondary">
                <CategoryIcon slug={category.slug} aria-hidden="true" className="h-24 w-24" />
              </div>
              <div className="flex flex-1 flex-col gap-3 p-6">
                <h3 className="text-xl font-semibold text-primary">{category.name}</h3>
                {category.description && <p className="text-secondary">{category.description}</p>}
              </div>
            </Link>
          ))}
        </div>
      </section>
    </Container>
  );
}
