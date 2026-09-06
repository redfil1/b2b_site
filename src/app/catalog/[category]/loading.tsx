import { Container } from "@/components/ui/Container";

// Skeleton для /catalog/[category] — файл-конвенция Next.js App Router, показывается
// автоматически, пока сегмент грузится при переходе (React Suspense boundary вокруг
// page.tsx). Отложенный пункт внешнего аудита (раздел D), реализован 2026-09-05
// (Frontend.md, раздел 4.6). Повторяет реальные пропорции разметки страницы — заголовок
// и сетку карточек (Frontend.md, раздел 4.3.1) той же сеткой grid-cols-1 → sm:2 → lg:3 →
// xl:4, чтобы при подстановке настоящего контента не было скачка вёрстки.
// animate-pulse — встроенная анимация Tailwind, не сторонняя библиотека.
export default function CategoryLoading() {
  return (
    <Container as="main" className="animate-pulse py-10">
      <span className="sr-only">Загрузка категории…</span>
      <div aria-hidden="true">
        <div className="h-4 w-40 rounded bg-secondary" />
        <div className="mt-4 h-10 w-64 rounded bg-secondary" />
        <div className="mt-2 h-5 w-96 max-w-full rounded bg-secondary" />

        <div className="mt-8 grid grid-cols-1 items-stretch gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {Array.from({ length: 8 }).map((_, index) => (
            <div
              key={index}
              className="flex h-full flex-col overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm"
            >
              {/* Плейсхолдер под блок иконки категории (CategoryIcon, тот же
                  aspect-[4/3] bg-secondary, что и в реальной карточке ProductGrid.tsx) —
                  без него скелетон был короче настоящей карточки и вызывал скачок
                  вёрстки при подстановке контента (найдено при самокритичном аудите). */}
              <div className="aspect-[4/3] w-full bg-secondary" />
              <div className="flex flex-1 flex-col gap-3 p-6">
                <div className="h-6 w-20 rounded-full bg-secondary" />
                <div className="h-6 w-3/4 rounded bg-secondary" />
                <div className="h-4 w-1/2 rounded bg-secondary" />
                <div className="h-16 w-full rounded bg-secondary" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </Container>
  );
}
