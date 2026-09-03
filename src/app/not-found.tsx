import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/ui/Container";

// Глобальная страница 404 (Architecture.md, 2.1): отдаётся для несуществующих
// путей и при вызове notFound() из роутов каталога. Рендерится внутри корневого
// layout — Header/Footer остаются на месте. Только статическая вёрстка на токенах
// дизайн-системы, без обращения к lib/data.
export const metadata: Metadata = {
  title: "Страница не найдена",
};

// Ссылка-кнопка: <button> внутри <a> невалиден по HTML, поэтому классы вариантов
// Button (primary/outline, Frontend.md 4.4) навешиваем прямо на <Link>.
const ACTION_LINK =
  "inline-flex items-center justify-center rounded-2xl px-5 py-2.5 text-base font-semibold transition-colors duration-200 ease-out";

export default function NotFound() {
  return (
    <Container as="main" className="flex flex-col items-center gap-6 py-24 text-center">
      <p className="text-6xl font-semibold text-brand-800">404</p>
      <h1 className="text-3xl font-semibold text-primary md:text-4xl">Страница не найдена</h1>
      <p className="max-w-md text-secondary">
        Возможно, страница была перемещена или в адресе опечатка. Вернитесь на главную или откройте
        каталог.
      </p>
      <div className="mt-2 flex flex-wrap justify-center gap-3">
        <Link href="/" className={`${ACTION_LINK} bg-brand-800 text-white hover:bg-brand-600`}>
          На главную
        </Link>
        <Link
          href="/catalog"
          className={`${ACTION_LINK} border border-brand-800 text-brand-800 hover:bg-brand-800/5`}
        >
          Перейти в каталог
        </Link>
      </div>
    </Container>
  );
}
