"use client";

import { useState } from "react";
import { AddToCartButton } from "@/components/features/product/AddToCartButton";
import type { Product } from "@/types/product";

// Степпер количества перед добавлением в корзину + сама кнопка (Frontend.md, раздел 7.3).
// Отдельным ui-компонентом степпер не выносится (используется только тут и в /cart —
// раздел 7.4, — причём с разной логикой: здесь количество перед первым добавлением, там
// уже количество добавленной позиции; общего переиспользуемого куска пока нет, заводить
// абстракцию под два непохожих места преждевременно). Сам этот файл — техническая
// необходимость, не отдельное архитектурное решение: состояние quantity должно жить в
// клиентском компоненте, а страница товара (app/catalog/[category]/[slug]/page.tsx) —
// серверный компонент (generateStaticParams/generateMetadata), поэтому степпер+кнопка
// вынесены сюда.
export interface ProductQuantityAddToCartProps {
  product: Product;
}

export function ProductQuantityAddToCart({ product }: ProductQuantityAddToCartProps) {
  const [quantity, setQuantity] = useState(1);
  // AddToCartButton теперь блокируется навсегда после успешного добавления (не
  // сбрасывается таймером) — выбранное здесь количество после этого уже никак не
  // используется. Степпер должен разделять эту судьбу: иначе он остаётся кликабельным,
  // но полностью бессмысленным (найдено при самокритичном аудите). onAdded уже
  // вызывается ровно один раз, сразу после успешного addItem — тот же колбэк
  // выставляет added, дальше меняется количество только на /cart.
  const [added, setAdded] = useState(false);

  return (
    <div className="flex items-center gap-3">
      <div className="flex items-center gap-2">
        <button
          type="button"
          onClick={() => setQuantity((q) => Math.max(1, q - 1))}
          disabled={added || quantity <= 1}
          aria-label="Уменьшить количество"
          className="flex h-10 w-10 items-center justify-center rounded-xl border border-gray-300 text-primary transition-colors duration-200 ease-out hover:bg-secondary focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-800 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
        >
          −
        </button>
        {/* aria-live — озвучивает скринридеру новое значение при клике по +/-, которое
            иначе не анонсируется само по себе (найдено при самокритичном аудите). */}
        <span
          aria-live="polite"
          aria-atomic="true"
          className="w-8 text-center tabular-nums text-primary"
        >
          {quantity}
        </span>
        <button
          type="button"
          onClick={() => setQuantity((q) => q + 1)}
          disabled={added}
          aria-label="Увеличить количество"
          className="flex h-10 w-10 items-center justify-center rounded-xl border border-gray-300 text-primary transition-colors duration-200 ease-out hover:bg-secondary focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-800 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
        >
          +
        </button>
      </div>
      {/* onAdded — сбрасывает выбранное количество обратно к 1 (чтобы значение не
          оставалось "залипшим", например, на 5, если бы кнопка не блокировалась
          навсегда) и включает added, блокирующий степпер выше. */}
      <AddToCartButton
        product={product}
        quantity={quantity}
        variant="outline"
        onAdded={() => {
          setQuantity(1);
          setAdded(true);
        }}
      />
    </div>
  );
}
