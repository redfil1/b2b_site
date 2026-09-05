"use client";

import { X } from "lucide-react";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";

// Галерея карточки товара (Frontend.md, раздел 4.3.2): основное фото + миниатюры.
// Изображения берутся из product.images (пути в public/, рендер через next/image —
// Coding_Rules.md). Если у товара ещё нет фото — остаётся заглушка «фото появится позже».
export interface ProductGalleryProps {
  title: string;
  images?: string[];
}

// Длительность fade/scale-перехода лайтбокса (мс) — используется и в CSS-классах
// (duration-200 ниже), и в JS-таймере закрытия, чтобы .close() не обрывал анимацию.
const TRANSITION_MS = 200;

export function ProductGallery({ title, images }: ProductGalleryProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  // entered управляет классами перехода лайтбокса отдельно от факта его открытости:
  // <dialog> получает display:flex сразу при showModal(), transition не подхватит
  // первый кадр без задержки на кадр (см. openLightbox) — стандартный приём анимации
  // нативного <dialog> без @starting-style.
  const [entered, setEntered] = useState(false);
  const dialogRef = useRef<HTMLDialogElement>(null);

  // Lightbox — отложенный пункт внешнего аудита (раздел D), реализован 2026-09-05
  // (Frontend.md, раздел 4.6). Escape закрывает <dialog> нативно браузером, но событие
  // 'cancel' перехватывается, чтобы сперва доиграть анимацию исчезновения, а не
  // закрывать диалог мгновенно.
  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    const handleCancel = (event: Event) => {
      event.preventDefault();
      closeLightbox();
    };
    dialog.addEventListener("cancel", handleCancel);
    return () => dialog.removeEventListener("cancel", handleCancel);
  }, []);

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

  function openLightbox(index: number) {
    setActiveIndex(index);
    dialogRef.current?.showModal();
    requestAnimationFrame(() => setEntered(true));
  }

  function closeLightbox() {
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    setEntered(false);
    window.setTimeout(() => dialogRef.current?.close(), reduceMotion ? 0 : TRANSITION_MS);
  }

  return (
    <div className="flex flex-col gap-3">
      <button
        type="button"
        onClick={() => openLightbox(active)}
        aria-label={`Увеличить фото товара «${title}»`}
        className="relative aspect-[4/3] w-full cursor-zoom-in overflow-hidden rounded-2xl border border-gray-200 bg-secondary"
      >
        <Image
          src={images[active]}
          alt={title}
          fill
          priority
          sizes="(max-width: 1024px) 100vw, 60vw"
          className="object-contain"
        />
      </button>

      {images.length > 1 && (
        <ul className="flex flex-wrap gap-2">
          {images.map((src, index) => (
            <li key={src}>
              <button
                type="button"
                onClick={() => openLightbox(index)}
                aria-label={`Открыть фото ${index + 1} в полном размере`}
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

      {/* Нативный <dialog> — модальность (top layer, фокус-ловушка, Escape) и ::backdrop
          из коробки браузера, без библиотек. Клик по самому <dialog> (не по содержимому
          внутри) — это клик по подложке, т.к. dialog растягивается на область показа.
          backdrop:bg-black/70, не bg-primary/70: text-primary/bg-secondary в этом проекте
          не заведены как цвета темы Tailwind (см. globals.css) — это отдельные готовые
          CSS-классы, поэтому модификатор прозрачности (/70) и вариант backdrop: к ним не
          применяются (сгенерировать нечего). Затемнение подложки не анимируем отдельно —
          фейд/скейл ниже относится к самому содержимому диалога. */}
      <dialog
        ref={dialogRef}
        aria-label={`Увеличенное фото товара «${title}»`}
        onClick={(event) => {
          if (event.target === dialogRef.current) closeLightbox();
        }}
        className={`m-auto max-w-none border-0 bg-transparent p-0 backdrop:bg-black/70 motion-reduce:transition-none transition-all duration-200 ease-out ${
          entered ? "scale-100 opacity-100" : "scale-95 opacity-0"
        }`}
      >
        <div className="relative">
          <button
            type="button"
            onClick={closeLightbox}
            aria-label="Закрыть увеличенное фото"
            className="absolute -top-3 -right-3 z-10 inline-flex items-center justify-center rounded-full bg-white p-2 text-primary shadow-md transition-colors duration-200 ease-out hover:bg-secondary"
          >
            <X className="h-5 w-5" />
          </button>
          <div className="relative aspect-[4/3] max-h-[85vh] w-[min(90vw,64rem)]">
            <Image
              src={images[active]}
              alt={title}
              fill
              sizes="90vw"
              className="rounded-2xl object-contain"
            />
          </div>
        </div>
      </dialog>
    </div>
  );
}
