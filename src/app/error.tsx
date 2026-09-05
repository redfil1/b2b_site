"use client";

import { useEffect } from "react";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { LinkButton } from "@/components/ui/LinkButton";

// Глобальный error boundary (Architecture.md, 2.1). Error-файлы Next.js обязаны быть
// клиентскими компонентами. Ловит непойманные ошибки рендера в сегментах ниже
// корневого layout (сам layout с Header/Footer остаётся). Пользователю показываем
// нейтральное сообщение, без стектрейса.
//
// Восстановление: в Next 16.3 стабильный пропс — `retry()` (пришёл на смену
// `reset()`), повторяет рендер упавшего сегмента.

export default function GlobalError({
  error,
  retry,
}: {
  error: Error & { digest?: string };
  retry: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <>
      {/* error-файл клиентский — экспорт metadata не поддерживается, title через React. */}
      <title>Что-то пошло не так</title>
      <Container as="main" className="flex flex-col items-center gap-6 py-24 text-center">
        <h1 className="text-3xl font-semibold text-primary md:text-4xl">Что-то пошло не так</h1>
        <p className="max-w-md text-secondary">
          Произошла непредвиденная ошибка. Попробуйте ещё раз — если проблема повторяется, вернитесь
          на главную и повторите попытку позже.
        </p>
        <div className="mt-2 flex flex-wrap justify-center gap-3">
          <Button onClick={() => retry()}>Попробовать снова</Button>
          <LinkButton href="/" variant="outline">
            На главную
          </LinkButton>
        </div>
      </Container>
    </>
  );
}
