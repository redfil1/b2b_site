// Working placeholder — реальных фото товаров ещё нет (Architecture.md, раздел 1: фото —
// в public/ или во внешнем хранилище, домен — в next.config.js, когда появится источник).
// Рендер через next/image (Coding_Rules.md) подключается тем же шагом, что и реальные фото.
export interface ProductGalleryProps {
  title: string;
}

export function ProductGallery({ title }: ProductGalleryProps) {
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
