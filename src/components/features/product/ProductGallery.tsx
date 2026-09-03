"use client";

import Image from "next/image";
import { useState } from "react";

// Галерея карточки товара (Frontend.md, раздел 4.3.2): основное фото + миниатюры.
// Изображения берутся из product.images (пути в public/, рендер через next/image —
// Coding_Rules.md). Если у товара ещё нет фото — остаётся заглушка «фото появится позже».
export interface ProductGalleryProps {
  title: string;
  images?: string[];
}

export function ProductGallery({ title, images }: ProductGalleryProps) {
  const [activeIndex, setActiveIndex] = useState(0);

  if (!images || images.length === 0) {
    return (
      <div
        role="img"
        aria-label={`Фото товара «${title}» пока недоступно`}
        className="flex aspect-[4/3] w-full items-center justify-center rounded-2xl border border-gray-200 bg-secondary text-secondary"
      >
        Фото появится позже
      </div>
    );
  }

  // Подстраховка на случай рассинхрона: activeIndex не должен выходить за пределы массива,
  // иначе основное фото отрисуется пустым.
  const active = Math.min(activeIndex, images.length - 1);

  return (
    <div className="flex flex-col gap-3">
      <div className="relative aspect-[4/3] w-full overflow-hidden rounded-2xl border border-gray-200 bg-secondary">
        <Image
          src={images[active]}
          alt={title}
          fill
          priority
          sizes="(max-width: 1024px) 100vw, 60vw"
          className="object-contain"
        />
      </div>

      {images.length > 1 && (
        <ul className="flex flex-wrap gap-2">
          {images.map((src, index) => (
            <li key={src}>
              <button
                type="button"
                onClick={() => setActiveIndex(index)}
                aria-label={`Показать фото ${index + 1}`}
                aria-current={index === active}
                className={`relative aspect-square w-16 overflow-hidden rounded-xl border transition-colors duration-200 ease-out ${
                  index === active ? "border-brand-800" : "border-gray-200 hover:border-brand-600"
                }`}
              >
                <Image
                  src={src}
                  alt={`${title} — фото ${index + 1}`}
                  fill
                  sizes="64px"
                  className="object-cover"
                />
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
