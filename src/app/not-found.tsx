import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { LinkButton } from "@/components/ui/LinkButton";

// Глобальная страница 404 (Architecture.md, 2.1): отдаётся для несуществующих
// путей и при вызове notFound() из роутов каталога. Рендерится внутри корневого
// layout — Header/Footer остаются на месте. Только статическая вёрстка на токенах
// дизайн-системы, без обращения к lib/data.
export const metadata: Metadata = {
  title: "Страница не найдена",
};

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
        <LinkButton href="/">На главную</LinkButton>
        <LinkButton href="/catalog" variant="outline">
          Перейти в каталог
        </LinkButton>
      </div>
    </Container>
  );
}
