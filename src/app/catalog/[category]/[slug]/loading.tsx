import { Container } from "@/components/ui/Container";

// Skeleton для /catalog/[category]/[slug] — файл-конвенция Next.js App Router, см.
// комментарий в соседнем catalog/[category]/loading.tsx. Повторяет пропорции реальной
// карточки товара (Frontend.md, раздел 4.3.2): двухколоночная раскладка
// lg:grid-cols-[3fr_2fr] (галерея + инфоблок), вкладки под ней.
export default function ProductLoading() {
  return (
    <Container as="main" className="animate-pulse py-10">
      <span className="sr-only">Загрузка товара…</span>
      <div aria-hidden="true">
        <div className="h-4 w-56 rounded bg-secondary" />

        <div className="mt-6 grid grid-cols-1 gap-8 lg:grid-cols-[3fr_2fr]">
          <div className="aspect-[4/3] w-full rounded-2xl bg-secondary" />

          <div className="flex flex-col gap-4">
            <div className="h-6 w-24 rounded-full bg-secondary" />
            <div className="h-9 w-4/5 rounded bg-secondary" />
            <div className="flex flex-col gap-2">
              <div className="h-4 w-2/3 rounded bg-secondary" />
              <div className="h-4 w-1/2 rounded bg-secondary" />
              <div className="h-4 w-2/5 rounded bg-secondary" />
            </div>
            <div className="mt-2 h-11 w-48 rounded-2xl bg-secondary" />
            <div className="h-8 w-64 max-w-full rounded-xl bg-secondary" />
          </div>
        </div>

        <div className="mt-12 flex gap-4 border-b border-gray-200 pb-3">
          <div className="h-6 w-24 rounded bg-secondary" />
          <div className="h-6 w-28 rounded bg-secondary" />
          <div className="h-6 w-28 rounded bg-secondary" />
          <div className="h-6 w-24 rounded bg-secondary" />
        </div>
        <div className="mt-6 h-24 w-full max-w-3xl rounded bg-secondary" />
      </div>
    </Container>
  );
}
